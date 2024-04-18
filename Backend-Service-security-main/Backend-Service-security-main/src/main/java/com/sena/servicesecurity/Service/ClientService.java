package com.sena.servicesecurity.Service;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.servicesecurity.Service.ABaseService;
import com.sena.servicesecurity.Service.PersonService;
import com.sena.servicesecurity.DTO.IClientDto;
import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.Entity.Client;
import com.sena.servicesecurity.Entity.Person;
import com.sena.servicesecurity.IRepository.IBaseRepository;
import com.sena.servicesecurity.IRepository.IClientRepository;
import com.sena.servicesecurity.IService.IClientService;
import com.sena.servicesecurity.DTO.IPersonDto;
@Service
public class ClientService extends ABaseService<Client> implements IClientService{

	@Override
	protected IBaseRepository<Client, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	@Autowired
	private IClientRepository repository;
	
	@Autowired
	private PersonService personService;
	

	@Override
	public List<IClientDto> getList() {
		return repository.getList();
	}

	@Override
	public Client save(Client entity) throws Exception {
		try {

			 IPersonDto person = repository.getDocument(entity.getPerson().getId());

			 String type = person.getType_document();
			 String document = person.getDocument();
			 int anio = LocalDateTime.now().getYear();

            String documentDigit= document.substring(Math.max(0, document.length() -4));
			 String code= anio+"-"+type+"-"+documentDigit;

			 
		        
		        
		        if (person.getDocument() == null || person.getDocument().isEmpty()) {
		            throw new Exception("El campo document de la persona es obligatorio");
		        }
		    
		        
		       
		        entity.setCode(code);
		        entity.setCreatedAt(LocalDateTime.now());
		        entity.setCreatedBy((long) 1); // Cuando esté el logging, se debe enviar el ID del usuario con Auth
		        
		        // Guardar la entidad cliente
		        return getRepository().save(entity);
		    } catch (Exception e) {
		        // Captura la excepción
		        throw new Exception("Error al guardar la entidad: " + e.getMessage());
		    }
	}
/*try {

			 IPersonDto person = repository.getDocument(entity.getPerson().getId());

			 String type = person.getType_document();
			 String document = person.getDocument();
			 int anio = LocalDateTime.now().getYear();

             String documentDigit= document.substring(Math.max(0, document.length() -4));
			 String code= anio+"-"+type+"-"+documentDigit;

			 
		        
		        
		        if (person.getDocument() == null || person.getDocument().isEmpty()) {
		            throw new Exception("El campo document de la persona es obligatorio");
		        }
		    
		        
		       
		        entity.setCode(code);
		        entity.setCreatedAt(LocalDateTime.now());
		        entity.setCreatedBy((long) 1); // Cuando esté el logging, se debe enviar el ID del usuario con Auth
		        
		        // Guardar la entidad cliente
		        return getRepository().save(entity);
		    } catch (Exception e) {
		        // Captura la excepción
		        throw new Exception("Error al guardar la entidad: " + e.getMessage());
		    }
	}

	@Override
	public void update(Long id, Client entity) throws Exception {
		Optional<Client> opClient = getRepository().findById(id);

        if (opClient.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (opClient.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }

        Person personUpdate = entity.getPerson();
 
        Client existingClient = opClient.get();
        Person PersonExist = existingClient.getPerson();
        // Verificar si el documento ha cambiado
        if (PersonExist.getDoc…*/
	@Override
	public void update(Long id, Client entity) throws Exception {
		Optional<Client> opClient = getRepository().findById(id);

        if (opClient.isEmpty()) {
            throw new Exception("Registro no encontrado");
        } else if (opClient.get().getDeletedAt() != null) {
            throw new Exception("Registro inhabilitado");
        }

        Person personUpdate = entity.getPerson();
 
        Client existingClient = opClient.get();
        Person PersonExist = existingClient.getPerson();
        // Verificar si el documento ha cambiado
        if (PersonExist.getDocument() != entity.getPerson().getDocument() || PersonExist.getTypeDocument() != entity.getPerson().getTypeDocument()) {
            // El documento ha cambiado, genera un nuevo código
 
        	String newCode = GenerateCodeCustomer(personUpdate.getTypeDocument(), personUpdate.getDocument(), opClient.get().getCreatedAt());
            existingClient.setCode(newCode);
        }
        
      
        personService.update(personUpdate.getId(), personUpdate);
        String[] ignoreProperties = { "id", "createdAt", "deletedAt", "createdBy", "deletedBy", "code" };
        BeanUtils.copyProperties(entity, existingClient, ignoreProperties);
        existingClient.setUpdatedAt(LocalDateTime.now());
        existingClient.setUpdatedBy((long)1); 
        getRepository().save(existingClient);
    }

	@Override
	public String GenerateCodeCustomer(String typeDocument, String document, LocalDateTime date) 
			throws Exception {
			 	String documentDigit= document.substring(Math.max(0, document.length() -4));
			 	String code= date.getYear()+"-"+typeDocument+"-"+documentDigit;
				return code;
	}

	@Override
	public Client savePersonClient(Person entity) throws Exception {
		try {
		Person person = personService.save(entity);
		
		String document =  person.getDocument();
		int curreantYears = LocalDateTime.now().getYear();
		String curreantSuffixi = document.substring(Math.max(0, document.length()-4));
		
		Client entityClient = new Client();
		String codeClient=  GenerateCodeCustomer(person.getTypeDocument(), person.getDocument(), person.getCreatedAt());
		
		entityClient.setCode(codeClient);
		entityClient.setPerson(person);
		entityClient.setState(true);
		entityClient.setCreatedAt(LocalDateTime.now());
		entityClient.setCreatedBy((long)1); //Cuanto esté el loggin, se debe enviar el ID del usuario con Auth
        
		Client client = save(entityClient);
		return client;
		
	}
	
	catch (Exception e){
	throw new Exception ("Error al Guardar la entidad" + e.getMessage());	
	
	}
	}
}
