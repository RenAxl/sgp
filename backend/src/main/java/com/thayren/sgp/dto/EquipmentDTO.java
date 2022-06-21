package com.thayren.sgp.dto;

import java.io.Serializable;

import com.thayren.sgp.entities.Equipment;

public class EquipmentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String model;

	public EquipmentDTO() {
	}

	public EquipmentDTO(Long id, String model) {
		this.id = id;
		this.model = model;
	}
	
	public EquipmentDTO(Equipment entity) {
		this.id = entity.getId();
		this.model = entity.getModel();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}
	
}
