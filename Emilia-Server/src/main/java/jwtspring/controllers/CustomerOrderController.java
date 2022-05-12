package jwtspring.controllers;

import jwtspring.models.order.CustomerOrder;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.OrderDetails;
import jwtspring.service.CustomerOrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/orders")
@AllArgsConstructor
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    @GetMapping("/{orderId}")
    public ResponseEntity<CustomerOrder> getOne(@PathVariable long orderId) {
        return customerOrderService.getOne(orderId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CustomerOrder>> getAllCustomerOrders() {
        return customerOrderService.getAllCustomerOrders();
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerOrder>> getAllOrdersByCustomerId(@PathVariable long customerId) {
        return customerOrderService.getAllOrdersByCustomerId(customerId);
    }

    @GetMapping("/status/{orderStatus}")
    public ResponseEntity<List<CustomerOrder>> getAllOrdersByOrderStatus(@PathVariable EOrderStatus orderStatus) {
        return customerOrderService.getAllOrdersByOrderStatus(orderStatus);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<String> changeOrderStatus(@RequestBody final EOrderStatus orderStatus, @PathVariable final long orderId) {
        return customerOrderService.changeOrderStatus(orderStatus, orderId);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable final long orderId) {
        return customerOrderService.deleteOrder(orderId);
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<String> changeOrderDetails(@PathVariable final long orderId, @RequestBody final OrderDetails orderDetails) {
        return customerOrderService.changeOrderDetails(orderId, orderDetails);
    }
}
