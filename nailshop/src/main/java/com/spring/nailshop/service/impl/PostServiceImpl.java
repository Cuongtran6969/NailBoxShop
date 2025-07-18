package com.spring.nailshop.service.impl;

import com.spring.nailshop.dto.request.PostCreateRequest;
import com.spring.nailshop.dto.request.PostUpdateRequest;
import com.spring.nailshop.dto.response.PageResponse;
import com.spring.nailshop.dto.response.PostResponse;
import com.spring.nailshop.dto.response.UserResponse;
import com.spring.nailshop.entity.Post;
import com.spring.nailshop.entity.User;
import com.spring.nailshop.exception.AppException;
import com.spring.nailshop.exception.ErrorCode;
import com.spring.nailshop.repository.PostRepository;
import com.spring.nailshop.repository.specification.UserSpecification;
import com.spring.nailshop.service.CloudinaryService;
import com.spring.nailshop.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    private final CloudinaryService cloudinaryService;

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void createPost(PostCreateRequest request, MultipartFile image) {
        String cloudImg = cloudinaryService.uploadImage(image);
        Post post = Post.builder()
                .image(cloudImg)
                .title(request.getTitle())
                .description(request.getDescription())
                .content(request.getContent())
                .build();
        postRepository.save(post);
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void updatePost(PostUpdateRequest request, MultipartFile image) {
        Post post = postRepository.findById(request.getId()).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        if(image != null && !image.isEmpty()) {
            String cloudImg = cloudinaryService.uploadImage(image);
            post.setImage(cloudImg);
        }
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setContent(request.getContent());
        postRepository.save(post);
    }

    @Override
    public PageResponse<List<PostResponse>> getAllPosts(String title, Pageable pageable) {
        Page<Post> posts = null;
        if(title != null && title.trim().length() > 0) {
            posts = postRepository.findByTitleContainingIgnoreCase(title, pageable);
        } else  {
            posts = postRepository.findAll(pageable);
        }
        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> new PostResponse(
                        post.getId(), post.getImage(),
                        post.getTitle(), post.getDescription(),
                        post.getContent(), post.getCreateAt()))
                .toList();
        return PageResponse.<List<PostResponse>>builder()
                .items(postResponses)
                .page(pageable.getPageNumber() + 1)
                .total(posts.getTotalElements())
                .size(posts.getSize())
                .totalPages(posts.getTotalPages())
                .build();
    }

    @Override
    public PostResponse getPostById(Integer id) {
        Post posts = postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        return PostResponse.builder()
                .id(posts.getId())
                .image(posts.getImage())
                .title(posts.getTitle())
                .description(posts.getDescription())
                .content(posts.getContent())
                .createAt(posts.getCreateAt())
                .build();
    }

    @Override
    @PreAuthorize("isAuthenticated() and hasAnyAuthority('ADMIN', 'STAFF')")
    public void deletePostById(Integer id) {
        Post posts = postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        postRepository.delete(posts);
    }


}
