package com.spring.nailshop.model;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class TimeRange {
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;

    public TimeRange(LocalDateTime startDate, LocalDateTime endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }
}
