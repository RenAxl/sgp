package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thayren.sgp.entities.User;
import com.thayren.sgp.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;

	@Transactional(readOnly = true)
	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		list = repository.findAll();

		return list;
	}
	
	@Transactional(readOnly = true)
	public User findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.get();
		return entity;
	}
	
	@Transactional
	public User insert(User user) {
		User entity = new User();
		copyToEntity(user, entity);	
		entity = repository.save(entity);
		
		return entity;
	}
	
	@Transactional
	public User update(Long id, User user) {
		User entity = repository.getOne(id);
		copyToEntity(user, entity);	
		entity = repository.save(entity);
		
		return entity;
	}
	
	@Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

	private void copyToEntity(User user, User entity) {
		entity.setName(user.getName());
		entity.setEmail(user.getEmail());
		entity.setPassword(user.getPassword());
		
	}
	
}

