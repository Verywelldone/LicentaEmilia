package jwtspring.controllers;

import jwtspring.models.product.ProductCategory;
import jwtspring.service.ProductCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/categories")
@AllArgsConstructor
public class ProductCategoryController {

  private final ProductCategoryService productCategoryService;

  @GetMapping("/{id}")
  public ResponseEntity<ProductCategory> getProductCategoryById(@PathVariable long id) {
    return productCategoryService.getOne(id);
  }

  @GetMapping("/all")
  public ResponseEntity<List<ProductCategory>> getAllProductCategories() {
    return productCategoryService.getAll();
  }

  @PostMapping("/add")
  public ResponseEntity<String> addProductCategory(@RequestBody final ProductCategory productCategory) {
    return productCategoryService.addProductCategory(productCategory);
  }

  @PutMapping({"/{productCategoryId}"})
  public ResponseEntity<String> updateProductCategory(@RequestBody final ProductCategory productCategory,
      @PathVariable long productCategoryId) {
    return productCategoryService.updateProductCategory(productCategory, productCategoryId);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteProductCategory(@PathVariable long id) {
    return productCategoryService.deleteProductCategory(id);
  }
}
