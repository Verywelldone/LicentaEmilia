package jwtspring.service;

import jwtspring.models.order.Order;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.OrderDetails;
import jwtspring.repository.OrderRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;

  public ResponseEntity<Order> getOne(final long orderId) {
    return orderRepository.findById(orderId)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.noContent().build());
  }

  public ResponseEntity<List<Order>> getAllCustomerOrders() {
    return ResponseEntity.status(HttpStatus.OK).body(orderRepository.findAll());
  }

  public ResponseEntity<List<Order>> getAllOrdersByCustomerId(final long customerId) {
    List<Order> orderList = orderRepository.findAllByCustomer(customerId);
    return ResponseEntity.status(HttpStatus.OK).body(orderList);
  }

  public ResponseEntity<List<Order>> getAllOrdersByOrderStatus(final EOrderStatus orderStatus) {
    List<Order> orderList = orderRepository.findAllByOrderStatus(orderStatus);
    return ResponseEntity.status(HttpStatus.OK).body(orderList);
  }

  public ResponseEntity<String> changeOrderStatus(final EOrderStatus orderStatus, final long orderId) {
    Optional<Order> orderOpt = orderRepository.findById(orderId);
    if (!orderOpt.isPresent())
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found!");
    Order order = orderOpt.get();
    order.setOrderStatus(orderStatus);

    orderRepository.save(order);

    return ResponseEntity.ok("Order status has been changed!");
  }

  public ResponseEntity<String> deleteOrder(final long orderId) {
    if (orderRepository.findById(orderId).isPresent())
      orderRepository.deleteById(orderId);
    return ResponseEntity.status(HttpStatus.OK).body("Order has been deleted");
  }



}
