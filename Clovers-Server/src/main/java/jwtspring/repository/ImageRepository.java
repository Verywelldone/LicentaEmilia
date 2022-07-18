package jwtspring.repository;

import jwtspring.models.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<UserProfileImage,Long> {
}
