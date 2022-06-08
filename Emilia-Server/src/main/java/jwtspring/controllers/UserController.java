package jwtspring.controllers;

import jwtspring.models.product.Product;
import jwtspring.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/favorites/add")
    public void addUserFavoriteProduct(@Valid @RequestBody Product product) {
        userService.addUserFavoriteProduct(product);
    }

    @GetMapping("/favorites/get-all")
    public List<Product> getAllUserFavoriteProducts() {
        return userService.getAllUserFavoriteProducts();
    }

    @PostMapping("/favorites/remove")
    public void removeUserFavoriteProduct(@Valid @RequestBody Product product) {
        userService.removeUserFavoriteProduct(product);
    }

}
