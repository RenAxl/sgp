package com.thayren.sgp.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.thayren.sgp.entities.Card;
import com.thayren.sgp.entities.Equipment;

public class CardDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 3, max = 60, message ="O nome deve ter entre 5 a 60 caracteres")
	@NotBlank(message = "Campo requerido")
	private String model;
	
	@NotBlank(message = "Campo requerido")
	private String feature;
	
	@NotBlank(message = "Campo requerido")
	private String functionality;
	
	@NotBlank(message = "Campo requerido")
	private String connection;
	
	@NotBlank(message = "Campo requerido")
	private String resetProcedure;
	
	@NotBlank(message = "Campo requerido")
	private String exchangeProcedure;
	
	@NotBlank(message = "Campo requerido")
	private String imgUrl;
	
	private Set<EquipmentDTO> equipments = new HashSet<>();;
	
	public CardDTO() {
	}

	public CardDTO(Long id, String model, String feature, String functionality, String connection,
			String resetProcedure, String exchangeProcedure, String imgUrl) {
		this.id = id;
		this.model = model;
		this.feature = feature;
		this.functionality = functionality;
		this.connection = connection;
		this.resetProcedure = resetProcedure;
		this.exchangeProcedure = exchangeProcedure;
		this.imgUrl = imgUrl;
	}
	
	public CardDTO(Card entity) {
		this.id = entity.getId();
		this.model = entity.getModel();
		this.feature = entity.getFeature();
		this.functionality = entity.getFunctionality();
		this.connection = entity.getConnection();
		this.resetProcedure = entity.getResetProcedure();
		this.exchangeProcedure = entity.getExchangeProcedure();
		this.imgUrl = entity.getImgUrl();
	}
	
	public CardDTO(Card entity, Set<Equipment> equipments) {
		this(entity);
		equipments.forEach(eqt -> this.equipments.add(new EquipmentDTO(eqt)));
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

	public String getFeature() {
		return feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public String getFunctionality() {
		return functionality;
	}

	public void setFunctionality(String functionality) {
		this.functionality = functionality;
	}

	public String getConnection() {
		return connection;
	}

	public void setConnection(String connection) {
		this.connection = connection;
	}

	public String getResetProcedure() {
		return resetProcedure;
	}

	public void setResetProcedure(String resetProcedure) {
		this.resetProcedure = resetProcedure;
	}

	public String getExchangeProcedure() {
		return exchangeProcedure;
	}

	public void setExchangeProcedure(String exchangeProcedure) {
		this.exchangeProcedure = exchangeProcedure;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Set<EquipmentDTO> getEquipments() {
		return equipments;
	}
}
