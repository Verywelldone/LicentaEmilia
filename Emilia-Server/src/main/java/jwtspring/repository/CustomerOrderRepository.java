package jwtspring.repository;

import jwtspring.models.order.CustomerOrder;
import jwtspring.models.order.EOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findAllByCustomer(final long customerId);

    List<CustomerOrder> findAllByOrderStatus(final EOrderStatus orderStatus);
}
