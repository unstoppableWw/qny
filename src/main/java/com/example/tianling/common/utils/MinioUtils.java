package com.example.tianling.common.utils;

import com.alibaba.fastjson.JSONObject;
import com.example.tianling.entity.MinioProp;
import io.minio.MinioClient;
import io.minio.errors.MinioException;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

@Slf4j
@Component
public class MinioUtils {

    @Autowired
    private MinioClient client;
    @Autowired
    private MinioProp minioProp;

    /**
     * 创建bucket
     *
     * @param bucketName bucket名称
     */
    @SneakyThrows
    public void createBucket(String bucketName) {
        if (!client.bucketExists(bucketName)) {
            client.makeBucket(bucketName);
        }
    }

    /**
     * 上传文件
     *
     * @param file       文件
     * @param bucketName 存储桶
     * @return
     */
    public JSONObject uploadFile(MultipartFile file, String bucketName) throws Exception {
        JSONObject res = new JSONObject();
        res.put("code", 0);
        // 判断上传文件是否为空
        if (null == file || 0 == file.getSize()) {
            res.put("msg", "上传文件不能为空");
            return res;
        }
        try {
            // 判断存储桶是否存在
            createBucket(bucketName);
            // 文件名
            String originalFilename = file.getOriginalFilename();
            // 新的文件名 = 存储桶名称_时间戳.后缀名
            String fileName = bucketName + "_" + System.currentTimeMillis() + originalFilename.substring(originalFilename.lastIndexOf("."));
            // 开始上传
            client.putObject(bucketName, fileName, file.getInputStream(), file.getContentType());
            res.put("code", 1);
            res.put("msg", minioProp.getEndpoint() + "/" + bucketName + "/" + fileName);
            return res;
        }  catch (Exception e) {
            log.error("上传文件失败：{}", e.getMessage());
        }
        res.put("msg", "上传失败");
        return res;
    }

    public JSONObject uploadBufferedImage(BufferedImage image, String bucketName, String IMAGE_TYPE) throws Exception {
        JSONObject res = new JSONObject();
        if(IMAGE_TYPE.equals("png")) IMAGE_TYPE = "jpeg";
        //将file转化为image
        res.put("code", 0);
        // 判断上传文件是否为空
        if (null == image || 0 == image.getHeight() || 0 == image.getWidth()) {
            res.put("msg", "上传文件不能为空");
            return res;
        }
        try {
            createBucket(bucketName);
            // 将 BufferedImage 转换为输入流
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedImage tag;
            tag = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_BGR);
            Graphics g = tag.getGraphics();
            g.drawImage(image, 0, 0, null); // 绘制缩小后的图
            g.dispose();
            image = tag;
            ImageIO.write(image, IMAGE_TYPE, baos);
            InputStream inputStream = new ByteArrayInputStream(baos.toByteArray());

            // 生成文件名
            String fileName = bucketName + "_" + System.currentTimeMillis() + "." + IMAGE_TYPE;

            // 开始上传
            client.putObject(bucketName, fileName, inputStream, baos.size(), "image/" + IMAGE_TYPE);

            res.put("code", 1);
            res.put("msg", minioProp.getEndpoint() + "/" + bucketName + "/" + fileName);
            return res;
        } catch (MinioException e) {
            res.put("msg", "上传失败");
            return res;
        }
    }

    public JSONObject uploadBufferedProfileImage(BufferedImage image, String bucketName ,Integer id, String IMAGE_TYPE) throws Exception {
        JSONObject res = new JSONObject();
        if(IMAGE_TYPE.equals("png")) IMAGE_TYPE = "jpeg";
        String folderName = String.valueOf(id);
        //将file转化为image
        res.put("code", 0);
        // 判断上传文件是否为空
        if (null == image || 0 == image.getHeight() || 0 == image.getWidth()) {
            res.put("msg", "上传文件不能为空");
            return res;
        }
        try {
            createBucket(bucketName);
            // 将 BufferedImage 转换为输入流
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedImage tag;
            tag = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_BGR);
            Graphics g = tag.getGraphics();
            g.drawImage(image, 0, 0, null); // 绘制缩小后的图
            g.dispose();
            image = tag;
            ImageIO.write(image, IMAGE_TYPE, baos);
            InputStream inputStream = new ByteArrayInputStream(baos.toByteArray());

            // 生成文件名，以文件夹名作前缀
            //文件名暂时也使用userId
            String fileName = folderName + "/" + folderName + "." + IMAGE_TYPE;

            // 开始上传
            client.putObject(bucketName, fileName, inputStream, baos.size(), "image/" + IMAGE_TYPE);


            res.put("code", 1);
            res.put("msg", minioProp.getEndpoint() + "/" + bucketName + "/" + fileName);
            return res;
        } catch (MinioException e) {
            res.put("msg", "上传失败");
            return res;
        }
    }

    public String uploadBufferedIllustrationImage(BufferedImage image, String bucketName ,Integer id,Integer num, String IMAGE_TYPE) throws Exception {
        String folderName = String.valueOf(id);
        if(IMAGE_TYPE.equals("png")) IMAGE_TYPE = "jpeg";
        //将file转化为image
        // 判断上传文件是否为空
        if (null == image || 0 == image.getHeight() || 0 == image.getWidth()) {
            return new String("上传文件不能为空");
        }
        try {
            createBucket(bucketName);
            // 将 BufferedImage 转换为输入流
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedImage tag;
            tag = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_BGR);
            Graphics g = tag.getGraphics();
            g.drawImage(image, 0, 0, null); // 绘制缩小后的图
            g.dispose();
            image = tag;
            ImageIO.write(image, IMAGE_TYPE, baos);
            InputStream inputStream = new ByteArrayInputStream(baos.toByteArray());

            // 生成文件名，以文件夹名作前缀
            String fileName = folderName + "/" + String.valueOf(num) + "." + IMAGE_TYPE;

            // 开始上传
            client.putObject(bucketName, fileName, inputStream, baos.size(), "image/" + IMAGE_TYPE);

            return new String(minioProp.getEndpoint() + "/" + bucketName + "/" + fileName);
        } catch (MinioException e) {
            return new String("上传失败");
        }
    }

    public String uploadRecord(String type, String roomId, String urlString) throws Exception{
        try {
            URL url = new URL(urlString);
            URLConnection con = url.openConnection();
            InputStream inputStream = con.getInputStream();

            String bucketName = "record";
            String fileFold = "";
            if (type.equals("无领导")) {
                fileFold = fileFold + "1";
            } else if (type.equals("结构化")) {
                fileFold = fileFold + "2";
            }
            String fileName = fileFold + "/" + roomId + ".aac";

            client.putObject(bucketName, fileName, inputStream, "audio/aac");
            return minioProp.getEndpoint() + "/" + bucketName + "/" + fileName;
        } catch (Exception e) {
            return type + "房间" + roomId + "录音文件上传失败";
        }
    }
}
