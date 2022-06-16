package com.thayren.sgp.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
