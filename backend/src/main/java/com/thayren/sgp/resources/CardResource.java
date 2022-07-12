package com.thayren.sgp.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<Page<CardDTO>> findAllPaged(
			@RequestParam(value = "equipmentId", defaultValue = "0") Long equipmentId,
			@RequestParam(value = "model", defaultValue = "") String model,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "8") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "model") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<CardDTO> list = service.findAllPaged(equipmentId, model.trim(), pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CardDTO> findById(@PathVariable Long id){
		CardDTO cardDto = service.findById(id);
		return ResponseEntity.ok().body(cardDto);
	}
	
	@PostMapping
	public ResponseEntity<CardDTO> insert(@Valid @RequestBody CardDTO cardDto){
		cardDto = service.insert(cardDto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(cardDto.getId()).toUri();
		return ResponseEntity.created(uri).body(cardDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CardDTO> update(@PathVariable Long id, @Valid @RequestBody CardDTO cardDto){
		cardDto = service.update(id, cardDto);
		return ResponseEntity.ok().body(cardDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CardDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}


