package com.moodi.moodi_backend.domain;

import com.moodi.moodi_backend.enums.MoodiEmojis;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DMoodi {
    private Long id;
    private String name;
    private String category;
    private MoodiEmojis emoji;
    private Long userId;
    private Integer streak;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdate;

}
