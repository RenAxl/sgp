package com.thayren.sgp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

}
