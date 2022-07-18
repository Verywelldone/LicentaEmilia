package jwtspring.service;

import jwtspring.models.ServiceRating;
import jwtspring.models.User;
import jwtspring.models.dto.ServiceRatingResDTO;
import jwtspring.models.product.ProductItem;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.ProductRatingRepository;
import jwtspring.repository.ProductRepository;
import jwtspring.repository.UserProfileImageRepository;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductRatingService {
    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;
    private final ProductRepository productRepository;


    public ResponseEntity<List<ServiceRatingResDTO>> getAllServiceRatings(long serviceId) {
        List<ServiceRatingResDTO> serviceRatingResDTOS = new ArrayList<>();
        List<ServiceRating> serviceRatingList = productRatingRepository.getAllByToService(serviceId);

        serviceRatingList.forEach(serviceRating -> {
            User user = getUser(serviceRating);
            ProductItem productItem = productRepository.getOne(serviceId);

            assert user != null;
            serviceRatingResDTOS.add(ServiceRatingResDTO.of(serviceRating, productItem, user.getUserInfo()));
        });


        return ResponseEntity.ok(serviceRatingResDTOS);
    }

    private User getUser(ServiceRating serviceRating) {
        Optional<User> userOpt = userRepository.findById(serviceRating.getFromUser());
        if (userOpt.isPresent())
            return userOpt.get();
        return null;
    }

    public ResponseEntity saveRating(ServiceRating serviceRating) {
        if (productRatingRepository.existsByFromUserAndToService(serviceRating.getFromUser(), serviceRating.getToService()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You have already rated this service"));

        this.productRatingRepository.save(serviceRating);
        return ResponseEntity.ok(new MessageResponse("rating saved successfully"));
    }
}
