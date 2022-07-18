package jwtspring.repository;

import jwtspring.models.order.OrderProduct;
import jwtspring.models.order.OrderProductPK;
import org.springframework.data.repository.CrudRepository;

public interface OrderProductRepository extends CrudRepository<OrderProduct, OrderProductPK> {
}
