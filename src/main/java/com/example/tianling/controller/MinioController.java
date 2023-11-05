package com.example.tianling.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.ImageUtils;
import com.example.tianling.common.utils.MinioUtils;
import com.example.tianling.entity.UserEntity;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;

import static com.example.tianling.common.utils.ImageUtils.compress;

@RestController
public class MinioController {

    @Autowired
    private MinioUtils minioUtils;


    /**
     * 上传
     *
     * @param file
     * @param request
     * @return
     */

    //上传文件demo
    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
        JSONObject res = null;
        try {
            res = minioUtils.uploadFile(file, "product");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        return res.toJSONString();
    }

    //上传图片demo（包含压缩）
    @PostMapping("/upload_image")
    @ResponseBody
    public String uploadImage(@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        try {
            BufferedImage image = ImageIO.read(file.getInputStream()); // Convert MultipartFile to BufferedImage
            BufferedImage compressedImage = compress(image); // Compress the image using your compress method
            String originalFilename = file.getOriginalFilename(); // 这里替换成你的文件名
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            res = minioUtils.uploadBufferedImage(compressedImage, "product", fileExtension); // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        return res.toJSONString();
    }

    //上传轮播图（包含压缩）
    @PostMapping("/upload_rotation")
    @ResponseBody
    public String uploadRotation(@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        try {
            BufferedImage image = ImageIO.read(file.getInputStream()); // Convert MultipartFile to BufferedImage
            BufferedImage compressedImage = compress(image); // Compress the image using your compress method
            String originalFilename = file.getOriginalFilename(); // 这里替换成你的文件名
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            res = minioUtils.uploadBufferedImage(compressedImage, "rotation", fileExtension); // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        return res.toJSONString();
    }

    //上传头像（包含压缩）
    @Login
    @PostMapping("/upload_profile")
    @ResponseBody
    public String uploadProfile(@RequestParam(name = "file", required = false) MultipartFile file, @LoginUser UserEntity user, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        try {
            BufferedImage image = ImageIO.read(file.getInputStream()); // Convert MultipartFile to BufferedImage
            BufferedImage compressedImage = compress(image); // Compress the image using your compress method
            String originalFilename = file.getOriginalFilename(); // 这里替换成你的文件名
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            res = minioUtils.uploadBufferedProfileImage(compressedImage, "profile", user.getUserId(), fileExtension); // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        return res.toJSONString();
    }

    //上传文章图片（包含压缩）
    @Login
    @PostMapping("/upload_illustration")
    @ResponseBody
    public String uploadIllustration(@RequestParam(name = "file", required = false) List<MultipartFile> fileList, @RequestParam Integer articleId, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        List<String> result = new ArrayList<>();
        try {
            int num = 1;
            for(MultipartFile file:fileList){
                BufferedImage image = ImageIO.read(file.getInputStream()); // Convert MultipartFile to BufferedImage
                BufferedImage compressedImage = compress(image); // Compress the image using your compress method
                String originalFilename = file.getOriginalFilename(); // 这里替换成你的文件名
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
                String msg = minioUtils.uploadBufferedIllustrationImage(compressedImage, "illustration", articleId, num++, fileExtension);
                result.add(msg);
            }
            // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(result);
        // 将 JSONArray 放入 JSONObject
        res.put("msgList", jsonArray);
        return res.toJSONString();
    }
    //上传商品图片（包含压缩）
    @PostMapping("/upload_commodity")
    @ResponseBody
    public String uploadCommodity(@RequestParam(name = "file", required = false) MultipartFile file, HttpServletRequest request) {
        JSONObject res = new JSONObject();
        try {
            BufferedImage image = ImageIO.read(file.getInputStream()); // Convert MultipartFile to BufferedImage
            BufferedImage compressedImage = compress(image); // Compress the image using your compress method
            String originalFilename = file.getOriginalFilename(); // 这里替换成你的文件名
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            res = minioUtils.uploadBufferedImage(compressedImage, "commodity", fileExtension); // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", "上传失败");
        }
        return res.toJSONString();
    }
}
