package jwtspring.controllers;

import javassist.NotFoundException;
import jwtspring.models.User;
import jwtspring.models.dto.OrderProductDto;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.Order;
import jwtspring.models.order.OrderProduct;
import jwtspring.models.product.ProductItem;
import jwtspring.repository.UserRepository;
import jwtspring.service.OrderProductService;
import jwtspring.service.OrderService;
import jwtspring.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;
    private final OrderProductService orderProductService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody OrderForm form) {

        List<OrderProductDto> formDtos = form.getProductOrders();

        try {
            validateProductsExistence(formDtos);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        Order order = new Order();
        order.setOrderStatus(EOrderStatus.PENDING);
        order = this.orderService.create(order);


        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductDto dto : formDtos) {
            orderProducts.add(orderProductService.create(
                    new OrderProduct(order, productService
                            .getOne(dto
                                    .getProductItem()
                                    .getId())
                            .getBody(),
                            dto.getQuantity())));
        }

        orderProducts.forEach(orderProduct -> {
            int orderQuantity = orderProduct.getQuantity();
            ProductItem productItem = productService.getOne(orderProduct.getProduct().getId()).getBody();

            int updatedStock = productItem.getStock() - orderQuantity;
            productItem.setStock(updatedStock);

            productService.updateProduct(productItem);
        });

        Optional<User> userOptional = userRepository.findById(form.getUserId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            order.setOrderProducts(orderProducts);
            order.setUser(user);

            user.getOrderList().add(order);
            userRepository.save(user);

        }


        this.orderService.update(order);

        String uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable long orderId) {
        return orderService.getOne(orderId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return orderService.getAllCustomerOrders();
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getAllOrdersByCustomerId(@PathVariable long customerId) {
        return orderService.getAllOrdersByCustomerId(customerId);
    }

    @GetMapping("/status/{orderStatus}")
    public ResponseEntity<List<Order>> getAllOrdersByOrderStatus(@PathVariable EOrderStatus orderStatus) {
        return orderService.getAllOrdersByOrderStatus(orderStatus);
    }


    @PutMapping("/cancel-order")
    public ResponseEntity<String> cancelOrder(@RequestBody final Order order) {
        return orderService.changeOrderStatus(order, EOrderStatus.CANCELED);
    }

    @PutMapping("/accept-order")
    public ResponseEntity<String> acceptOrder(@RequestBody final Order order) {
        return orderService.changeOrderStatus(order, EOrderStatus.SENT);
    }

    @PutMapping("/deliver-order")
    public ResponseEntity<String> deliverOrder(@RequestBody final Order order) {
        return orderService.changeOrderStatus(order, EOrderStatus.DELIVERED);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable final long orderId) {
        return orderService.deleteOrder(orderId);
    }


    @Getter
    @Setter
    public static class OrderForm {

        private List<OrderProductDto> productOrders;
        private long userId;
    }

    private void validateProductsExistence(List<OrderProductDto> orderProducts) throws NotFoundException {
        List<OrderProductDto> list = orderProducts
                .stream()
                .filter(op -> Objects.isNull(productService.getOne(op
                        .getProductItem()
                        .getId())))
                .collect(Collectors.toList());

        if (!CollectionUtils.isEmpty(list)) {
            throw new NotFoundException("ProductItem not found");
        }
    }
}
