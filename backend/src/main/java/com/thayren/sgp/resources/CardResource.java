package com.thayren.sgp.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thayren.sgp.entities.Card;
import com.thayren.sgp.services.CardService;

@RestController
@RequestMapping(value = "/cards")
public class CardResource {
	
	@Autowired
	private CardService service;
	
	@GetMapping
	public ResponseEntity<List<Card>> findAll(){
		
		List<Card> list = new ArrayList<>();
		list = service.findAll();
		
		return ResponseEntity.ok().body(list);
	}

}


