package com.thayren.sgp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}


