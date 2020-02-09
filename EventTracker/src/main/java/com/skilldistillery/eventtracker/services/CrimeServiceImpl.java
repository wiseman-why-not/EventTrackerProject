package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Crime;
import com.skilldistillery.eventtracker.repositories.CrimeRepository;

@Service
public class CrimeServiceImpl implements CrimeService {

	@Autowired
	private CrimeRepository repo;
	
	public List<Crime> listNeighborhoods(){
		List<Crime> crimes = repo.findAll();
		return crimes;
	}

	@Override
	public List<Crime> listCrimes() {
		List<Crime> crimes = repo.findAll();
		return crimes;
	}
	
	@Override
	public Crime getCrime(int id) {
		Optional<Crime> crimeOpt = repo.findById(id);
		Crime crime = null;
		if(crimeOpt.isPresent()) {
			crime = crimeOpt.get();
		}
		return crime;
	}
	
	@Override
	public Crime addCrime(Crime crime) {
		repo.saveAndFlush(crime);
		return crime;
	}

	@Override
	public boolean deleteCrimeById(int crimeId) {
		
		Optional<Crime> crimeOpt = repo.findById(crimeId);
		if(crimeOpt.isPresent()) {
			repo.deleteById(crimeId);
			return true;
		}
		
		return false;
	}

	@Override
	public List<Crime> findByNeighborhood(String neighborhood) {
		
		return null;
	}
	
}
