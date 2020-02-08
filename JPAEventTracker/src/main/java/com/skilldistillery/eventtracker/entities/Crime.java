package com.skilldistillery.eventtracker.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Crime {

	// FIELDS
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "crime_name")
	private String crimeName;
	
	@Column(name = "neighborhood")
	private String neighborhood;
	
	// CONSTRUCTORS
	
	public Crime() {
		super();
	}

	public Crime(int id, String crimeName, String neighborhood) {
		super();
		this.id = id;
		this.crimeName = crimeName;
		this.neighborhood = neighborhood;
	}
	
	// GETTERS AND SETTERS

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCrimeName() {
		return crimeName;
	}

	public void setCrimeName(String crimeName) {
		this.crimeName = crimeName;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	// TOSTRING AND HASH & Equals
	
	@Override
	public String toString() {
		return "Crime [id=" + id + ", crimeName=" + crimeName + ", neighborhood=" + neighborhood + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Crime other = (Crime) obj;
		if (id != other.id)
			return false;
		return true;
	}

	
}
