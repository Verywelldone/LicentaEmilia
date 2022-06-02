package jwtspring.controllers;

import jwtspring.models.product.ProductCategory;
import jwtspring.service.ProductCategoryService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/categories")
@AllArgsConstructor
public class ProductCategoryController {

  private final ProductCategoryService productCategoryService;

  @GetMapping("/{id}")
  //    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<ProductCategory> getProductCategoryById(@PathVariable long id) {
    return productCategoryService.getOne(id);
  }

  @GetMapping("/all")
  //    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<ProductCategory>> getAllProductCategories() {
    return productCategoryService.getAll();
  }

  @PostMapping("/add")
  //    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<String> addProductCategory(@RequestBody final ProductCategory productCategory) {
    return productCategoryService.addProductCategory(productCategory);
  }

  @PutMapping({"/{productCategoryId}"})
  //    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<String> updateProductCategory(@RequestBody final ProductCategory productCategory,
      @PathVariable long productCategoryId) {
    return productCategoryService.updateProductCategory(productCategory, productCategoryId);
  }

  @DeleteMapping("{id}")
  //    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<String> deleteProductCategory(@PathVariable long id) {
    return productCategoryService.deleteProductCategory(id);
  }
}
