package jwtspring.service;

import jwtspring.models.product.ProductItem;
import jwtspring.models.product.ProductCategory;
import jwtspring.repository.ProductCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;


    public ResponseEntity<ProductCategory> getOne(final long id) {
        return productCategoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }


    public ResponseEntity<List<ProductCategory>> getAll() {
        return new ResponseEntity<>(productCategoryRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<String> addProductCategory(final ProductCategory category) {
        if (isProductAlreadySaved(category.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("There is already a category with the same name!");
        }

        productCategoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body("ProductItem Category has been saved successfully!");
    }

    public ResponseEntity<String> deleteProductCategory(final long categoryId) {
        if (!productCategoryRepository.findById(categoryId).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductItem category does not exist!");
        }
        productCategoryRepository.deleteById(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body("ProductItem Category has been successfully deleted!");
    }

    public ResponseEntity<String> updateProductCategory(final ProductCategory newCategory, final long productId) {

        Optional<ProductCategory> actualProductCategoryOpt = productCategoryRepository.findById(productId);
        if (!actualProductCategoryOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductItem category does not exist!");
        }

        ProductCategory actualCategory = actualProductCategoryOpt.get();

        actualCategory.setName(newCategory.getName());
        actualCategory.setDescription(newCategory.getDescription());
        actualCategory.setThumbnail(newCategory.getThumbnail());

        for (ProductItem productItem : newCategory.getProductItems()) {
            if (productCategoryRepository.findProductCategoryByProductItems(productItem).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("ProductItem already assigned to a category!");
        }

        actualCategory.setProductItems(newCategory.getProductItems());

        productCategoryRepository.save(actualCategory);

        return ResponseEntity.status(HttpStatus.OK).body("ProductItem category has been successfully updated!");
    }


    private boolean isProductAlreadySaved(String categoryName) {
        return productCategoryRepository.findProductCategoryByName(categoryName).isPresent();
    }
}
