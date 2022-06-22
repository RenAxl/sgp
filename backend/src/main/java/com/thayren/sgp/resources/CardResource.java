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

import com.thayren.sgp.dto.CardDTO;
import com.thayren.sgp.services.CardService;

@RestController
@RequestMapping(value = "/cards")
public class CardResource {
	
	@Autowired
	private CardService service;
	
	@GetMapping
	public ResponseEntity<List<CardDTO>> findAll(){
		
		List<CardDTO> list = new ArrayList<>();
		list = service.findAll();
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CardDTO> findById(@PathVariable Long id){
		CardDTO cardDto = service.findById(id);
		return ResponseEntity.ok().body(cardDto);
	}
	
	@PostMapping
	public ResponseEntity<CardDTO> insert(@RequestBody CardDTO cardDto){
		cardDto = service.insert(cardDto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(cardDto.getId()).toUri();
		return ResponseEntity.created(uri).body(cardDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CardDTO> update(@PathVariable Long id, @RequestBody CardDTO cardDto){
		cardDto = service.update(id, cardDto);
		return ResponseEntity.ok().body(cardDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CardDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}


