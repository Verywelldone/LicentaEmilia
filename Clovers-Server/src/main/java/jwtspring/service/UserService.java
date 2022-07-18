package jwtspring.service;

import jwtspring.models.User;
import jwtspring.models.product.ProductItem;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public void addUserFavoriteProduct(ProductItem productItem) {

        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getFavoriteProductItems().contains(productItem)) {
                user.getFavoriteProductItems().add(productItem);
                userRepository.save(user);
            }
        }
    }

    public List<ProductItem> getAllUserFavoriteProducts() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new ArrayList<>(user.getFavoriteProductItems());
        }
        return null;
    }

    public void removeUserFavoriteProduct(ProductItem productItem) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user.getFavoriteProductItems().size());

            log.info("Found user with id {} and username {} and removing productItem with id {} and name {}", user.getId(), user.getUsername(), productItem.getId(), productItem.getName());
            user.getFavoriteProductItems().remove(productItem);
            System.out.println(user.getFavoriteProductItems().size());

            userRepository.save(user);
        }
    }

    private Optional<User> getOptionalUser() {
        String username;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return userRepository.findByUsername(username);
    }

}
