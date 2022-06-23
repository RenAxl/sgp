package com.thayren.sgp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.repositories.EquipmentRepository;

@Service
public class EquipmentService {
	
	@Autowired
	private EquipmentRepository repository;
	
	@Transactional(readOnly = true)
	public Page<EquipmentDTO> findAllPaged(PageRequest pageRequest) {
		Page<Equipment> list = repository.findAll(pageRequest);
		
		Page<EquipmentDTO> listDto = list.map(x -> new EquipmentDTO(x));
		
		return listDto;
	}
	
	@Transactional(readOnly = true)
	public EquipmentDTO findById(Long id) {
		Optional<Equipment> obj = repository.findById(id);
		Equipment entity = obj.get();
		
		return new EquipmentDTO(entity);
	}
	
	@Transactional
	public EquipmentDTO insert(EquipmentDTO equipmentDto) {
		Equipment entity = new Equipment();
		entity.setModel(equipmentDto.getModel());
		entity = repository.save(entity);
		
		return new EquipmentDTO(entity) ;
	}
	
	@Transactional
	public EquipmentDTO update(Long id, EquipmentDTO equipmentDto) {
		Equipment entity = repository.getOne(id);
		entity.setModel(equipmentDto.getModel());
		entity = repository.save(entity);
		
		return new EquipmentDTO(entity);
	}
	
	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

}
