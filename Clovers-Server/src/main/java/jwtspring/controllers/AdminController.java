package jwtspring.controllers;

import jwtspring.models.User;
import jwtspring.models.dto.MaintainUserDTO;
import jwtspring.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/user-list")
    public ResponseEntity<List<MaintainUserDTO>> getUserList() {
        return this.adminService.getAllUsers();
    }

   @GetMapping("/user-list-with-orders")
    public ResponseEntity<List<User>> getUserListWithOrders() {
        return this.adminService.getAllUsersWithOrders();
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
