package com.moodi.moodi_backend.controller;

import com.moodi.moodi_backend.domain.DUserCreate;
import com.moodi.moodi_backend.domain.DUserLogin;
import com.moodi.moodi_backend.enums.RTMStatus;
import com.moodi.moodi_backend.service.AuthService;
import com.moodi.moodi_backend.utils.UtilTools;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;


    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody DUserCreate userCreate,
                                                      HttpServletRequest request) {
        RTMStatus result = authService.signup(userCreate, request);

        Map<String, Object> response = new HashMap<>();
        response.put("status", result.name());

        if (result == RTMStatus.ACCOUNT_CREATED) {
            response.put("message", "Account created successfully");
            response.put("username", userCreate.getUsername());
            response.put("auto_logged_in", true);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate-session")
    public ResponseEntity<Map<String, Object>> validateSession(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            RTMStatus result = authService.validateSession(request);

            switch (result) {
                case VALID_SESSION -> {
                    HttpSession session = request.getSession(false);
                    response.put("valid", true);
                    response.put("userId", session.getAttribute("userId"));
                    response.put("username", session.getAttribute("username"));
                    response.put("sessionId", session.getId());
                    response.put("loginTime", session.getAttribute("loginTime"));
                    response.put("lastAccessed", session.getLastAccessedTime());
                }

                case NO_SESSION_FOUND -> UtilTools.addInvalid(response, "No session found");
                case SESSION_INVALID -> UtilTools.addInvalid(response, "Session is new/invalid");
                case SS_CTX_NOT_FOUND -> UtilTools.addInvalid(response, "No Spring Security context found");
                case MISSING_SESSION_ATTRIBUTE -> UtilTools.addInvalid(response, "Missing required session attributes");
                case FAKE_SESSION_USER_DETECTED -> UtilTools.addInvalid(response, "Session user not found in database");
                case IP_SESSION_MISMATCH -> UtilTools.addInvalid(response, "IP address mismatch - potential security issue");
                default -> UtilTools.addInvalid(response, "Unknown session validation result");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            UtilTools.addInvalid(response,"Validation error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody DUserLogin loginRequest,
                                                     HttpServletRequest request) {
        RTMStatus result = authService.login(loginRequest, request);

        Map<String, Object> response = new HashMap<>();

        if (result == RTMStatus.LOGIN_SUCCESS) {
            HttpSession session = request.getSession(false);
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("username", loginRequest.getUsername());
            response.put("session_id", session.getId());
            response.put("login_time", session.getAttribute("loginTime"));

            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", result.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Logged out successfully"
        ));
    }
}
