package jwtspring.models.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jwtspring.models.product.Product;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderProduct {

  @EmbeddedId
  @JsonIgnore
  private OrderProductPK pk;

  @Column(nullable = false)
  private Integer quantity;

  public OrderProduct(Order order, Product one, Integer quantity) {
    pk = new OrderProductPK();
    pk.setOrder(order);
    pk.setProductItem(one);
    this.quantity = quantity;
  }

  @Transient
  public Product getProduct() {
    return this.pk.getProductItem();
  }

  @Transient
  public Double getTotalPrice() {
    return getProduct().getPrice() * getQuantity();
  }

}
