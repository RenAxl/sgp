package com.thayren.sgp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long>{

}
