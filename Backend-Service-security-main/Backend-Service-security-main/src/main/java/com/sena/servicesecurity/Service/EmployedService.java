package com.sena.servicesecurity.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.DTO.IEmployedDto;
import com.sena.servicesecurity.Entity.Employed;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.IEmployedRepository;
import com.sena.servicesecurity.IService.IEmployedService;

@Service
public class EmployedService extends ABaseService<Employed> implements IEmployedService{

	@Override
	protected IBaseRepository<Employed, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	@Override
	public void delete(Long id) {
	    repository.deleteById(id);
	}
	
	@Autowired
	private IEmployedRepository repository;

	@Override
	public List<IEmployedDto> getListEmployee() {
		
		return repository.getListEmployee();
	}
	
}
