package jwtspring.repository;

import jwtspring.models.order.Order;
import jwtspring.models.order.EOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByCustomer(final long customerId);

    List<Order> findAllByOrderStatus(final EOrderStatus orderStatus);
}
