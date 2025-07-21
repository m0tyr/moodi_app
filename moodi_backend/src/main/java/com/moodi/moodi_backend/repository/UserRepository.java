package com.moodi.moodi_backend.repository;

import com.moodi.moodi_backend.entity.EUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<EUser, Long> {
    Optional<EUser> findByUsername(String username);
    boolean existsByUsername(String username);
}


