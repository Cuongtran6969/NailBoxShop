package com.spring.nailshop.controller;

import com.spring.nailshop.dto.request.PostCreateRequest;
import com.spring.nailshop.dto.request.PostUpdateRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.PostResponse;
import com.spring.nailshop.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/post/create")
    public ApiResponse<Void> createPost(
            @RequestPart(value = "post") PostCreateRequest request,
            @RequestPart(value = "image") MultipartFile image
            ) {
        postService.createPost(request, image);
        return ApiResponse.<Void>builder()
                .message("Create post successfully")
                .code(HttpStatus.OK.value())
                .build();

    }

    @PutMapping("/post/update")
    public ApiResponse<Void> updatePost(
            @RequestPart(value = "post") PostUpdateRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        postService.updatePost(request, image);
        return ApiResponse.<Void>builder()
                .message("Update post successfully")
                .code(HttpStatus.OK.value())
                .build();
    }

    @GetMapping("/posts")
    public ApiResponse<PageResponse<List<PostResponse>>> getPosts(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(defaultValue = "createAt:desc") String[] sort,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, getSortOrder(sort));
        return ApiResponse.<PageResponse<List<PostResponse>>>builder()
                .result(postService.getAllPosts(title, pageable))
                .message("Get posts successfully")
                .code(HttpStatus.OK.value())
                .build();

    }

    @GetMapping("/post/{id}")
    public ApiResponse<PostResponse> getPostDetail(@PathVariable Integer id) {
        return ApiResponse.<PostResponse>builder()
                .result(postService.getPostById(id))
                .message("Get posts successfully")
                .code(HttpStatus.OK.value())
                .build();

    }

    @DeleteMapping("/post/{id}")
    public ApiResponse<Void> deletePost(@PathVariable Integer id) {
                postService.deletePostById(id);
        return ApiResponse.<Void>builder()
                .message("Delete posts successfully")
                .code(HttpStatus.OK.value())
                .build();
    }

    private Sort getSortOrder(String[] sort) {
        List<Sort.Order> orders = new ArrayList<>();
        for (String s : sort) {
            String[] sortDetails = s.split(":");
            String sortBy = sortDetails[0];
            String sortDir = sortDetails.length > 1 ? sortDetails[1] : "asc";
            log.info("sortBy: {}, sortDir: {}", sortBy, sortDir);

            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            orders.add(new Sort.Order(direction, sortBy));
        }
        return Sort.by(orders);
    }

}
