package com.mathieulucas.coopcycle.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mathieulucas.coopcycle.IntegrationTest;
import com.mathieulucas.coopcycle.domain.PaymentPlatform;
import com.mathieulucas.coopcycle.domain.enumeration.PaymentType;
import com.mathieulucas.coopcycle.repository.PaymentPlatformRepository;
import com.mathieulucas.coopcycle.service.PaymentPlatformService;
import com.mathieulucas.coopcycle.service.dto.PaymentPlatformDTO;
import com.mathieulucas.coopcycle.service.mapper.PaymentPlatformMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PaymentPlatformResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PaymentPlatformResourceIT {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final PaymentType DEFAULT_PAYMENT_TYPE = PaymentType.CB;
    private static final PaymentType UPDATED_PAYMENT_TYPE = PaymentType.IZLY;

    private static final String ENTITY_API_URL = "/api/payment-platforms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PaymentPlatformRepository paymentPlatformRepository;

    @Mock
    private PaymentPlatformRepository paymentPlatformRepositoryMock;

    @Autowired
    private PaymentPlatformMapper paymentPlatformMapper;

    @Mock
    private PaymentPlatformService paymentPlatformServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaymentPlatformMockMvc;

    private PaymentPlatform paymentPlatform;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentPlatform createEntity(EntityManager em) {
        PaymentPlatform paymentPlatform = new PaymentPlatform().amount(DEFAULT_AMOUNT).paymentType(DEFAULT_PAYMENT_TYPE);
        return paymentPlatform;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentPlatform createUpdatedEntity(EntityManager em) {
        PaymentPlatform paymentPlatform = new PaymentPlatform().amount(UPDATED_AMOUNT).paymentType(UPDATED_PAYMENT_TYPE);
        return paymentPlatform;
    }

    @BeforeEach
    public void initTest() {
        paymentPlatform = createEntity(em);
    }

    @Test
    @Transactional
    void createPaymentPlatform() throws Exception {
        int databaseSizeBeforeCreate = paymentPlatformRepository.findAll().size();
        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);
        restPaymentPlatformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentPlatform testPaymentPlatform = paymentPlatformList.get(paymentPlatformList.size() - 1);
        assertThat(testPaymentPlatform.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPaymentPlatform.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    void createPaymentPlatformWithExistingId() throws Exception {
        // Create the PaymentPlatform with an existing ID
        paymentPlatform.setId(1L);
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        int databaseSizeBeforeCreate = paymentPlatformRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentPlatformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentPlatformRepository.findAll().size();
        // set the field null
        paymentPlatform.setAmount(null);

        // Create the PaymentPlatform, which fails.
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        restPaymentPlatformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPaymentTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentPlatformRepository.findAll().size();
        // set the field null
        paymentPlatform.setPaymentType(null);

        // Create the PaymentPlatform, which fails.
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        restPaymentPlatformMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPaymentPlatforms() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        // Get all the paymentPlatformList
        restPaymentPlatformMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentPlatform.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPaymentPlatformsWithEagerRelationshipsIsEnabled() throws Exception {
        when(paymentPlatformServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaymentPlatformMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(paymentPlatformServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPaymentPlatformsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(paymentPlatformServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaymentPlatformMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(paymentPlatformRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPaymentPlatform() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        // Get the paymentPlatform
        restPaymentPlatformMockMvc
            .perform(get(ENTITY_API_URL_ID, paymentPlatform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paymentPlatform.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPaymentPlatform() throws Exception {
        // Get the paymentPlatform
        restPaymentPlatformMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPaymentPlatform() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();

        // Update the paymentPlatform
        PaymentPlatform updatedPaymentPlatform = paymentPlatformRepository.findById(paymentPlatform.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentPlatform are not directly saved in db
        em.detach(updatedPaymentPlatform);
        updatedPaymentPlatform.amount(UPDATED_AMOUNT).paymentType(UPDATED_PAYMENT_TYPE);
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(updatedPaymentPlatform);

        restPaymentPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paymentPlatformDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isOk());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
        PaymentPlatform testPaymentPlatform = paymentPlatformList.get(paymentPlatformList.size() - 1);
        assertThat(testPaymentPlatform.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPaymentPlatform.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paymentPlatformDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePaymentPlatformWithPatch() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();

        // Update the paymentPlatform using partial update
        PaymentPlatform partialUpdatedPaymentPlatform = new PaymentPlatform();
        partialUpdatedPaymentPlatform.setId(paymentPlatform.getId());

        partialUpdatedPaymentPlatform.amount(UPDATED_AMOUNT).paymentType(UPDATED_PAYMENT_TYPE);

        restPaymentPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaymentPlatform.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaymentPlatform))
            )
            .andExpect(status().isOk());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
        PaymentPlatform testPaymentPlatform = paymentPlatformList.get(paymentPlatformList.size() - 1);
        assertThat(testPaymentPlatform.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPaymentPlatform.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdatePaymentPlatformWithPatch() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();

        // Update the paymentPlatform using partial update
        PaymentPlatform partialUpdatedPaymentPlatform = new PaymentPlatform();
        partialUpdatedPaymentPlatform.setId(paymentPlatform.getId());

        partialUpdatedPaymentPlatform.amount(UPDATED_AMOUNT).paymentType(UPDATED_PAYMENT_TYPE);

        restPaymentPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaymentPlatform.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaymentPlatform))
            )
            .andExpect(status().isOk());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
        PaymentPlatform testPaymentPlatform = paymentPlatformList.get(paymentPlatformList.size() - 1);
        assertThat(testPaymentPlatform.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPaymentPlatform.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, paymentPlatformDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPaymentPlatform() throws Exception {
        int databaseSizeBeforeUpdate = paymentPlatformRepository.findAll().size();
        paymentPlatform.setId(count.incrementAndGet());

        // Create the PaymentPlatform
        PaymentPlatformDTO paymentPlatformDTO = paymentPlatformMapper.toDto(paymentPlatform);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaymentPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paymentPlatformDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PaymentPlatform in the database
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePaymentPlatform() throws Exception {
        // Initialize the database
        paymentPlatformRepository.saveAndFlush(paymentPlatform);

        int databaseSizeBeforeDelete = paymentPlatformRepository.findAll().size();

        // Delete the paymentPlatform
        restPaymentPlatformMockMvc
            .perform(delete(ENTITY_API_URL_ID, paymentPlatform.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaymentPlatform> paymentPlatformList = paymentPlatformRepository.findAll();
        assertThat(paymentPlatformList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
