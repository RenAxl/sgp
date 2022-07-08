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

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.services.EquipmentService;

@RestController
@RequestMapping(value = "/equipments")
public class EquipmentResource {
	
	@Autowired
	private EquipmentService service;
	
	@GetMapping
	public ResponseEntity<Page<EquipmentDTO>> findAllPaged(
			@RequestParam(value = "model", defaultValue = "") String model,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "4") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "model") String orderBy
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<EquipmentDTO> list = service.findAllPaged(model.trim(), pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> findById(@PathVariable Long id){
		EquipmentDTO equipmentDto = service.findById(id);
		
		return ResponseEntity.ok().body(equipmentDto);
	}
	
	@PostMapping
	public ResponseEntity<EquipmentDTO> insert(@Valid @RequestBody EquipmentDTO equipmentDto){
		equipmentDto = service.insert(equipmentDto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(equipmentDto.getId()).toUri();
		return ResponseEntity.created(uri).body(equipmentDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> update(@PathVariable Long id, @Valid @RequestBody EquipmentDTO equipmentDto){
		equipmentDto = service.update(id, equipmentDto);
		return ResponseEntity.ok().body(equipmentDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
