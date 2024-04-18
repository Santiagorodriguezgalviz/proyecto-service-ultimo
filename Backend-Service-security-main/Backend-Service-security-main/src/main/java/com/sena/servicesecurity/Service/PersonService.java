package com.sena.servicesecurity.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.Entity.Client;
import com.sena.servicesecurity.Entity.Person;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.IClientRepository;
import com.sena.servicesecurity.IRepository.IPersonRepository;
import com.sena.servicesecurity.IService.IPersonService;

@Service
public class PersonService extends ABaseService<Person> implements IPersonService {

    @Autowired
    private IPersonRepository repository;
    
    
    @Override
    protected IBaseRepository<Person, Long> getRepository() {
        return repository;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<IPersonDto> getList() {
        return repository.getList();
    }
    
    
    public void update(Long id, Person entity) throws Exception {
    	
    	
        Optional<Person> op = getRepository().findById(id);

        if (op.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (op.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }

        Person entityUpdate = op.get();

        String[] ignoreProperties = { "id", "createdAt", "deletedAt", "createdBy", "deletedBy" };
        BeanUtils.copyProperties(entity, entityUpdate, ignoreProperties);
        entityUpdate.setUpdatedAt(LocalDateTime.now());
        entityUpdate.setUpdatedBy((long)1); //Cuanto esté el loggin, se debe enviar el ID del usuario con Auth
        getRepository().save(entityUpdate);
    }
    
    

    
    
}