package jwtspring.controllers;

import jwtspring.models.order.Order;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.OrderDetails;
import jwtspring.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

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

    @PutMapping("/{orderId}")
    public ResponseEntity<String> changeOrderStatus(@RequestBody final EOrderStatus orderStatus, @PathVariable final long orderId) {
        return orderService.changeOrderStatus(orderStatus, orderId);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable final long orderId) {
        return orderService.deleteOrder(orderId);
    }

/*    @PutMapping("/order/{orderId}")
    public ResponseEntity<String> changeOrderDetails(@PathVariable final long orderId, @RequestBody final OrderDetails orderDetails) {
        return orderService.changeOrderDetails(orderId, orderDetails);
    }*/
}
