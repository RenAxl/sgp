package com.thayren.sgp.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("select use from User use where use.name like %?1%")
	Page<User> find(String name, Pageable pageable);
	
	@Query("SELECT obj FROM User obj JOIN FETCH obj.roles WHERE obj IN :users")
	List<User> findUsersWithRoles(List<User> users);
	
	User findByEmail(String email);

}


