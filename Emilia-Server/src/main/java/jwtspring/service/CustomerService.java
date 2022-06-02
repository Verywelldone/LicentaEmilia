package jwtspring.service;

import jwtspring.models.User;
import jwtspring.models.dto.NewCustomerDTO;
import jwtspring.models.order.Customer;
import jwtspring.models.order.Order;
import jwtspring.repository.CustomerRepository;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final UserRepository userRepository;

  public ResponseEntity<String> placeOrder(final Order order, final long customerId) {

    Optional<Customer> customerOpt = customerRepository.findById(customerId);
    if (!customerOpt.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Customer customer = customerOpt.get();
    customer.getOrderList().add(order);
    customerRepository.save(customer);

    return ResponseEntity.ok("Order has been placed!");
  }

  public ResponseEntity<String> becomeCustomer(final NewCustomerDTO newCustomerDTO, final long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    User user = userOpt.get();
    if (null != user.getCustomer())
      return ResponseEntity.badRequest().body("User already a customer");

    user.setCustomer(Customer.of(newCustomerDTO));
    userRepository.save(user);

    return ResponseEntity.ok("User is now a customer");
  }

}
