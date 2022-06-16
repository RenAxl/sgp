package com.thayren.sgp.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.services.EquipmentService;

@RestController
@RequestMapping(value = "/equipments")
public class EquipmentResource {
	
	@Autowired
	private EquipmentService service;
	
	@GetMapping
	public ResponseEntity<List<Equipment>> findAll(){
		
		List<Equipment> list = new ArrayList<>();
		list = service.findAll();
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Equipment> findById(@PathVariable Long id){
		Equipment equipment = service.findById(id);
		
		return ResponseEntity.ok().body(equipment);
	}
	
	@PostMapping
	public ResponseEntity<Equipment> insert(@RequestBody Equipment equipment){
		equipment = service.insert(equipment);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(equipment.getId()).toUri();
		return ResponseEntity.created(uri).body(equipment);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Equipment> update(@PathVariable Long id, @RequestBody Equipment equipment){
		equipment = service.update(id, equipment);
		return ResponseEntity.ok().body(equipment);
	}

}
