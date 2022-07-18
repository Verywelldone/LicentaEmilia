package jwtspring.models.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "productItems",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
    })
public class ProductItem {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @Column
  private Double price;

  @Column
  private BigDecimal weight;

  @Column
  private String description;

  @Column
  private String image;

  @Column
  private int stock;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonBackReference
  private ProductCategory productCategory;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ProductItem productItem = (ProductItem) o;
    return Objects.equals(id, productItem.id) && Objects.equals(name, productItem.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}
