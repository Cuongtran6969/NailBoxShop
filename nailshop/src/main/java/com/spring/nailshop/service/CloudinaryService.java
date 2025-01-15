package com.spring.nailshop.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file)  {
        try{
            Map data = this.cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "/upload",
                    "use_filename", true,
                    "unique_filename", true,
                    "resource_type","auto"
            ));
            return data.get("secure_url").toString();
        }catch (IOException io){
            throw new RuntimeException("Image upload fail");
        }
    }

    public void deleteImage(String secure_url) {
        try {
            this.cloudinary.uploader().destroy(secure_url, Map.of());
        } catch (IOException e) {
            throw new AppException(ErrorCode.FAIL_DELETE_CLOUDINARY);
        }
    }

    public String uploadImageBase64(String base64Data) throws IOException {
        // Loại bỏ phần đầu của Base64 nếu có (chuỗi "data:image/png;base64," chẳng hạn)
        String base64Image = base64Data.replaceFirst("^data:image/.+;base64,", "");

        // Chuyển chuỗi Base64 thành byte array
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        Map data = this.cloudinary.uploader().upload(imageBytes, ObjectUtils.asMap(
                "folder", "/upload",
                "use_filename", true,
                "unique_filename", true,
                "resource_type", "auto"
        ));
        return data.get("secure_url").toString();
    }
}
