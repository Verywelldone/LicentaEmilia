package jwtspring.controllers;

import jwtspring.models.dto.UpdateUserInfoDto;
import jwtspring.models.product.ProductItem;
import jwtspring.service.UserInfoService;
import jwtspring.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    private final UserInfoService userInfoService;

    @PostMapping("/favorites/add")
    public void addUserFavoriteProduct(@Valid @RequestBody ProductItem productItem) {
        userService.addUserFavoriteProduct(productItem);
    }

    @GetMapping("/favorites/get-all")
    public List<ProductItem> getAllUserFavoriteProducts() {
        return userService.getAllUserFavoriteProducts();
    }

    @PostMapping("/favorites/remove")
    public void removeUserFavoriteProduct(@Valid @RequestBody ProductItem productItem) {
        userService.removeUserFavoriteProduct(productItem);
    }

    @PutMapping("/update-userinfo")
    public ResponseEntity updateUserInfo(@RequestBody UpdateUserInfoDto userInfoDto) {
        return userInfoService.updateUserInfo(userInfoDto);
    }

    @GetMapping("/update-userinfo")
    public ResponseEntity getLoggedInUserInfo() {
        return userInfoService.getLoggedInUserInfo();
    }
}
