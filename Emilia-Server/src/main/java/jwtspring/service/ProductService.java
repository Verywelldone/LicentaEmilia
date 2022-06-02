package jwtspring.service;

import jwtspring.models.product.Product;
import jwtspring.models.product.ProductCategory;
import jwtspring.repository.ProductCategoryRepository;
import jwtspring.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

  private final ProductRepository productRepository;
  private final ProductCategoryRepository productCategoryRepository;

  public ResponseEntity<Product> getOne(final long id) {
    log.info("Find product by id: {}", id);
    return productRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.noContent().build());
  }

  public ResponseEntity<List<Product>> getAllProducts() {
    log.info("Finding all Products");
    return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<List<Product>> getAllProductsByCategory(final ProductCategory category) {
    return ResponseEntity.ok(this.productRepository.findAllByProductCategory(category));
  }

  public ResponseEntity<Product> saveOrUpdate(final Product product) {
    if (null == product.getId()) {
      Optional<ProductCategory> productCategoryOpt = productCategoryRepository.findProductCategoryByName(
          product.getProductCategory().getName());
      ProductCategory productCategory = productCategoryOpt.get();
      productCategory.getProducts().add(product);
      productCategoryRepository.save(productCategory);

    }

    if (isProductAlreadySaved(product)) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

    return ResponseEntity.ok(productRepository.save(product));
  }

  public ResponseEntity<String> addProduct(final Product product) {

    log.info("Started saving product with name: {} in category {}:", product.getName(), product.getProductCategory().getName());

    if (isProductAlreadySaved(product)) {
      log.error("Duplicate product name: {}", product.getName());
      return ResponseEntity.status(HttpStatus.CONFLICT).body("There is already a product with the same name!");
    }

    Optional<ProductCategory> productCategoryOpt = productCategoryRepository.findById(product.getProductCategory().getId());

    if (!productCategoryOpt.isPresent()) {
      log.error("No category with name: {}", product.getProductCategory().getName());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no category for that product!");
    }

    ProductCategory productCategory = productCategoryOpt.get();
    productCategory.addProduct(product);

    productCategoryRepository.save(productCategory);

    return ResponseEntity.ok("Product has been saved successfully!");
  }

  public ResponseEntity<String> updateProduct(final Product product) {

    Optional<Product> productOpt = productRepository.findById(product.getId());
    if (!productOpt.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product does not exist!");
    }
    //        Product updatedProduct = productOpt.get();
    //        updatedProduct(updateProductDto, updatedProduct);

    productRepository.save(product);

    return ResponseEntity.status(HttpStatus.OK).body("Product has been successfully updated!");
  }

  public ResponseEntity<String> deleteProduct(final long productId) {
    log.info("Started deleting product with id: {}", productId);
    Optional<Product> productOptional = productRepository.findById(productId);
    if (!productOptional.isPresent()) {
      log.error("No product with id: {}", productId);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product does not exist!");
    }

    ProductCategory productCategory = productCategoryRepository.findProductCategoryByProducts(productOptional.get()).get();
    productCategory.getProducts().remove(productOptional.get());
    productCategoryRepository.save(productCategory);

    log.info("Finished deleting product with id: {}", productId);
    return ResponseEntity.status(HttpStatus.OK).body("Product has been successfully deleted!");
  }

  public ResponseEntity<List<Product>> getRandomProducts() {
    final Random random = new Random();

    List<Product> products = productRepository.findAll();
    List<Product> randomProductList = new ArrayList<>();

    for (int i = 0; i < 5; i++) {
      int randomNumber = random.nextInt(products.size());
      randomProductList.add(products.get(randomNumber));
      products.remove(products.get(randomNumber));
    }
    log.info("Returning 5 random recommended products");

    return ResponseEntity.ok(randomProductList);

  }

  //
  //    private void updatedProduct(UpdateProductDTO updateProductDto, Product updatedProduct) {
  //        updatedProduct.setDescription(updateProductDto.getProduct().getDescription());
  //        updatedProduct.setName(updateProductDto.getProduct().getName());
  //        updatedProduct.setStock(updateProductDto.getProduct().getStock());
  //        updatedProduct.setThumbnail(updateProductDto.getProduct().getThumbnail());
  //        updatedProduct.setWeight(updateProductDto.getProduct().getWeight());
  //        updatedProduct.setImage(updateProductDto.getProduct().getImage());
  //    }

  private boolean isProductAlreadySaved(Product product) {
    return productRepository.findByName(product.getName()).isPresent();
  }

}
