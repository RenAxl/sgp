package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;

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
	
	

}
