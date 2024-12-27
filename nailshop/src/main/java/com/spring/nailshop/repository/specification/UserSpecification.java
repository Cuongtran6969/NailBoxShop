package com.spring.nailshop.repository.specification;

import com.spring.nailshop.entity.Role;
import com.spring.nailshop.entity.User;
import jakarta.persistence.criteria.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Getter
@AllArgsConstructor
public class UserSpecification {

    public static Specification<User> containsKeyword(String keyword) {
        return (root, query, builder) -> {
            String likePattern = "%" + keyword.toLowerCase() + "%";

            // Thực hiện JOIN bảng Role
            Join<User, Role> roleJoin = root.join("role", JoinType.LEFT);

            return builder.or(
                    builder.like(builder.lower(root.get("name")), likePattern),
                    builder.like(builder.lower(root.get("email")), likePattern),
                    builder.like(builder.lower(root.get("phone")), likePattern),
                    builder.like(builder.lower(roleJoin.get("name")), likePattern) // Tìm theo tên Role
            );
        };
    }

}
