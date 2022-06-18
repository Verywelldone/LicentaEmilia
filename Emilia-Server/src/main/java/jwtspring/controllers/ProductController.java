package jwtspring.controllers;

import jwtspring.models.product.ProductItem;
import jwtspring.models.product.ProductCategory;
import jwtspring.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

  private final ProductService productService;

  @GetMapping("/{id}")
  public ResponseEntity<ProductItem> getProductById(@PathVariable long id) {
    return productService.getOne(id);
  }

  @GetMapping("/all")
  public ResponseEntity<List<ProductItem>> getAllProducts() {
    return productService.getAllProducts();
  }

  @PostMapping("/getByProductCategory")
  public ResponseEntity<List<ProductItem>> getAllProductsByCategory(@RequestBody @Valid ProductCategory productCategory) {
    return productService.getAllProductsByCategory(productCategory);
  }

  @GetMapping("/recommended")
  public ResponseEntity<List<ProductItem>> getRandomProducts() {
    return productService.getRandomProducts();
  }

  @PostMapping(value = "/add")
  public ResponseEntity<String> addProduct(@RequestBody @Valid final ProductItem productItem) {
    return productService.addProduct(productItem);
  }

  @PutMapping
  public ResponseEntity<ProductItem> updateProduct(@RequestBody @Valid final ProductItem productItem) {
    return productService.saveOrUpdate(productItem);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteProduct(@PathVariable long id) {
    return productService.deleteProduct(id);
  }
}
