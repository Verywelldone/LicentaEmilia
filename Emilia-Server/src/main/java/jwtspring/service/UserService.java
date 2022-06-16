package jwtspring.service;

import jwtspring.models.User;
import jwtspring.models.product.Product;
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

    public void addUserFavoriteProduct(Product product) {

        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getFavoriteProducts().contains(product)) {
                user.getFavoriteProducts().add(product);
                userRepository.save(user);
            }
        }
    }

    public List<Product> getAllUserFavoriteProducts() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new ArrayList<>(user.getFavoriteProducts());
        }
        return null;
    }

    public void removeUserFavoriteProduct(Product product) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user.getFavoriteProducts().size());

            log.info("Found user with id {} and username {} and removing product with id {} and name {}", user.getId(), user.getUsername(), product.getId(), product.getName());
            user.getFavoriteProducts().remove(product);
            System.out.println(user.getFavoriteProducts().size());

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
