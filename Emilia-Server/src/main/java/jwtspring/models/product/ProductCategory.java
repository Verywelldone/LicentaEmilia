package jwtspring.models.product;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductCategory {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column
  private String description;

  @Column
  private String name;

  @Column
  private String thumbnail;

  @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Product> products = new ArrayList<>();

  public void addProduct(Product product) {
    products.add(product);
    product.setProductCategory(this);
  }

  public void removeProduct(Product product) {
    products.remove(product);
    product.setProductCategory(null);
  }

}
