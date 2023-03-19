package com.mathieulucas.coopcycle.service;

import com.mathieulucas.coopcycle.domain.PaymentPlatform;
import com.mathieulucas.coopcycle.repository.PaymentPlatformRepository;
import com.mathieulucas.coopcycle.service.dto.PaymentPlatformDTO;
import com.mathieulucas.coopcycle.service.mapper.PaymentPlatformMapper;
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
 * Service Implementation for managing {@link PaymentPlatform}.
 */
@Service
@Transactional
public class PaymentPlatformService {

    private final Logger log = LoggerFactory.getLogger(PaymentPlatformService.class);

    private final PaymentPlatformRepository paymentPlatformRepository;

    private final PaymentPlatformMapper paymentPlatformMapper;

    public PaymentPlatformService(PaymentPlatformRepository paymentPlatformRepository, PaymentPlatformMapper paymentPlatformMapper) {
        this.paymentPlatformRepository = paymentPlatformRepository;
        this.paymentPlatformMapper = paymentPlatformMapper;
    }

    /**
     * Save a paymentPlatform.
     *
     * @param paymentPlatformDTO the entity to save.
     * @return the persisted entity.
     */
    public PaymentPlatformDTO save(PaymentPlatformDTO paymentPlatformDTO) {
        log.debug("Request to save PaymentPlatform : {}", paymentPlatformDTO);
        PaymentPlatform paymentPlatform = paymentPlatformMapper.toEntity(paymentPlatformDTO);
        paymentPlatform = paymentPlatformRepository.save(paymentPlatform);
        return paymentPlatformMapper.toDto(paymentPlatform);
    }

    /**
     * Update a paymentPlatform.
     *
     * @param paymentPlatformDTO the entity to save.
     * @return the persisted entity.
     */
    public PaymentPlatformDTO update(PaymentPlatformDTO paymentPlatformDTO) {
        log.debug("Request to update PaymentPlatform : {}", paymentPlatformDTO);
        PaymentPlatform paymentPlatform = paymentPlatformMapper.toEntity(paymentPlatformDTO);
        paymentPlatform = paymentPlatformRepository.save(paymentPlatform);
        return paymentPlatformMapper.toDto(paymentPlatform);
    }

    /**
     * Partially update a paymentPlatform.
     *
     * @param paymentPlatformDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PaymentPlatformDTO> partialUpdate(PaymentPlatformDTO paymentPlatformDTO) {
        log.debug("Request to partially update PaymentPlatform : {}", paymentPlatformDTO);

        return paymentPlatformRepository
            .findById(paymentPlatformDTO.getId())
            .map(existingPaymentPlatform -> {
                paymentPlatformMapper.partialUpdate(existingPaymentPlatform, paymentPlatformDTO);

                return existingPaymentPlatform;
            })
            .map(paymentPlatformRepository::save)
            .map(paymentPlatformMapper::toDto);
    }

    /**
     * Get all the paymentPlatforms.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PaymentPlatformDTO> findAll() {
        log.debug("Request to get all PaymentPlatforms");
        return paymentPlatformRepository
            .findAll()
            .stream()
            .map(paymentPlatformMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the paymentPlatforms with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<PaymentPlatformDTO> findAllWithEagerRelationships(Pageable pageable) {
        return paymentPlatformRepository.findAllWithEagerRelationships(pageable).map(paymentPlatformMapper::toDto);
    }

    /**
     * Get one paymentPlatform by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PaymentPlatformDTO> findOne(Long id) {
        log.debug("Request to get PaymentPlatform : {}", id);
        return paymentPlatformRepository.findOneWithEagerRelationships(id).map(paymentPlatformMapper::toDto);
    }

    /**
     * Delete the paymentPlatform by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PaymentPlatform : {}", id);
        paymentPlatformRepository.deleteById(id);
    }
}
