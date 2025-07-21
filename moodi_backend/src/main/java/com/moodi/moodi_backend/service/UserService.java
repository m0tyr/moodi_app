package com.moodi.moodi_backend.service;

import com.moodi.moodi_backend.domain.DUser;
import com.moodi.moodi_backend.domain.DUserCreate;
import com.moodi.moodi_backend.entity.EMoodi;
import com.moodi.moodi_backend.entity.EUser;
import com.moodi.moodi_backend.enums.RTMStatus;
import com.moodi.moodi_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public DUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Optional<EUser> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return convertToDTO(user.get());
        }
        throw new RuntimeException("User not found");
    }

    public DUser getUserById(Long id) {
        Optional<EUser> user = userRepository.findById(id);
        if (user.isPresent()) {
            return convertToDTO(user.get());
        }
        throw new RuntimeException("User not found");
    }

    public DUser getUserByUsername(String username) {
        Optional<EUser> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return convertToDTO(user.get());
        }
        throw new RuntimeException("User not found");
    }

    public List<DUser> getAllUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();

        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals(currentUsername))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DUser updateUser(Long id, DUser userDTO) {
        Optional<EUser> existingUser = userRepository.findById(id);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();
        if(!Objects.equals(currentUsername, existingUser.get().getUsername())){
            throw new RuntimeException("User not allowed");
        }
        EUser user = existingUser.get();
        //pour l'instant il y'a que ca de disponible
        user.setUsername(userDTO.getUsername());
        EUser savedUser = userRepository.save(user);

        UserDetails updatedUserDetails = new org.springframework.security.core.userdetails.User(
                savedUser.getUsername(),
                savedUser.getPassword(),
                auth.getAuthorities()
        );

        Authentication newAuth = new UsernamePasswordAuthenticationToken(
                updatedUserDetails,
                auth.getCredentials(),
                auth.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return convertToDTO(savedUser);
    }

    public void updateLastLogin(String username) {
        Optional<EUser> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            EUser u = user.get();
            u.setLastLogin(LocalDateTime.now());
            userRepository.save(u);
        }
    }

    public DUser getCurrentUserEntity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        return this.convertToDTO(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }

    private DUser convertToDTO(EUser user) {
        DUser dto = new DUser();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        dto.setIsActive(user.getIsActive());
        return dto;
    }


}
