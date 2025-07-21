package com.moodi.moodi_backend.utils;

import java.util.Map;

public class UtilTools {

    public static void addInvalid(Map<String, Object> response, String reason) {
        response.put("valid", false);
        response.put("reason", reason);
    }
}