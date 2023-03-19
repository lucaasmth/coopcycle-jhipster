package com.mathieulucas.coopcycle.service.mapper;

import com.mathieulucas.coopcycle.domain.Client;
import com.mathieulucas.coopcycle.domain.Courier;
import com.mathieulucas.coopcycle.domain.Order;
import com.mathieulucas.coopcycle.domain.Restaurant;
import com.mathieulucas.coopcycle.service.dto.ClientDTO;
import com.mathieulucas.coopcycle.service.dto.CourierDTO;
import com.mathieulucas.coopcycle.service.dto.OrderDTO;
import com.mathieulucas.coopcycle.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "restaurantName")
    @Mapping(target = "courier", source = "courier", qualifiedByName = "courierId")
    OrderDTO toDto(Order s);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);

    @Named("restaurantName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RestaurantDTO toDtoRestaurantName(Restaurant restaurant);

    @Named("courierId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourierDTO toDtoCourierId(Courier courier);
}
