package com.example.tianling.service;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.UUID;

@Service
public class QiniuService {

    @Value("${qiniu.access-key}")
    private String accessKey;

    @Value("${qiniu.secret-key}")
    private String secretKey;

    @Value("${qiniu.bucket-name}")
    private String bucketName;

    @Value("${qiniu.bucket-domain}")
    private String bucketDomain;

    private Auth auth;
    private UploadManager uploadManager;
    private BucketManager bucketManager;

    @PostConstruct
    public void init() {
        // 初始化认证
        auth = Auth.create(accessKey, secretKey);

        // 初始化配置对象，选择合适的区域
        Configuration cfg = new Configuration(Zone.zone2());

        uploadManager = new UploadManager(cfg);
        // 初始化BucketManager
        bucketManager = new BucketManager(auth, cfg);
    }

    private String getUpToken() {
        return auth.uploadToken(bucketName);
    }

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file) throws IOException {
        // 检查视频文件格式
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && !originalFilename.endsWith(".mp4")) {
            throw new IOException("Invalid video format");
        }

        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucketName);

        try {
            String uniqueFileName = UUID.randomUUID().toString() + ".mp4";
            Response response = uploadManager.put(file.getBytes(), uniqueFileName, upToken);
            DefaultPutRet putRet = response.jsonToObject(DefaultPutRet.class);
            return String.format("%s/%s", bucketDomain, putRet.key);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
    public String getImg(String videoKey){

        Auth auth = Auth.create(accessKey, secretKey);

        // 设置截帧的参数，例如截取第3秒的帧
        String vframe = "vframe/jpg/offset/3/w/480/h/360";
        String url = auth.privateDownloadUrl(String.format("%s?%s", videoKey, vframe), 3600);

        return url;
    }
    public String getFileUrl(String fileName) {
        String finalUrl = String.format("%s/%s", bucketDomain, fileName);
        return finalUrl;
    }

    public boolean deleteFile(String fileName) {
        try {
            bucketManager.delete(bucketName, fileName);
            return true;
        } catch (QiniuException ex) {
            System.err.println(ex.response.toString());
            return false;
        }
    }
}
