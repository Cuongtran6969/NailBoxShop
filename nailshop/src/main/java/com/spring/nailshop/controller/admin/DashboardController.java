package com.spring.nailshop.controller.admin;

import com.spring.nailshop.dto.request.DateTimeRequest;
import com.spring.nailshop.dto.response.ApiResponse;
import com.spring.nailshop.dto.response.DashboardResponse;
import com.spring.nailshop.service.DashboardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/dashboard")
@Tag(name = "Order Controller")
@Slf4j
@Validated
public class DashboardController {

    DashboardService dashboardService;

    @PostMapping("")
    public ApiResponse<DashboardResponse> getInfoDashboard(
            @RequestBody @Valid DateTimeRequest request
            ) {
        return ApiResponse.<DashboardResponse>builder()
                .result(dashboardService.getDashboardResponse(request.getTime()))
                .code(HttpStatus.OK.value())
                .message("Get dashboard info succesfully")
                .build();
    }
}
