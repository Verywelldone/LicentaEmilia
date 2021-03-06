package jwtspring.controllers;

import jwtspring.models.*;
import jwtspring.payload.request.LoginRequest;
import jwtspring.payload.request.SignupRequest;
import jwtspring.payload.response.JwtResponse;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.RoleRepository;
import jwtspring.repository.UserInfoRepository;
import jwtspring.repository.UserProfileImageRepository;
import jwtspring.repository.UserRepository;
import jwtspring.security.jwt.JwtUtils;
import jwtspring.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired

    UserProfileImageRepository userProfileImageRepository;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {



        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        String lastLogin = format.format(new Date());


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Optional<User> userOpt = userRepository.findById(userDetails.getId());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setLastLogin(lastLogin);
            userRepository.save(user);

            if (user.getIsBanned())
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account is banned!");
        }

        final JwtResponse jwtResponse = JwtResponse.builder()
                .token(jwt)
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .roles(roles)
                .userInfo(userDetails.getUserInfo()).build();

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        String currentDate = format.format(new Date());

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        user.setCreatedAt(getDate());
        user.setIsBanned(false);
        user.setCreatedAt(currentDate);
        user.setIsConfirmed(false);

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findById(1)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;

                    case "gestioner":
                        Role gestioner = roleRepository.findByName(ERole.ROLE_GESTIONER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(gestioner);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }


        UserInfo userInfo = signUpRequest.getUserInfo();
        UserProfileImage userProfileImage = new UserProfileImage();

        userProfileImage.setUserInfo(userInfo);
        userInfo.setProfileImage(userProfileImage);


        userInfo.setUser(user);
        user.setUserInfo(userInfo);

        user.setRoles(roles);

        userProfileImageRepository.save(userProfileImage);
        userInfoRepository.save(userInfo);
        userRepository.save(user);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    private String getDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());

    }
}
