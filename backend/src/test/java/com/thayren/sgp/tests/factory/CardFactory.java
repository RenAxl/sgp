package com.thayren.sgp.tests.factory;

import com.thayren.sgp.dto.CardDTO;
import com.thayren.sgp.entities.Card;
import com.thayren.sgp.entities.Equipment;


public class CardFactory {

	public static Card createCard() {
		Card card = new Card(1L, "ISA ethernet 10G",
				"Placa de 1 tributário ethernet de 10GB", 
				"Realiza analise de trafego ethernet no lado cliente e lado VCG",
				"conecta a placa de agredado STM-64",
				"Retirar do slot e aguardar 10 segundos para retornar",
				"Retirar a placa do slot e colocar a placa sobressalente",
				"https://img.com/img.png");
		card.getEquipments().add(new Equipment(1L, null));
		return card;
	}
	
	public static CardDTO createCardDTO() {
		Card card = createCard(); 
		return new CardDTO(card, card.getEquipments()); 
	}
	
	public static CardDTO createCardDTO(Long id) {
		CardDTO dto = createCardDTO(); 
		dto.setId(id);
		return dto;
	}
}


