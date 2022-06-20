package jwtspring.service;

import jwtspring.models.User;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.Order;
import jwtspring.repository.OrderRepository;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;
  private final UserRepository userRepository;

  public ResponseEntity<Order> getOne(final long orderId) {
    return orderRepository.findById(orderId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.noContent().build());
  }

  public ResponseEntity<List<Order>> getAllCustomerOrders() {
    return ResponseEntity.status(HttpStatus.OK).body(orderRepository.findAll());
  }

  public ResponseEntity<List<Order>> getAllOrdersByCustomerId(final long userId) {

    Optional<User> userOpt = userRepository.findById(userId);
    if(userOpt.isPresent()){
      List<Order> orderList = orderRepository.findAllByUser(userOpt.get());
      return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
  }

  public ResponseEntity<List<Order>> getAllOrdersByOrderStatus(final EOrderStatus orderStatus) {
    List<Order> orderList = orderRepository.findAllByOrderStatus(orderStatus);
    return ResponseEntity.status(HttpStatus.OK).body(orderList);
  }

  public ResponseEntity<String> deleteOrder(final long orderId) {
    if (orderRepository.findById(orderId).isPresent())
      orderRepository.deleteById(orderId);
    return ResponseEntity.status(HttpStatus.OK).body("Order has been deleted");
  }


  public Order create(Order order) {
    order.setDateCreated(LocalDate.now());
    return this.orderRepository.save(order);
  }

  public void update(Order order) {
    this.orderRepository.save(order);
  }


  public ResponseEntity<String> changeOrderStatus(Order order, EOrderStatus orderStatus) {

    Optional<Order> orderOptional = orderRepository.findById(order.getId());
    Order selectedOrder = null;
    if (orderOptional.isPresent()) {
      selectedOrder = orderOptional.get();
    }

    assert selectedOrder != null;
    Optional<User> userOptional = userRepository.findById(selectedOrder.getUser().getId());
    if (userOptional.isPresent()) {
      User user = userOptional.get();

      selectedOrder.setOrderStatus(orderStatus);
      selectedOrder.setUser(user);

      orderRepository.save(selectedOrder);
    }


    switch (orderStatus) {
      case CANCELED:
        return ResponseEntity.ok("Order has been canceled");
      case SENT:
        return ResponseEntity.ok("Order has been Sent");
      case DELIVERED:
        return ResponseEntity.ok("Order has been delivered");
    }
    return ResponseEntity.ok("Order has been delivered");
  }

/*

  private ResponseEntity<String> cancelOrder(Order order) {
    Optional<Order> orderOptional = orderRepository.findById(order.getId());
    Optional<User> userOptional = getOptionalUser();
    if (orderOptional.isPresent() && userOptional.isPresent()) {

      Order selectedOrder = orderOptional.get();
      User user = userOptional.get();

      selectedOrder.setOrderStatus(EOrderStatus.CANCELED);
      selectedOrder.setUser(user);

      orderRepository.save(selectedOrder);
    }
    return ResponseEntity.ok("Order has been canceled");
  }

  public ResponseEntity<String> acceptOrder(Order order) {

    Optional<Order> orderOptional = orderRepository.findById(order.getId());
    if (orderOptional.isPresent()) {
      order.setOrderStatus(EOrderStatus.SENT);
      orderRepository.save(order);
    }
    return ResponseEntity.ok("Order has been accepted");
  }

  public ResponseEntity<String> orderDelivered(Order order) {

    Optional<Order> orderOptional = orderRepository.findById(order.getId());
    if (orderOptional.isPresent()) {
      Order selectedOrder = orderOptional.get();
      User user = selectedOrder.getUser();
      selectedOrder.setOrderStatus(EOrderStatus.DELIVERED);
      selectedOrder.setUser(user);
      orderRepository.save(selectedOrder);
    }
    return ResponseEntity.ok("Order has been delivered");
  }
*/


  private Optional<User> getOptionalUser() {
    String username;

    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      username = ((UserDetails) principal).getUsername();
    } else {
      username = principal.toString();
    }

    return userRepository.findByUsername(username);
  }

}
