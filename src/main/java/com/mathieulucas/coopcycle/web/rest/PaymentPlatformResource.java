package com.mathieulucas.coopcycle.web.rest;

import com.mathieulucas.coopcycle.repository.PaymentPlatformRepository;
import com.mathieulucas.coopcycle.service.PaymentPlatformService;
import com.mathieulucas.coopcycle.service.dto.PaymentPlatformDTO;
import com.mathieulucas.coopcycle.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mathieulucas.coopcycle.domain.PaymentPlatform}.
 */
@RestController
@RequestMapping("/api")
public class PaymentPlatformResource {

    private final Logger log = LoggerFactory.getLogger(PaymentPlatformResource.class);

    private static final String ENTITY_NAME = "paymentPlatform";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentPlatformService paymentPlatformService;

    private final PaymentPlatformRepository paymentPlatformRepository;

    public PaymentPlatformResource(PaymentPlatformService paymentPlatformService, PaymentPlatformRepository paymentPlatformRepository) {
        this.paymentPlatformService = paymentPlatformService;
        this.paymentPlatformRepository = paymentPlatformRepository;
    }

    /**
     * {@code POST  /payment-platforms} : Create a new paymentPlatform.
     *
     * @param paymentPlatformDTO the paymentPlatformDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentPlatformDTO, or with status {@code 400 (Bad Request)} if the paymentPlatform has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payment-platforms")
    public ResponseEntity<PaymentPlatformDTO> createPaymentPlatform(@Valid @RequestBody PaymentPlatformDTO paymentPlatformDTO)
        throws URISyntaxException {
        log.debug("REST request to save PaymentPlatform : {}", paymentPlatformDTO);
        if (paymentPlatformDTO.getId() != null) {
            throw new BadRequestAlertException("A new paymentPlatform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentPlatformDTO result = paymentPlatformService.save(paymentPlatformDTO);
        return ResponseEntity
            .created(new URI("/api/payment-platforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payment-platforms/:id} : Updates an existing paymentPlatform.
     *
     * @param id the id of the paymentPlatformDTO to save.
     * @param paymentPlatformDTO the paymentPlatformDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentPlatformDTO,
     * or with status {@code 400 (Bad Request)} if the paymentPlatformDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentPlatformDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payment-platforms/{id}")
    public ResponseEntity<PaymentPlatformDTO> updatePaymentPlatform(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PaymentPlatformDTO paymentPlatformDTO
    ) throws URISyntaxException {
        log.debug("REST request to update PaymentPlatform : {}, {}", id, paymentPlatformDTO);
        if (paymentPlatformDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paymentPlatformDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paymentPlatformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PaymentPlatformDTO result = paymentPlatformService.update(paymentPlatformDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentPlatformDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /payment-platforms/:id} : Partial updates given fields of an existing paymentPlatform, field will ignore if it is null
     *
     * @param id the id of the paymentPlatformDTO to save.
     * @param paymentPlatformDTO the paymentPlatformDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentPlatformDTO,
     * or with status {@code 400 (Bad Request)} if the paymentPlatformDTO is not valid,
     * or with status {@code 404 (Not Found)} if the paymentPlatformDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the paymentPlatformDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/payment-platforms/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PaymentPlatformDTO> partialUpdatePaymentPlatform(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PaymentPlatformDTO paymentPlatformDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update PaymentPlatform partially : {}, {}", id, paymentPlatformDTO);
        if (paymentPlatformDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paymentPlatformDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paymentPlatformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PaymentPlatformDTO> result = paymentPlatformService.partialUpdate(paymentPlatformDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentPlatformDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /payment-platforms} : get all the paymentPlatforms.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paymentPlatforms in body.
     */
    @GetMapping("/payment-platforms")
    public List<PaymentPlatformDTO> getAllPaymentPlatforms(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PaymentPlatforms");
        return paymentPlatformService.findAll();
    }

    /**
     * {@code GET  /payment-platforms/:id} : get the "id" paymentPlatform.
     *
     * @param id the id of the paymentPlatformDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentPlatformDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payment-platforms/{id}")
    public ResponseEntity<PaymentPlatformDTO> getPaymentPlatform(@PathVariable Long id) {
        log.debug("REST request to get PaymentPlatform : {}", id);
        Optional<PaymentPlatformDTO> paymentPlatformDTO = paymentPlatformService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentPlatformDTO);
    }

    /**
     * {@code DELETE  /payment-platforms/:id} : delete the "id" paymentPlatform.
     *
     * @param id the id of the paymentPlatformDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payment-platforms/{id}")
    public ResponseEntity<Void> deletePaymentPlatform(@PathVariable Long id) {
        log.debug("REST request to delete PaymentPlatform : {}", id);
        paymentPlatformService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
