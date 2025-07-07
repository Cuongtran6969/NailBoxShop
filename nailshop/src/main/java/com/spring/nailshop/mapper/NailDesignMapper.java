package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.response.NailDesignResponse;
import com.spring.nailshop.entity.NailDesign;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NailDesignMapper {
    @Mapping(target = "cate", source = "nailCategory")
    NailDesignResponse toNailDesignResponse(NailDesign nailDesign);
}
