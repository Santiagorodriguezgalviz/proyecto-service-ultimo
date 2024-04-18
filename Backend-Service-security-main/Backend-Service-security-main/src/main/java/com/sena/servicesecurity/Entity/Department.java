package com.sena.servicesecurity.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "department")
public class Department extends ABaseEntity{
	

	  @Column(name = "name", nullable = false, unique = true)
	    private String name;
	    
	@Column(name = "code", nullable = false)
	    private String code;
	


	

	public String getName() {
		return name;
	}





	public void setName(String name) {
		this.name = name;
	}





	public String getCode() {
		return code;
	}





	public void setCode(String code) {
		this.code = code;
	}





	public Country getCountry() {
		return country;
	}





	public void setCountry(Country country) {
		this.country = country;
	}





	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;
	
}

