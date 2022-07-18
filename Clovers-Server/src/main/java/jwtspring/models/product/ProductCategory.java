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
  private List<ProductItem> productItems = new ArrayList<>();

  public void addProduct(ProductItem productItem) {
    productItems.add(productItem);
    productItem.setProductCategory(this);
  }

  public void removeProduct(ProductItem productItem) {
    productItems.remove(productItem);
    productItem.setProductCategory(null);
  }

}
