package com.moodi.moodi_backend.entity;

import com.moodi.moodi_backend.enums.MoodiEmojis;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "moodi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EMoodi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MoodiEmojis emoji;

    @Column(nullable = false)
    private String category;

    @Column(name = "last_update", nullable = false)
    private LocalDateTime lastUpdate;

    @Column(name = "streak", nullable = false)
    private Integer streak;

    @Column(nullable = false)
    private Long userId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (lastUpdate == null) {
            lastUpdate = LocalDateTime.now();
        }
        if (streak == null) {
            streak = 1;
        }
    }
}