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

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.services.EquipmentService;

@RestController
@RequestMapping(value = "/equipments")
public class EquipmentResource {
	
	@Autowired
	private EquipmentService service;
	
	@GetMapping
	public ResponseEntity<List<EquipmentDTO>> findAll(){
		
		List<EquipmentDTO> list = new ArrayList<>();
		list = service.findAll();
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> findById(@PathVariable Long id){
		EquipmentDTO equipmentDto = service.findById(id);
		
		return ResponseEntity.ok().body(equipmentDto);
	}
	
	@PostMapping
	public ResponseEntity<EquipmentDTO> insert(@RequestBody EquipmentDTO equipmentDto){
		equipmentDto = service.insert(equipmentDto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(equipmentDto.getId()).toUri();
		return ResponseEntity.created(uri).body(equipmentDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> update(@PathVariable Long id, @RequestBody EquipmentDTO equipmentDto){
		equipmentDto = service.update(id, equipmentDto);
		return ResponseEntity.ok().body(equipmentDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<EquipmentDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
