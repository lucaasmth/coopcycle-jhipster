package com.mathieulucas.coopcycle.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mathieulucas.coopcycle.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentPlatformDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentPlatformDTO.class);
        PaymentPlatformDTO paymentPlatformDTO1 = new PaymentPlatformDTO();
        paymentPlatformDTO1.setId(1L);
        PaymentPlatformDTO paymentPlatformDTO2 = new PaymentPlatformDTO();
        assertThat(paymentPlatformDTO1).isNotEqualTo(paymentPlatformDTO2);
        paymentPlatformDTO2.setId(paymentPlatformDTO1.getId());
        assertThat(paymentPlatformDTO1).isEqualTo(paymentPlatformDTO2);
        paymentPlatformDTO2.setId(2L);
        assertThat(paymentPlatformDTO1).isNotEqualTo(paymentPlatformDTO2);
        paymentPlatformDTO1.setId(null);
        assertThat(paymentPlatformDTO1).isNotEqualTo(paymentPlatformDTO2);
    }
}
