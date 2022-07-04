package com.thayren.sgp.tests.factory;

import com.thayren.sgp.dto.UserDTO;
import com.thayren.sgp.entities.Role;
import com.thayren.sgp.entities.User;

public class UserFactory {

	public static User createUser() {
		User user = new User(1L, "Axl", "axl@gmail.com", "$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG");
		user.getRoles().add(new Role(1L, null));
		return user;
	}
	
	public static UserDTO createProductDTO() {
		User user = createUser(); 
		return new UserDTO(user); 
	}
	
	public static UserDTO createProductDTO(Long id) {
		UserDTO dto = createProductDTO(); // Aproveitei o próprio método anterior que é createProductDTO()
		dto.setId(id);
		return dto;
	}
}


