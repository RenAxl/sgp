package com.thayren.sgp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long>{
	
	@Query("select eqt from Equipment eqt where eqt.model like %?1%")
	Page<Equipment> find(String model, Pageable pageable);

}
