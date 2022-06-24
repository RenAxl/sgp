package com.thayren.sgp.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.Card;
import com.thayren.sgp.entities.Equipment;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
	
	@Query("SELECT DISTINCT obj FROM Card obj INNER JOIN obj.equipments eqts WHERE "
			+ "(COALESCE(:equipments) IS NULL OR eqts IN :equipments) AND "
			+ "(LOWER(obj.model) LIKE LOWER(CONCAT('%',:model,'%'))) ")
	Page<Card> find(List<Equipment> equipments, String model, Pageable pageable);
	
	@Query("SELECT obj FROM Card obj JOIN FETCH obj.equipments WHERE obj IN :cards")
	List<Card> findCardsWithEquipments(List<Card> cards);

}
