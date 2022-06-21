package com.thayren.sgp.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_card") 
public class Card implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String model;
	private String feature;
	private String functionality;
	private String connection;
	private String resetProcedure;
	private String exchangeProcedure;
	private String imgUrl;
	
	@ManyToMany
	@JoinTable(
			name = "tb_card_equipment",
			joinColumns = @JoinColumn(name = "card_id"),
			inverseJoinColumns =  @JoinColumn(name = "equipment_id"))
	Set<Equipment> equipments = new HashSet<>();
	
	public Card() {
	}

	public Card(Long id, String model, String imgUrl, String feature, String functionality, String connection,
			String resetProcedure, String exchangeProcedure) {
		this.id = id;
		this.model = model;
		this.imgUrl = imgUrl;
		this.feature = feature;
		this.functionality = functionality;
		this.connection = connection;
		this.resetProcedure = resetProcedure;
		this.exchangeProcedure = exchangeProcedure;
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

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
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
	
	public Set<Equipment> getEquipments() {
		return equipments;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Card other = (Card) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
