package com.sena.servicesecurity.Service;

import com.sena.servicesecurity.Entity.Position;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.IPositionRepository;
import com.sena.servicesecurity.IService.IPositionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PositionService extends ABaseService<Position> implements IPositionService{

	@Override
	protected IBaseRepository<Position, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	@Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
	
	@Autowired
	private IPositionRepository repository;

}
