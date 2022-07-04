package com.thayren.sgp.tests.factory;

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.entities.Equipment;

public class EquipmentFactory {

	public static Equipment createEquipment() {
		Equipment equipment = new Equipment(1L, "Ciena 5430");
		return equipment;
	}
	
	public static EquipmentDTO createEquipmentDTO() {
		Equipment equipment = createEquipment(); 
		return new EquipmentDTO(equipment); 
	}
	
	public static EquipmentDTO createProductDTO(Long id) {
		EquipmentDTO dto = createEquipmentDTO();
		dto.setId(id);
		return dto;
	}
}
