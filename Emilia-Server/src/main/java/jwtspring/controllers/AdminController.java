package jwtspring.controllers;

import jwtspring.models.User;
import jwtspring.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/user-list")
    public ResponseEntity<List<User>> getUserList() {
        return this.adminService.getAllUsers();
    }

    @PostMapping("/disable-account")
    public ResponseEntity<String> disableAccount(@RequestBody long userId) {
        return this.adminService.disableAccount(userId);
    }

    @PostMapping("/enable-account")
    public ResponseEntity<String> enableAccount(@RequestBody long userId) {
        return this.adminService.enableAccount(userId);
    }
}
