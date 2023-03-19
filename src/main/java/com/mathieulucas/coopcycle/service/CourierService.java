package com.mathieulucas.coopcycle.service;

import com.mathieulucas.coopcycle.domain.Courier;
import com.mathieulucas.coopcycle.repository.CourierRepository;
import com.mathieulucas.coopcycle.service.dto.CourierDTO;
import com.mathieulucas.coopcycle.service.mapper.CourierMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Courier}.
 */
@Service
@Transactional
public class CourierService {

    private final Logger log = LoggerFactory.getLogger(CourierService.class);

    private final CourierRepository courierRepository;

    private final CourierMapper courierMapper;

    public CourierService(CourierRepository courierRepository, CourierMapper courierMapper) {
        this.courierRepository = courierRepository;
        this.courierMapper = courierMapper;
    }

    /**
     * Save a courier.
     *
     * @param courierDTO the entity to save.
     * @return the persisted entity.
     */
    public CourierDTO save(CourierDTO courierDTO) {
        log.debug("Request to save Courier : {}", courierDTO);
        Courier courier = courierMapper.toEntity(courierDTO);
        courier = courierRepository.save(courier);
        return courierMapper.toDto(courier);
    }

    /**
     * Update a courier.
     *
     * @param courierDTO the entity to save.
     * @return the persisted entity.
     */
    public CourierDTO update(CourierDTO courierDTO) {
        log.debug("Request to update Courier : {}", courierDTO);
        Courier courier = courierMapper.toEntity(courierDTO);
        courier = courierRepository.save(courier);
        return courierMapper.toDto(courier);
    }

    /**
     * Partially update a courier.
     *
     * @param courierDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CourierDTO> partialUpdate(CourierDTO courierDTO) {
        log.debug("Request to partially update Courier : {}", courierDTO);

        return courierRepository
            .findById(courierDTO.getId())
            .map(existingCourier -> {
                courierMapper.partialUpdate(existingCourier, courierDTO);

                return existingCourier;
            })
            .map(courierRepository::save)
            .map(courierMapper::toDto);
    }

    /**
     * Get all the couriers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CourierDTO> findAll() {
        log.debug("Request to get all Couriers");
        return courierRepository.findAll().stream().map(courierMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the couriers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<CourierDTO> findAllWithEagerRelationships(Pageable pageable) {
        return courierRepository.findAllWithEagerRelationships(pageable).map(courierMapper::toDto);
    }

    /**
     * Get one courier by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CourierDTO> findOne(Long id) {
        log.debug("Request to get Courier : {}", id);
        return courierRepository.findOneWithEagerRelationships(id).map(courierMapper::toDto);
    }

    /**
     * Delete the courier by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Courier : {}", id);
        courierRepository.deleteById(id);
    }
}
