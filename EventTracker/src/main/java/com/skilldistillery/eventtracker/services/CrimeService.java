package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Crime;

public interface CrimeService {

	Crime addCrimeById(Crime crime);
	boolean deleteCrimeById(int crimeId);
	List<Crime> listCrimes();
	List<Crime> findByNeighborhood(String neighborhood);
	Crime getCrime(int id);
}
