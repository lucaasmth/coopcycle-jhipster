package com.mathieulucas.coopcycle.service.mapper;

import com.mathieulucas.coopcycle.domain.Order;
import com.mathieulucas.coopcycle.domain.PaymentPlatform;
import com.mathieulucas.coopcycle.service.dto.OrderDTO;
import com.mathieulucas.coopcycle.service.dto.PaymentPlatformDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaymentPlatform} and its DTO {@link PaymentPlatformDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentPlatformMapper extends EntityMapper<PaymentPlatformDTO, PaymentPlatform> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderNumber")
    PaymentPlatformDTO toDto(PaymentPlatform s);

    @Named("orderNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "number", source = "number")
    OrderDTO toDtoOrderNumber(Order order);
}
