package com.example.tianling.controller;


import com.example.tianling.service.QiniuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private QiniuService qiniuService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            String url = qiniuService.uploadFile(file);
            System.out.println(url);
            System.out.println(qiniuService.getImg(url));
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("上传失败");
        }
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<String> viewVideo(@PathVariable String fileName) {
        String url = qiniuService.getFileUrl(fileName);
        return ResponseEntity.ok(url);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteVideo(@PathVariable String fileName) {
        boolean success = qiniuService.deleteFile(fileName);
        if (success) {
            return ResponseEntity.ok("删除成功");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("删除失败");
        }
    }

}
