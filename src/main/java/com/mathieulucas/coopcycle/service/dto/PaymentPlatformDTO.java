package com.mathieulucas.coopcycle.service.dto;

import com.mathieulucas.coopcycle.domain.enumeration.PaymentType;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mathieulucas.coopcycle.domain.PaymentPlatform} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PaymentPlatformDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer amount;

    @NotNull
    private PaymentType paymentType;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentPlatformDTO)) {
            return false;
        }

        PaymentPlatformDTO paymentPlatformDTO = (PaymentPlatformDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, paymentPlatformDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentPlatformDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", paymentType='" + getPaymentType() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
