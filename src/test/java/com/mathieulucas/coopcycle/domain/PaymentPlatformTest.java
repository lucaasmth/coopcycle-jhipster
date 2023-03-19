package com.mathieulucas.coopcycle.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mathieulucas.coopcycle.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentPlatformTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentPlatform.class);
        PaymentPlatform paymentPlatform1 = new PaymentPlatform();
        paymentPlatform1.setId(1L);
        PaymentPlatform paymentPlatform2 = new PaymentPlatform();
        paymentPlatform2.setId(paymentPlatform1.getId());
        assertThat(paymentPlatform1).isEqualTo(paymentPlatform2);
        paymentPlatform2.setId(2L);
        assertThat(paymentPlatform1).isNotEqualTo(paymentPlatform2);
        paymentPlatform1.setId(null);
        assertThat(paymentPlatform1).isNotEqualTo(paymentPlatform2);
    }
}
