package com.sena.servicesecurity.Entity;

import org.hibernate.annotations.Collate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "country")
public class Country extends ABaseEntity{

	
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    
    @Column(name = "code", length = 50, nullable = false)
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

	




	
 
  
}
