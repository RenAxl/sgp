package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.repositories.EquipmentRepository;

@Service
public class EquipmentService {
	
	@Autowired
	private EquipmentRepository repository;
	
	@Transactional(readOnly = true)
	public List<Equipment> findAll() {
		List<Equipment> list = new ArrayList<>();
		list = repository.findAll();
		
		return list;
	}
	
	@Transactional(readOnly = true)
	public Equipment findById(Long id) {
		Optional<Equipment> obj = repository.findById(id);
		Equipment entity = obj.get();
		
		return entity;
	}
	
	@Transactional
	public Equipment insert(Equipment equipment) {
		Equipment entity = new Equipment();
		entity.setModel(equipment.getModel());
		entity = repository.save(entity);
		return entity;
	}

}
