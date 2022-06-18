package jwtspring.service;

import jwtspring.models.order.Order;
import jwtspring.models.order.OrderProduct;
import jwtspring.models.product.ProductCategory;
import jwtspring.models.product.ProductItem;
import jwtspring.repository.OrderRepository;
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
  private final OrderRepository orderRepository;


  public ResponseEntity<ProductItem> getOne(final long id) {
    log.info("Find product by id: {}", id);
    return productRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.noContent().build());
  }

  public ResponseEntity<List<ProductItem>> getAllProducts() {
    log.info("Finding all Products");
    return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<List<ProductItem>> getAllProductsByCategory(final ProductCategory category) {
    return ResponseEntity.ok(this.productRepository.findAllByProductCategory(category));
  }

  public ResponseEntity<ProductItem> saveOrUpdate(final ProductItem productItem) {
    if (null == productItem.getId()) {
      Optional<ProductCategory> productCategoryOpt = productCategoryRepository.findProductCategoryByName(
          productItem.getProductCategory().getName());
      ProductCategory productCategory = productCategoryOpt.get();
      productCategory.getProductItems().add(productItem);
      productCategoryRepository.save(productCategory);

    }

    if (isProductAlreadySaved(productItem)) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

    return ResponseEntity.ok(productRepository.save(productItem));
  }

  public ResponseEntity<String> addProduct(final ProductItem productItem) {
    boolean processRunning = true;

    if (processRunning) {

      processRunning = false;
      log.info("Started saving productItem with name: {} in category {}:", productItem.getName(), productItem.getProductCategory().getName());

      if (isProductAlreadySaved(productItem)) {
        log.error("Duplicate productItem name: {}", productItem.getName());
        return ResponseEntity.status(HttpStatus.CONFLICT).body("There is already a productItem with the same name!");
      }

      Optional<ProductCategory> productCategoryOpt = productCategoryRepository.findById(productItem.getProductCategory().getId());

      if (!productCategoryOpt.isPresent()) {
        log.error("No category with name: {}", productItem.getProductCategory().getName());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no category for that productItem!");
      }

      ProductCategory productCategory = productCategoryOpt.get();
      productCategory.addProduct(productItem);

      productItem.setProductCategory(productCategory);
      productRepository.save(productItem);

      processRunning = true;
    }

//    productCategoryRepository.save(productCategory);

    return ResponseEntity.ok("ProductItem has been saved successfully!");
  }

  public ResponseEntity<String> updateProduct(final ProductItem productItem) {

    Optional<ProductItem> productOpt = productRepository.findById(productItem.getId());
    if (!productOpt.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductItem does not exist!");
    }
    //        ProductItem updatedProduct = productOpt.get();
    //        updatedProduct(updateProductDto, updatedProduct);

    productRepository.save(productItem);

    return ResponseEntity.status(HttpStatus.OK).body("ProductItem has been successfully updated!");
  }

  public ResponseEntity<String> deleteProduct(final long productId) {
    log.info("Started deleting product with id: {}", productId);
    Optional<ProductItem> productOptional = productRepository.findById(productId);
    if (!productOptional.isPresent()) {
      log.error("No product with id: {}", productId);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProductItem does not exist!");
    }
    ProductItem product = productOptional.get();
    List<Order> orderList = orderRepository.findAll();
    for (Order order : orderList) {
      for (OrderProduct productItem : order.getOrderProducts())
        if (productItem.getProduct().equals(product)) {
          return ResponseEntity.status(HttpStatus.CONFLICT).body("Product is being used in an order!");
        }
    }

    ProductCategory productCategory = productCategoryRepository.findProductCategoryByProductItems(product).get();
    productCategory.getProductItems().remove(productOptional.get());
    productCategoryRepository.save(productCategory);


    log.info("Finished deleting product with id: {}", productId);
    return ResponseEntity.status(HttpStatus.OK).body("ProductItem has been successfully deleted!");
  }

  public ResponseEntity<List<ProductItem>> getRandomProducts() {
    final Random random = new Random();

    List<ProductItem> productItems = productRepository.findAll();
    List<ProductItem> randomProductItemList = new ArrayList<>();

    for (int i = 0; i < 5; i++) {
      int randomNumber = random.nextInt(productItems.size());
      randomProductItemList.add(productItems.get(randomNumber));
      productItems.remove(productItems.get(randomNumber));
    }
    log.info("Returning 5 random recommended productItems");

    return ResponseEntity.ok(randomProductItemList);

  }

  //
  //    private void updatedProduct(UpdateProductDTO updateProductDto, ProductItem updatedProduct) {
  //        updatedProduct.setDescription(updateProductDto.getProductItem().getDescription());
  //        updatedProduct.setName(updateProductDto.getProductItem().getName());
  //        updatedProduct.setStock(updateProductDto.getProductItem().getStock());
  //        updatedProduct.setThumbnail(updateProductDto.getProductItem().getThumbnail());
  //        updatedProduct.setWeight(updateProductDto.getProductItem().getWeight());
  //        updatedProduct.setImage(updateProductDto.getProductItem().getImage());
  //    }

  private boolean isProductAlreadySaved(ProductItem productItem) {
    return productRepository.findByName(productItem.getName()).isPresent();
  }

}
