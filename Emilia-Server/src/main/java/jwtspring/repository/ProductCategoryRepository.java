package jwtspring.repository;

import jwtspring.models.product.Product;
import jwtspring.models.product.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
    Optional<ProductCategory> findProductCategoryByName(final String name);
    Optional<ProductCategory> findProductCategoryByProducts(Product product);
}
