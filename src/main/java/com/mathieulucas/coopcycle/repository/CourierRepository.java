package com.mathieulucas.coopcycle.repository;

import com.mathieulucas.coopcycle.domain.Courier;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Courier entity.
 */
@Repository
public interface CourierRepository extends JpaRepository<Courier, Long> {
    default Optional<Courier> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Courier> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Courier> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct courier from Courier courier left join fetch courier.restaurant",
        countQuery = "select count(distinct courier) from Courier courier"
    )
    Page<Courier> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct courier from Courier courier left join fetch courier.restaurant")
    List<Courier> findAllWithToOneRelationships();

    @Query("select courier from Courier courier left join fetch courier.restaurant where courier.id =:id")
    Optional<Courier> findOneWithToOneRelationships(@Param("id") Long id);
}
