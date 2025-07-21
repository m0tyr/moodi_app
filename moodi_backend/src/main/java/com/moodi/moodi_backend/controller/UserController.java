package com.moodi.moodi_backend.controller;

import com.moodi.moodi_backend.domain.DUser;
import com.moodi.moodi_backend.domain.DUserCreate;
import com.moodi.moodi_backend.domain.ResponseTypeMsg.RTMPost;
import com.moodi.moodi_backend.enums.RTMStatus;
import com.moodi.moodi_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<DUser> getCurrentUser() {
        DUser user = userService.getCurrentUserEntity();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DUser> getUserById(@PathVariable Long id) {
        DUser user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<DUser> getUserByUsername(@PathVariable String username) {
        DUser user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<DUser>> getAllUsers() {
        List<DUser> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DUser> updateUser(@PathVariable Long id, @RequestBody DUser userDTO) {
        DUser updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/update-last-login")
    public ResponseEntity<String> updateLastLogin(@RequestBody String username) {
        userService.updateLastLogin(username);
        return ResponseEntity.ok("Last login updated successfully");
    }

}