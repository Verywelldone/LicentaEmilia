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
@Table(name = "products",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
    })
public class Product {

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
    Product product = (Product) o;
    return Objects.equals(id, product.id) && Objects.equals(name, product.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}
