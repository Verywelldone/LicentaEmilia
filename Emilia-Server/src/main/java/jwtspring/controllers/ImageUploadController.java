package jwtspring.controllers;

import jwtspring.models.UserProfileImage;
import jwtspring.service.UserImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "image")
public class ImageUploadController {

    @Autowired
    UserImgService userImgService;

    @PostMapping("/upload")
    public ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("userId") Long userid) throws IOException {
        return userImgService.uplaodImage(file, userid);
    }


    @GetMapping(path = {"/get/{userImageId}"})
    public UserProfileImage getImage(@PathVariable("userImageId") Long userImgId) throws IOException {
        return userImgService.getImage(userImgId);
    }
}
