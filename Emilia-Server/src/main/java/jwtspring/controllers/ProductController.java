package jwtspring.controllers;

import jwtspring.models.product.Product;
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
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Product> getOne(@PathVariable long id) {
        return productService.getOne(id);
    }

    @GetMapping("/all")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/getByProductCategory")
    public ResponseEntity<List<Product>> getAllProductsByCategory(@RequestBody @Valid ProductCategory productCategory) {
        return productService.getAllProductsByCategory(productCategory);
    }

    @PostMapping(value = "/add")
//    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> addProduct(@RequestBody @Valid final Product product) {
        return productService.addProduct(product);
    }

    @PutMapping
//    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@RequestBody @Valid final Product product) {
        return productService.saveOrUpdate(product);
    }

    @DeleteMapping("{id}")
//    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        return productService.deleteProduct(id);
    }
}
