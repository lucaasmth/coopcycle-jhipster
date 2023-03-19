package com.mathieulucas.coopcycle.service.mapper;

import com.mathieulucas.coopcycle.domain.Client;
import com.mathieulucas.coopcycle.domain.Restaurant;
import com.mathieulucas.coopcycle.service.dto.ClientDTO;
import com.mathieulucas.coopcycle.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "restaurantName")
    ClientDTO toDto(Client s);

    @Named("restaurantName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RestaurantDTO toDtoRestaurantName(Restaurant restaurant);
}
