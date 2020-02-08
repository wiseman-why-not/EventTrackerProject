package com.skilldistillery.eventtracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CrimeTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private static Crime crime;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		crime = em.find(Crime.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		crime = null;
		em = null;
	}


	@Test
	@DisplayName("testing crime entity")
	void test1() {
		assertEquals("Murder", crime.getCrimeName());
		assertEquals("LoDo", crime.getNeighborhood());
	}

}
