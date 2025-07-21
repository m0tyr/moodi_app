package com.moodi.moodi_backend.enums;


public enum RTMStatus {
    //Http
    OK(200, "OK"),
    CREATED(201, "Created"),
    ACCEPTED(202, "Accepted"),
    NO_CONTENT(204, "No Content"),
    BAD_REQUEST(400, "Bad Request"),
    UNAUTHORIZED(401, "Unauthorized"),
    FORBIDDEN(403, "Forbidden"),
    NOT_FOUND(404, "Not Found"),
    METHOD_NOT_ALLOWED(405, "Method Not Allowed"),
    CONFLICT(409, "Conflict"),
    UNSUPPORTED_MEDIA_TYPE(415, "Unsupported Media Type"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
    NOT_IMPLEMENTED(501, "Not Implemented"),
    BAD_GATEWAY(502, "Bad Gateway"),
    SERVICE_UNAVAILABLE(503, "Service Unavailable"),

    //App
    USERNAME_ALREADY_EXISTS(1, "Username already exists"),
    ACCOUNT_CREATED(2, "Account Created"),
    LOGIN_SUCCESS(3, "Login Success"),
    LOGIN_FAILED(12, "Login Failed"),
    INVALID_CREDENTIALS(13, "Invalid Credentials"),
    LOGOUT_SUCCESS(4, "Logout Success"),

    //Session
    NO_SESSION_FOUND(5, "No Session Found"),
    SESSION_INVALID(6, "Session Invalid"),
    SS_CTX_NOT_FOUND(7, "Spring Security Context Not Found"),
    MISSING_SESSION_ATTRIBUTE(8, "Missing Session Attribute"),
    FAKE_SESSION_USER_DETECTED(9, "Fake Session User"),
    IP_SESSION_MISMATCH(10, "IP Session Mismatch"),
    VALID_SESSION(14, "Valid Session");

    private final int code;
    private final String message;

    RTMStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}