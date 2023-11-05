package com.example.tianling.common.utils;
import org.springframework.core.io.FileSystemResource;
import com.alibaba.fastjson.JSON;
import okhttp3.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

public class toImg {
    public static MultipartFile convertBase64ToMultipartFile(String base64String) throws IOException {
//        System.out.println(base64String);
        String[] parts = base64String.split(",");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid base64 string format");
        }

//        String mimeType = parts[0].split(":")[1].split(";")[0];
        String base64Data = parts[1];
        byte[] bytes = Base64.getDecoder().decode(base64Data);
        return new MockMultipartFile("filename", bytes);
    }
    public static BufferedImage convert(String base64String) throws IOException {
        String[] parts = base64String.split(",");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid base64 string format");
        }

        String base64Data = parts[1];
        byte[] bytes = Base64.getDecoder().decode(base64Data);

        ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
        return ImageIO.read(inputStream);
    }
    public static String getImageFormat(String base64String) {
        if (base64String.startsWith("data:image/png;base64,")) {
            return "png";
        } else if (base64String.startsWith("data:image/jpeg;base64,")) {
            return "jpeg";
        } else if (base64String.startsWith("data:image/gif;base64,")) {
            return "gif";
        }
        return null;  // Unknown format
    }
}
