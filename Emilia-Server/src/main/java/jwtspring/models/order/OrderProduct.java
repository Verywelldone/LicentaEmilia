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

  @Column
  private long userId;

  @Transient
  public Product getProduct() {
    return this.pk.getProduct();
  }

  @Transient
  public Double getTotalPrice() {
    return getProduct().getPrice() * getQuantity();
  }

}
