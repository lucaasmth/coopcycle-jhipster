package com.mathieulucas.coopcycle.repository;

import com.mathieulucas.coopcycle.domain.PaymentPlatform;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PaymentPlatform entity.
 */
@Repository
public interface PaymentPlatformRepository extends JpaRepository<PaymentPlatform, Long> {
    default Optional<PaymentPlatform> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<PaymentPlatform> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<PaymentPlatform> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct paymentPlatform from PaymentPlatform paymentPlatform left join fetch paymentPlatform.order",
        countQuery = "select count(distinct paymentPlatform) from PaymentPlatform paymentPlatform"
    )
    Page<PaymentPlatform> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct paymentPlatform from PaymentPlatform paymentPlatform left join fetch paymentPlatform.order")
    List<PaymentPlatform> findAllWithToOneRelationships();

    @Query(
        "select paymentPlatform from PaymentPlatform paymentPlatform left join fetch paymentPlatform.order where paymentPlatform.id =:id"
    )
    Optional<PaymentPlatform> findOneWithToOneRelationships(@Param("id") Long id);
}
