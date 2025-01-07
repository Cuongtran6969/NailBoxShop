package com.spring.nailshop.service;

import com.spring.nailshop.dto.request.PostCreateRequest;
import com.spring.nailshop.dto.request.PostUpdateRequest;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.PostResponse;
import com.spring.nailshop.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    void createPost(PostCreateRequest request, MultipartFile image);

    void updatePost(PostUpdateRequest request, MultipartFile image);

    PageResponse<List<PostResponse>> getAllPosts(String title, Pageable pageable);

    PostResponse getPostById(Integer id);

    void deletePostById(Integer id);

}
