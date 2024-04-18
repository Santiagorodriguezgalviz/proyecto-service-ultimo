package com.sena.servicesecurity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.Entity.Company;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.ICompanyRepository;
import com.sena.servicesecurity.IService.ICompanyService;

@Service
public class CompanyService extends ABaseService<Company> implements ICompanyService{

	@Override
	protected IBaseRepository<Company, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	@Override
	public void delete(Long id) {
	    repository.deleteById(id);
	}
	
	
	@Autowired
	private ICompanyRepository repository;

}
