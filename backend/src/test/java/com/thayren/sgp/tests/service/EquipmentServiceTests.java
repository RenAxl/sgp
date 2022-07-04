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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.thayren.sgp.dto.EquipmentDTO;
import com.thayren.sgp.entities.Equipment;
import com.thayren.sgp.repositories.EquipmentRepository;
import com.thayren.sgp.services.EquipmentService;
import com.thayren.sgp.services.exceptions.DatabaseException;
import com.thayren.sgp.services.exceptions.ResourceNotFoundException;
import com.thayren.sgp.tests.factory.EquipmentFactory;

@ExtendWith(SpringExtension.class)
public class EquipmentServiceTests {

	@InjectMocks
	private EquipmentService service;

	@Mock
	private EquipmentRepository repository;

	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Equipment equipment;
	private PageImpl<Equipment> page;

	@BeforeEach
	void setUp() throws Exception {

		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		equipment = EquipmentFactory.createEquipment();
		page = new PageImpl<>(List.of(equipment));

		// Simulações do comportamento do método repository.deleteById().
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);

		// Simulação do comportamento do método repository.find().
		Mockito.when(repository.find(ArgumentMatchers.anyString(), ArgumentMatchers.any()))
				.thenReturn(page);

		// Simulações do comportamento do método repository.findById().
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(equipment));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		// Simulação do comportamento do método repository.getOne().
		Mockito.when(repository.getOne(existingId)).thenReturn(equipment);
		Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(nonExistingId);
		
		//Simulação do comportamento do método repository.save()
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(equipment);

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
	public void deleteShouldThrowDatabaseExceptionWhenDependentId() {

		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}

	@Test
	public void findAllPagedShouldReturnPage() {
		String model = "";
		PageRequest pageRequest = PageRequest.of(0, 10);

		Page<EquipmentDTO> result = service.findAllPaged(model, pageRequest);

		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
		Mockito.verify(repository, Mockito.times(1)).find(model, pageRequest);
	}

	@Test
	public void findByIdShouldReturnEquipmentDTOWhenIdExists() {

		EquipmentDTO result = service.findById(existingId);
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
	public void updateShouldReturnEquipmentDTOWhenIdExists() {
		
		EquipmentDTO dto = new EquipmentDTO();
		
		EquipmentDTO result = service.update(existingId, dto);
		Assertions.assertNotNull(result);
		
		Mockito.verify(repository, Mockito.times(1)).getOne(existingId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		EquipmentDTO dto = new EquipmentDTO();
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, dto);
		});
		
		
		Mockito.verify(repository, Mockito.times(1)).getOne(nonExistingId);
	}

}
