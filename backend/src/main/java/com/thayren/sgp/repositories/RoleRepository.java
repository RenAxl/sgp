package com.thayren.sgp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thayren.sgp.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}

