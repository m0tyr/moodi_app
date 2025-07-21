package com.moodi.moodi_backend.service;

import com.moodi.moodi_backend.domain.DUserCreate;
import com.moodi.moodi_backend.domain.DUserLogin;
import com.moodi.moodi_backend.entity.EMoodi;
import com.moodi.moodi_backend.entity.EUser;
import com.moodi.moodi_backend.enums.RTMStatus;
import com.moodi.moodi_backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public RTMStatus signup(DUserCreate dto, HttpServletRequest request) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            return RTMStatus.USERNAME_ALREADY_EXISTS;
        }

        EUser entity = new EUser();
        entity.setUsername(dto.getUsername());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setLastLogin(dto.getCreatedAt());
        entity.setIsActive(dto.getIsActive());

        EUser savedUser = userRepository.saveAndFlush(entity);

        EMoodi myMoodi = new EMoodi();
        myMoodi.setUserId(savedUser.getId());
        myMoodi.setCategory(dto.getMyMoodi().getCategory());
        myMoodi.setName(dto.getMyMoodi().getName());
        myMoodi.setEmoji(dto.getMyMoodi().getEmoji());

        savedUser.setMyMoodi(myMoodi);
        userRepository.save(savedUser);

        // Auto-login after signup (like Instagram)
        autoLogin(dto.getUsername(), dto.getPassword(), request);

        return RTMStatus.ACCOUNT_CREATED;
    }

    public RTMStatus login(DUserLogin loginRequest, HttpServletRequest request) {
        try {
            this.autoLogin(loginRequest.getUsername(), loginRequest.getPassword(), request);
            return RTMStatus.LOGIN_SUCCESS;

        } catch (BadCredentialsException e) {
            return RTMStatus.INVALID_CREDENTIALS;
        }
    }

    private void autoLogin(String username, String password, HttpServletRequest request) {
        try {
            EUser user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    )
            );

            user.setLastLogin(LocalDateTime.now());
            user.setUserAgent(request.getHeader("User-Agent"));
            userRepository.save(user);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            HttpSession session = request.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext());

            session.setAttribute("userId", user.getId());
            session.setAttribute("loginTime", System.currentTimeMillis());
            session.setAttribute("ipAddress", this.getClientIpAddress(request));
            session.setAttribute("userAgent", user.getUserAgent());
        } catch (Exception e) {
            // Silent fail
        }
    }

    public RTMStatus validateSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null) {
            return RTMStatus.SESSION_INVALID;
        }

        if (session.isNew()) {
            return RTMStatus.NO_SESSION_FOUND;
        }

        Object securityContext = session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
        if (securityContext == null) {
            return RTMStatus.SS_CTX_NOT_FOUND;
        }

        Object userId = session.getAttribute("userId");
        Object loginTime = session.getAttribute("loginTime");
        Object ipAddress = session.getAttribute("ipAddress");
        Object userAgent = session.getAttribute("userAgent");

        if (userId == null || loginTime == null) {
            return RTMStatus.MISSING_SESSION_ATTRIBUTE;
        }

        String currentIpAddress = this.getClientIpAddress(request);
        if (ipAddress != null && !ipAddress.equals(currentIpAddress)) {
            logger.info("Attempt IP address changed for session " + session.getId() +
                    " from " + ipAddress + " to " + currentIpAddress);
            return RTMStatus.IP_SESSION_MISMATCH;
        }

        return RTMStatus.VALID_SESSION;
    }

    public RTMStatus logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        Cookie cookie = new Cookie("moodisessionid", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        SecurityContextHolder.clearContext();
        return RTMStatus.LOGOUT_SUCCESS;
    }

    public boolean isUserLoggedIn(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null && session.getAttribute("userId") != null &&
                SecurityContextHolder.getContext().getAuthentication() != null &&
                SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}