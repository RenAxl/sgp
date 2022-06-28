package com.thayren.sgp.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.repositories.EquipmentRepository;
import com.thayren.sgp.services.exceptions.DatabaseException;
import com.thayren.sgp.services.exceptions.ResourceNotFoundException;

@Service
public class EquipmentService {

	@Autowired
	private EquipmentRepository repository;

	@Transactional(readOnly = true)
	public Page<EquipmentDTO> findAllPaged(String model, PageRequest pageRequest) {
		Page<Equipment> list = repository.find(model, pageRequest);
		Page<EquipmentDTO> listDto = list.map(x -> new EquipmentDTO(x));

		return listDto;
	}

	@Transactional(readOnly = true)
	public EquipmentDTO findById(Long id) {
		Optional<Equipment> obj = repository.findById(id);
		Equipment entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));

		return new EquipmentDTO(entity);
	}

	@Transactional
	public EquipmentDTO insert(EquipmentDTO equipmentDto) {
		Equipment entity = new Equipment();
		entity.setModel(equipmentDto.getModel());
		entity = repository.save(entity);

		return new EquipmentDTO(entity);
	}

	@Transactional
	public EquipmentDTO update(Long id, EquipmentDTO equipmentDto) {
		try {
			Equipment entity = repository.getOne(id);
			entity.setModel(equipmentDto.getModel());
			entity = repository.save(entity);

			return new EquipmentDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	@Transactional
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}

}
