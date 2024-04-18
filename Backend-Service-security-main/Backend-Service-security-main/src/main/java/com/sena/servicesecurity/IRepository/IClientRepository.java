package com.sena.servicesecurity.IRepository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.DTO.IClientDto;
import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.Entity.Client;
import com.sena.servicesecurity.IRepository.IBaseRepository;

@Repository
public interface IClientRepository extends IBaseRepository<Client,Long>{

	@Query(value = "SELECT "
	        + "c.id, "
	        + "c.code, "
	        + "CONCAT(p.first_name, ' ', p.last_name) AS name, "
	        + "p.type_document, "
	        + "p.document, "
	        + "p.id AS person_id, "
	        + "c.state "
	        + "FROM "
	        + "client c "
	        + "INNER JOIN person AS p ON p.id = c.person_id "
	        + "WHERE "
	        + "c.deleted_at IS NULL", nativeQuery = true)
	List<IClientDto> getList();
	
	@Query(value = " SELECT  "
			+ " type_document, "
			+ " document "
			+ "	FROM  "
			+ "	person "
			+ "	WHERE  "
			+ " id = :id", nativeQuery = true)
	IPersonDto getDocument(@Param("id") Long id);
	
    @Query("SELECT c FROM Client c WHERE c.person.id = :personId")
    Optional<Client> findByPersonId(@Param("personId") Long personId);
}
