package com.example.tianling.common.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RandomUtils {
    public String getRandomCode() {
        StringBuffer  stringBuffer = new StringBuffer ();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            stringBuffer.append(random.nextInt(10));
        }
        return stringBuffer.toString();
    }
}
