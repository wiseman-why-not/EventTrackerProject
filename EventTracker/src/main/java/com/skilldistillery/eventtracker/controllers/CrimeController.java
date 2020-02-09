package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Crime;
import com.skilldistillery.eventtracker.services.CrimeService;

@RequestMapping("api")
@RestController
public class CrimeController {
	
	@Autowired
	private CrimeService srv;
	
	// GET (READ)
	@GetMapping("crimes")
	public List<Crime> findAllNeighborhoods(HttpServletRequest req, 
		HttpServletResponse res){
		List<Crime> crimes = srv.listCrimes();
		res.setStatus(202);
		return crimes;
	}
	@GetMapping("crimes/{id}")
	public Crime findCrimeById(@PathVariable Integer id, HttpServletResponse res) {
		Crime crime = srv.getCrime(id);
		if (crime == null) {
			res.setStatus(404);
		}
		return crime;
	}
	
	// CREATE
	
	@PostMapping("crimes")
	public Crime create(@RequestBody Crime crime, HttpServletRequest req,
			HttpServletResponse res) {
		try {
			srv.addCrime(crime);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(crime.getId());
		} catch (Exception e) {
			res.setStatus(404);
			e.printStackTrace();
			return null;
		}
		return crime;
	}

	// UPDATE
	
	@PutMapping("crimes/{id}")
	public Crime replaceCrime(@PathVariable Integer id, @RequestBody Crime crime,
			HttpServletRequest req, HttpServletResponse res) {
			crime = srv.replaceCrime(id, crime);
			if (crime == null) {
				res.setStatus(404);
			}
		return crime;		
	}

}
