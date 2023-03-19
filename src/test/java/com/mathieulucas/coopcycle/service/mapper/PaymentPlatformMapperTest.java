package com.mathieulucas.coopcycle.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PaymentPlatformMapperTest {

    private PaymentPlatformMapper paymentPlatformMapper;

    @BeforeEach
    public void setUp() {
        paymentPlatformMapper = new PaymentPlatformMapperImpl();
    }
}
