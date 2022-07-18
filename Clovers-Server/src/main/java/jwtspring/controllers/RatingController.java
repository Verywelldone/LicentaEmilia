package jwtspring.controllers;

import jwtspring.models.ServiceRating;
import jwtspring.models.dto.ServiceRatingResDTO;
import jwtspring.service.ProductRatingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/service")
@AllArgsConstructor
public class RatingController {

    private final ProductRatingService productRatingService;

    @GetMapping("/get-ratings/{serviceId}")
    public ResponseEntity<List<ServiceRatingResDTO>> getAllServiceRatings(@PathVariable(value = "serviceId") int serviceId) {
        return productRatingService.getAllServiceRatings(serviceId);
    }

    @PostMapping("/save-rating")
    public ResponseEntity saveRating(@RequestBody ServiceRating serviceRating) {
        return productRatingService.saveRating(serviceRating);
    }
}
