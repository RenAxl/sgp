package com.thayren.sgp.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.dto.CardDTO;
import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.entities.Card;
import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.repositories.CardRepository;
import com.thayren.sgp.repositories.EquipmentRepository;

@Service
public class CardService {
	
	@Autowired
	private CardRepository repository;	
	
	@Autowired
	private EquipmentRepository equipmentRepository;
	
	@Transactional(readOnly = true)
	public Page<CardDTO> findAllPaged(Long equipmentId, String model, PageRequest pageRequest) {
		List<Equipment> equipments = (equipmentId == 0L) ? null : Arrays.asList(equipmentRepository.getOne(equipmentId));
		Page<Card> list = repository.find(equipments, model, pageRequest);
		repository.findCardsWithEquipments(list.getContent());
		Page<CardDTO> listDto = list.map(x -> new CardDTO(x, x.getEquipments()));

		return listDto;
	}
	
	@Transactional(readOnly = true)
	public CardDTO findById(Long id) {
		Optional<Card> obj = repository.findById(id);
		Card entity = obj.get();
		
		return new CardDTO(entity, entity.getEquipments());
	}
	
	@Transactional
	public CardDTO insert(CardDTO cardDto) {
		Card entity = new Card();
		copyDtoToEntity(cardDto, entity);	
		entity = repository.save(entity);
		
		return new CardDTO(entity, entity.getEquipments());
	}
	
	@Transactional
	public CardDTO update(Long id, CardDTO cardDto) {
		Card entity = repository.getOne(id);
		copyDtoToEntity(cardDto, entity);	
		entity = repository.save(entity);
		
		return new CardDTO(entity, entity.getEquipments());
	}
	
	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}
	
	

	private void copyDtoToEntity(CardDTO cardDto, Card entity) {
		entity.setModel(cardDto.getModel());
		entity.setFeature(cardDto.getFeature());
		entity.setFunctionality(cardDto.getFunctionality());
		entity.setConnection(cardDto.getConnection());
		entity.setResetProcedure(cardDto.getResetProcedure());
		entity.setExchangeProcedure(cardDto.getExchangeProcedure());
		entity.setImgUrl(cardDto.getImgUrl());
		
		entity.getEquipments().clear();
		
		for(EquipmentDTO equipmentDto : cardDto.getEquipments()) {
			Equipment equipment = equipmentRepository.getOne(equipmentDto.getId());
			entity.getEquipments().add(equipment);
		}
		
	}
	

}

