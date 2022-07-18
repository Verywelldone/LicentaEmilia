package jwtspring.repository;

import jwtspring.models.User;
import jwtspring.models.order.EOrderStatus;
import jwtspring.models.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUser(final User user);

    List<Order> findAllByOrderStatus(final EOrderStatus orderStatus);
}
