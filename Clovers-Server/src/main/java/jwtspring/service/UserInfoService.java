package jwtspring.service;


import jwtspring.models.User;
import jwtspring.models.dto.UpdateUserInfoDto;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserInfoService {

    @Autowired
    private final UserRepository userRepository;

    public ResponseEntity updateUserInfo(UpdateUserInfoDto userInfoDto) {
        log.info("Updating user info");
        Optional<User> userOptional = this.getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.getUserInfo().setEmail(userInfoDto.getEmail());
            user.getUserInfo().setAddress(userInfoDto.getAddress());
            user.getUserInfo().setCity(userInfoDto.getCity());
            user.getUserInfo().setFirstName(userInfoDto.getFirstName());
            user.getUserInfo().setLastName(userInfoDto.getLastName());
            user.getUserInfo().setPhoneNumber(userInfoDto.getPhoneNumber());
            user.setEmail(userInfoDto.getEmail());

            SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
            String lastUpdated = format.format(new Date());
            user.setUpdatedAt(lastUpdated);

            userRepository.save(user);
        }

        return ResponseEntity.ok("User info updated successfully");
    }

    public ResponseEntity getLoggedInUserInfo() {
        log.info("Get logged in user info");
        Optional<User> userOptional = this.getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            log.info("User found");

            return ResponseEntity.ok(user.getUserInfo());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
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
