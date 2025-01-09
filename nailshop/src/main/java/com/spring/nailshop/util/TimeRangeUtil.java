package com.spring.nailshop.util;

import com.spring.nailshop.model.TimeRange;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class TimeRangeUtil {
    public static TimeRange getTimeRange(String period) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate;
        LocalDateTime endDate;

        switch (period.toLowerCase()) {
            case "daily":
                startDate = now.toLocalDate().atStartOfDay();
                endDate = now.toLocalDate().atTime(LocalTime.MAX); // Kết thúc ngày hiện tại
                break;
            case "weekly":
                startDate = now.toLocalDate()
                        .with(DayOfWeek.MONDAY) // Đầu tuần
                        .atStartOfDay();
                endDate = now.toLocalDate()
                        .with(DayOfWeek.SUNDAY) // Cuối tuần
                        .atTime(LocalTime.MAX);
                break;
            case "monthly":
                startDate = now.toLocalDate()
                        .withDayOfMonth(1) // Đầu tháng
                        .atStartOfDay();
                endDate = now.toLocalDate()
                        .withDayOfMonth(now.toLocalDate().lengthOfMonth()) // Cuối tháng
                        .atTime(LocalTime.MAX);
                break;
            case "yearly":
                startDate = now.toLocalDate()
                        .withDayOfYear(1) // Đầu năm
                        .atStartOfDay();
                endDate = now.toLocalDate()
                        .withDayOfYear(now.toLocalDate().lengthOfYear()) // Cuối năm
                        .atTime(LocalTime.MAX);
                break;
            default:
                String[] dates = period.split(" - ");
                if (dates.length == 2) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                    startDate = LocalDate.parse(dates[0].trim(), formatter).atStartOfDay();
                    endDate = LocalDate.parse(dates[1].trim(), formatter).atTime(LocalTime.MAX);
                } else {
                    throw new IllegalArgumentException("Invalid period: " + period);
                }
        }

        return new TimeRange(startDate, endDate);
    }

    public static TimeRange getPreviousTimeRange(String period) {
        TimeRange currentRange = getTimeRange(period);
        LocalDateTime startDate;
        LocalDateTime endDate;

        switch (period.toLowerCase()) {
            case "daily":
                startDate = currentRange.getStartDate().minusDays(1);
                endDate = currentRange.getEndDate().minusDays(1);
                break;
            case "weekly":
                startDate = currentRange.getStartDate().minusWeeks(1);
                endDate = currentRange.getEndDate().minusWeeks(1);
                break;
            case "monthly":
                startDate = currentRange.getStartDate().minusMonths(1);
                endDate = currentRange.getStartDate().minusDays(1).with(LocalTime.MAX); // Cuối tháng trước
                break;
            case "yearly":
                startDate = currentRange.getStartDate().minusYears(1);
                endDate = currentRange.getStartDate().minusDays(1).with(LocalTime.MAX); // Cuối năm trước
                break;
            default:
                String[] dates = period.split(" - ");
                if (dates.length == 2) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                    startDate = LocalDate.parse(dates[0].trim(), formatter).atStartOfDay();
                    endDate = LocalDate.parse(dates[1].trim(), formatter).atTime(LocalTime.MAX);
                } else {
                    throw new IllegalArgumentException("Invalid period: " + period);
                }
        }

        return new TimeRange(startDate, endDate);
    }

}
