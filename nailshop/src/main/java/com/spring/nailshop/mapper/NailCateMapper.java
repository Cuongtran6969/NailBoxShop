package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.dto.response.NailCateResponse;
import com.spring.nailshop.entity.Design;
import com.spring.nailshop.entity.NailCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NailCateMapper {
    NailCateResponse toNailCateResponse(NailCategory category);
}
