package com.spring.nailshop.service;

import com.spring.nailshop.dto.response.DashboardResponse;

public interface DashboardService {
    DashboardResponse getDashboardResponse(String period);
}
