package com.sena.servicesecurity.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.DTO.IEmployedDto;
import com.sena.servicesecurity.Entity.Employed;

@Repository
public interface IEmployedRepository extends IBaseRepository<Employed, Long>{

	@Query( value = "SELECT \r\n"
			+ "em.code,\r\n"
			+ "concat(p.first_name,'  ',p.last_name) as person,\r\n"
			+ "ps.name AS position,\r\n"
			+ "cm.rs AS company\r\n"
			+ "FROM employed AS em\r\n"
			+ "INNER JOIN company AS cm ON em.company_id = cm.id\r\n"
			+ "INNER JOIN person AS p ON em.person_id = p.id\r\n"
			+ "INNER JOIN position AS ps ON em.position_id = ps.id", nativeQuery = true)
	List<IEmployedDto> getListEmployee();
}
