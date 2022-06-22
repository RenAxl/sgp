package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.dto.RoleDTO;
import com.thayren.sgp.dto.UserDTO;
import com.thayren.sgp.entities.Role;
import com.thayren.sgp.entities.User;
import com.thayren.sgp.repositories.RoleRepository;
import com.thayren.sgp.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Transactional(readOnly = true)
	public List<UserDTO> findAll() {
		List<User> list = new ArrayList<>();
		list = repository.findAll();
		
		List<UserDTO> listDto = list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());

		return listDto;
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.get();
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO insert(UserDTO userDto) {
		User entity = new User();
		copyDtoToEntity(userDto, entity);	
		entity = repository.save(entity);
		
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO update(Long id, UserDTO userDto) {
		User entity = repository.getOne(id);
		copyDtoToEntity(userDto, entity);	
		entity = repository.save(entity);
		
		return new UserDTO(entity);
	}
	
	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

	private void copyDtoToEntity(UserDTO userDto, User entity) {
		entity.setName(userDto.getName());
		entity.setEmail(userDto.getEmail());
		entity.setPassword(userDto.getPassword());
		
		entity.getRoles().clear();
		
		for(RoleDTO roleDto : userDto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}
		
	}
	
}

