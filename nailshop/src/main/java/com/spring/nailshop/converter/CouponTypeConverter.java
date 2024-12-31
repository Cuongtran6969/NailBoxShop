package com.spring.nailshop.converter;

import com.spring.nailshop.util.CouponType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class CouponTypeConverter implements AttributeConverter<CouponType, String> {

    @Override
    public String convertToDatabaseColumn(CouponType couponType) {
        if (couponType == null) {
            return null;
        }
        return couponType.getType();
    }

    @Override
    public CouponType convertToEntityAttribute(String type) {
        if (type == null) {
            return null;
        }

        return Stream.of(CouponType.values())
                .filter(c -> c.getType().equals(type))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}