package com.thayren.sgp.tests.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.thayren.sgp.dto.CardDTO;
import com.thayren.sgp.entities.Card;
import com.thayren.sgp.repositories.CardRepository;
import com.thayren.sgp.services.CardService;
import com.thayren.sgp.services.exceptions.ResourceNotFoundException;
import com.thayren.sgp.tests.factory.CardFactory;

@ExtendWith(SpringExtension.class)
public class CardServiceTests {

	@InjectMocks
	private CardService service;

	@Mock
	private CardRepository repository;

	private long existingId;
	private long nonExistingId;
	private Card card;
	private PageImpl<Card> page;

	@BeforeEach
	void setUp() throws Exception {

		existingId = 1L;
		nonExistingId = 1000L;
		card = CardFactory.createCard();
		page = new PageImpl<>(List.of(card));

		// Simulações do comportamento do método repository.deleteById().
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);

		// Simulação do comportamento do método repository.find().
		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
				.thenReturn(page);

		// Simulações do comportamento do método repository.findById().
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(card));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		// Simulação do comportamento do método repository.getOne().
		Mockito.when(repository.getOne(existingId)).thenReturn(card);
		Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(nonExistingId);
		
		//Simulação do comportamento do método repository.save()
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(card);

	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}

	@Test
	public void findAllPagedShouldReturnPage() {
		Long equipmentId = 0L;
		String model = "";
		PageRequest pageRequest = PageRequest.of(0, 10);

		Page<CardDTO> result = service.findAllPaged(equipmentId, model, pageRequest);

		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
		Mockito.verify(repository, Mockito.times(1)).find(null, model, pageRequest);
	}

	@Test
	public void findByIdShouldReturnCardDTOWhenIdExists() {

		CardDTO result = service.findById(existingId);
		Assertions.assertNotNull(result);

		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}

	@Test
	public void findByShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});

		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);
	}
	
	@Test
	public void updateShouldReturnCardDTOWhenIdExists() {
		
		CardDTO dto = new CardDTO();
		
		CardDTO result = service.update(existingId, dto);
		Assertions.assertNotNull(result);
		
		Mockito.verify(repository, Mockito.times(1)).getOne(existingId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		CardDTO dto = new CardDTO();
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, dto);
		});
		
		
		Mockito.verify(repository, Mockito.times(1)).getOne(nonExistingId);
	}

}

