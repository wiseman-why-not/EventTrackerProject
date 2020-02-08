package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Crime;

public interface CrimeRepository extends JpaRepository<Crime, Integer> {

}
