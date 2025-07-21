package com.moodi.moodi_backend.enums;

public enum MoodiEmojis {
        HAPPY(0x1F60A),
    SAD(0x1F622),
    ANGRY(0x1F620),
    EXCITED(0x1F929),
    TIRED(0x1F62B),
    LOVE(0x1F970),
    ANXIOUS(0x1F630),
    CALM(0x1F60C),
    SURPRISED(0x1F632),
    CONFUSED(0x1F615),
    GRATEFUL(0x1F64F),
    DISAPPOINTED(0x1F61E),
    MOTIVATED(0x1F525),
    PEACEFUL(0x1F60F),
    FRUSTRATED(0x1F624);

    private final int code;

    MoodiEmojis(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public String getHexCode() {
        return String.format("0x%04X", code);
    }
}
