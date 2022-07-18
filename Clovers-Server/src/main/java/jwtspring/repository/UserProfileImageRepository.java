package jwtspring.repository;

import jwtspring.models.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileImageRepository extends JpaRepository<UserProfileImage,Integer> {
}
