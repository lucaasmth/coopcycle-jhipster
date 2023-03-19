package com.mathieulucas.coopcycle.service.mapper;

import com.mathieulucas.coopcycle.domain.Restaurant;
import com.mathieulucas.coopcycle.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurant} and its DTO {@link RestaurantDTO}.
 */
@Mapper(componentModel = "spring")
public interface RestaurantMapper extends EntityMapper<RestaurantDTO, Restaurant> {}
