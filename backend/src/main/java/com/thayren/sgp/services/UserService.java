package com.thayren.sgp.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thayren.sgp.entities.User;
import com.thayren.sgp.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;

	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		list = repository.findAll();

		return list;
	}
	
	

}

