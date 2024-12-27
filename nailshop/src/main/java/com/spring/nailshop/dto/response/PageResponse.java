package com.spring.nailshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    int page;//hien tai dang o page nao
    int totalPages;
    int size;//moi page co bao nhieu phan tu
    long total;//tong so phan tu phu hop ket qua tim kiem
    T items;//du lieu tra ve la cac phan tu o tai page dang
}
