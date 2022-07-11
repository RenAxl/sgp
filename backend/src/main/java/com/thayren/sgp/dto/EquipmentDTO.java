package com.thayren.sgp.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.thayren.sgp.entities.Equipment;

public class EquipmentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 3, max = 60, message ="O modelo deve ter entre 5 a 60 caracteres")
	@NotBlank(message = "Campo requerido")
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
