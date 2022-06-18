package jwtspring.repository;

import jwtspring.models.product.ProductItem;
import jwtspring.models.product.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductItem, Long> {

  Optional<ProductItem> findByName(String name);

  List<ProductItem> findAllByProductCategory(final ProductCategory productCategory);

}
