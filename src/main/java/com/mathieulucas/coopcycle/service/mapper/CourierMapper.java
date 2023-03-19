package com.mathieulucas.coopcycle.service.mapper;

import com.mathieulucas.coopcycle.domain.Courier;
import com.mathieulucas.coopcycle.domain.Restaurant;
import com.mathieulucas.coopcycle.service.dto.CourierDTO;
import com.mathieulucas.coopcycle.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Courier} and its DTO {@link CourierDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourierMapper extends EntityMapper<CourierDTO, Courier> {
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "restaurantName")
    CourierDTO toDto(Courier s);

    @Named("restaurantName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RestaurantDTO toDtoRestaurantName(Restaurant restaurant);
}
