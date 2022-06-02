package jwtspring.models.order;

import jwtspring.models.product.Product;
import lombok.*;

import javax.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetails {

  @Id
  @Column
  private long id;

  @Column
  private BigDecimal totalPrice;

  @Column
  private int quantity;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Product> products = new ArrayList<>();

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_order")
  private Order order;
}
