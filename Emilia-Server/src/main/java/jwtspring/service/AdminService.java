package jwtspring.service;

import jwtspring.models.ERole;
import jwtspring.models.User;
import jwtspring.repository.RoleRepository;
import jwtspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userRepository
                .findAllByRoles(roleRepository.findByName(ERole.ROLE_USER))
                .stream()
                .filter(user ->
                        user.getRoles()
                                .stream()
                                .noneMatch(role -> role.getName().equals(ERole.ROLE_ADMIN)))
                .collect(Collectors.toList());

        return ResponseEntity.ok(userList);
    }

    public ResponseEntity<User> getOneById(long id) {
        return ResponseEntity.of(userRepository.findById(id));
    }

    public ResponseEntity<String> deleteById(long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User has been deleted");
    }

    public ResponseEntity<String> disableAccount(long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setAccountAvailable(false);
            userRepository.save(user);
        }
        return ResponseEntity.ok("User account has been disabled!");
    }

    public ResponseEntity<String> enableAccount(long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setAccountAvailable(true);
            userRepository.save(user);
        }
        return ResponseEntity.ok("User account has been enabled!");
    }
}
