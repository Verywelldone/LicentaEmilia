package jwtspring.controllers;

import jwtspring.models.product.Product;
import jwtspring.models.product.ProductCategory;
import jwtspring.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
  public ResponseEntity<Product> getProductById(@PathVariable long id) {
    return productService.getOne(id);
  }

  @GetMapping("/all")
  public ResponseEntity<List<Product>> getAllProducts() {
    return productService.getAllProducts();
  }

  @PostMapping("/getByProductCategory")
  public ResponseEntity<List<Product>> getAllProductsByCategory(@RequestBody @Valid ProductCategory productCategory) {
    return productService.getAllProductsByCategory(productCategory);
  }

  @GetMapping("/recommended")
  public ResponseEntity<List<Product>> getRandomProducts() {
    return productService.getRandomProducts();
  }

  @PostMapping(value = "/add")
  public ResponseEntity<String> addProduct(@RequestBody @Valid final Product product) {
    return productService.addProduct(product);
  }

  @PutMapping
  public ResponseEntity<Product> updateProduct(@RequestBody @Valid final Product product) {
    return productService.saveOrUpdate(product);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteProduct(@PathVariable long id) {
    return productService.deleteProduct(id);
  }
}
