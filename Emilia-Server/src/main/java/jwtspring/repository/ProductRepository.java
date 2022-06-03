package jwtspring.repository;

import jwtspring.models.product.Product;
import jwtspring.models.product.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  Optional<Product> findByName(String name);

  List<Product> findAllByProductCategory(final ProductCategory productCategory);

}
