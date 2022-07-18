package jwtspring.repository;

import jwtspring.models.ServiceRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRatingRepository extends JpaRepository<ServiceRating, Long> {
    List<ServiceRating> getAllByToService(long serviceId);

    Boolean existsByFromUserAndToService(long fromUser, long toUser);
}
