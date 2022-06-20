package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.entities.Card;
import com.thayren.sgp.repositories.CardRepository;

@Service
public class CardService {
	
	@Autowired
	private CardRepository repository;	
	
	@Transactional(readOnly = true)
	public List<Card> findAll() {
		List<Card> list = new ArrayList<>();
		list = repository.findAll();

		return list;
	}
	
	@Transactional(readOnly = true)
	public Card findById(Long id) {
		Optional<Card> obj = repository.findById(id);
		Card entity = obj.get();
		
		return entity;
	}
	
	@Transactional
	public Card insert(Card card) {
		Card entity = new Card();
		copyToEntity(card, entity);	
		entity = repository.save(entity);
		
		return entity;
	}

	private void copyToEntity(Card card, Card entity) {
		entity.setModel(card.getModel());
		entity.setFeature(card.getFeature());
		entity.setFunctionality(card.getFunctionality());
		entity.setConnection(card.getConnection());
		entity.setResetProcedure(card.getResetProcedure());
		entity.setExchangeProcedure(card.getExchangeProcedure());
		entity.setImgUrl(card.getImgUrl());
		
	}
	

}

