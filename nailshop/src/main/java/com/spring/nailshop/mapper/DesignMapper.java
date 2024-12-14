package com.spring.nailshop.mapper;

import com.spring.nailshop.dto.request.DesignRequest;
import com.spring.nailshop.dto.response.DesignResponse;
import com.spring.nailshop.entity.Design;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DesignMapper {
    Design toDesign(DesignRequest request);
    DesignResponse toDesignResponse(Design design);
}
