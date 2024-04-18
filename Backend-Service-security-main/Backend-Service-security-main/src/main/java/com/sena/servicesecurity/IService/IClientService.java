package com.sena.servicesecurity.IService;

import java.time.LocalDateTime;

import java.util.List;
import com.sena.servicesecurity.DTO.IClientDto;
import com.sena.servicesecurity.Entity.Client;
import com.sena.servicesecurity.Entity.Person;
import com.sena.servicesecurity.IService.IBaseService;

public interface IClientService extends IBaseService<Client>{
	
	List<IClientDto> getList();
	public String GenerateCodeCustomer(String typeDocument, String document, LocalDateTime createAt) throws Exception ;

	public Client savePersonClient(Person entity) throws Exception;
	
}
