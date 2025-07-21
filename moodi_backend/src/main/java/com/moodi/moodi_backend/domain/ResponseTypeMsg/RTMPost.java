package com.moodi.moodi_backend.domain.ResponseTypeMsg;

import com.moodi.moodi_backend.enums.RTMStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RTMPost {
    private RTMStatus httpStatus;
}
