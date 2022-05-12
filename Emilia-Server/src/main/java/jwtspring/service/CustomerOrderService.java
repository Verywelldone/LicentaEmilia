package jwtspring.service;

import jwtspring.models.order.CustomerOrder;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.OrderDetails;
import jwtspring.repository.CustomerOrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;

    public ResponseEntity<CustomerOrder> getOne(final long orderId) {
        return customerOrderRepository.findById(orderId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    public ResponseEntity<List<CustomerOrder>> getAllCustomerOrders() {
        return ResponseEntity.status(HttpStatus.OK).body(customerOrderRepository.findAll());
    }

    public ResponseEntity<List<CustomerOrder>> getAllOrdersByCustomerId(final long customerId) {
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByCustomer(customerId);
        return ResponseEntity.status(HttpStatus.OK).body(customerOrderList);
    }

    public ResponseEntity<List<CustomerOrder>> getAllOrdersByOrderStatus(final EOrderStatus orderStatus) {
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAllByOrderStatus(orderStatus);
        return ResponseEntity.status(HttpStatus.OK).body(customerOrderList);
    }

    public ResponseEntity<String> changeOrderStatus(final EOrderStatus orderStatus, final long orderId) {
        Optional<CustomerOrder> orderOpt = customerOrderRepository.findById(orderId);
        if (!orderOpt.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found!");
        CustomerOrder customerOrder = orderOpt.get();
        customerOrder.setOrderStatus(orderStatus);

        customerOrderRepository.save(customerOrder);

        return ResponseEntity.ok("Order status has been changed!");
    }

    public ResponseEntity<String> deleteOrder(final long orderId) {
        if (customerOrderRepository.findById(orderId).isPresent())
            customerOrderRepository.deleteById(orderId);
        return ResponseEntity.status(HttpStatus.OK).body("Order has been deleted");
    }

    public ResponseEntity<String> changeOrderDetails(final long orderId, final OrderDetails orderDetails) {
        Optional<CustomerOrder> orderOpt = customerOrderRepository.findById(orderId);
        orderOpt.ifPresent(customerOrder -> customerOrder.setOrderDetails(orderDetails));

        return ResponseEntity.status(HttpStatus.OK).body("Order details has been updated!");
    }

}
