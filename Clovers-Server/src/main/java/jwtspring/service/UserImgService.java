package jwtspring.service;

import jwtspring.models.User;
import jwtspring.models.UserProfileImage;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.ImageRepository;
import jwtspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class UserImgService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserRepository userRepository;

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[2048];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ioe) {
        }
        return outputStream.toByteArray();
    }

    public ResponseEntity uploadImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("userId") Long userid) throws IOException {

        Optional<User> currentUserOpt = userRepository.findById(userid);
        User currentUser = null;
        if (currentUserOpt.isPresent())
            currentUser = currentUserOpt.get();

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
//        UserProfileImage userProfileImage1 = new UserProfileImage(file.getOriginalFilename(), file.getContentType(),
//                compressBytes(file.getBytes()));

        UserProfileImage userProfileImage = imageRepository.findById(userid).get();
        userProfileImage.setName(file.getOriginalFilename());
        userProfileImage.setType(file.getContentType());
        userProfileImage.setPicByte(compressBytes(file.getBytes()));

        currentUser.getUserInfo().setProfileImage(userProfileImage);
        userProfileImage.setUserInfo(currentUser.getUserInfo());
        userRepository.save(currentUser);
        imageRepository.save(userProfileImage);

        return ResponseEntity.ok(new MessageResponse(" UPLOADED "));
    }

    public UserProfileImage getImage(Long userImgId) {
        Optional<User> userOpt = userRepository.findById(userImgId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            final UserProfileImage retrievedImage = user.getUserInfo().getProfileImage();
            if (retrievedImage != null || retrievedImage.getPicByte() != null) {
                return new UserProfileImage(
                        retrievedImage.getName(),
                        retrievedImage.getType(),
                        decompressBytes(retrievedImage.getPicByte()));
            }
        }
        return new UserProfileImage();
    }
}
