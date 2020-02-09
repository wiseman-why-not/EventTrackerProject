package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Crime;
import com.skilldistillery.eventtracker.services.CrimeService;

@RequestMapping("api")
@RestController
public class CrimeController {
	
	@Autowired
	private CrimeService srv;
	
	@GetMapping("crimes")
	public List<Crime> findAllNeighborhoods(HttpServletRequest req, 
		HttpServletResponse res){
		List<Crime> crimes = srv.listCrimes();
		res.setStatus(202);
		return crimes;
	}
	


}
