package com.thayren.sgp.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Card> findById(@PathVariable Long id){
		Card card = service.findById(id);
		return ResponseEntity.ok().body(card);
	}
	
	@PostMapping
	public ResponseEntity<Card> insert(@RequestBody Card card){
		card = service.insert(card);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(card.getId()).toUri();
		return ResponseEntity.created(uri).body(card);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Card> update(@PathVariable Long id, @RequestBody Card card){
		card = service.update(id, card);
		return ResponseEntity.ok().body(card);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Card> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}


