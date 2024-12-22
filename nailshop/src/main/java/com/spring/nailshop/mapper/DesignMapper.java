package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.entity.Design;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DesignMapper {
    Design toDesign(DesignRequest request);

    @Mapping(target = "id", source = "id")
    DesignResponse toDesignResponse(Design design);
}
