package com.sena.servicesecurity.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.DTO.ICityDto;
import com.sena.servicesecurity.Entity.City;

@Repository
public interface ICityRepository extends IBaseRepository<City, Long> {

	@Query(value = "	SELECT `city`.`id`,\r\n"
			+ "			    `city`.`created_at`,\r\n"
			+ "			    `city`.`created_by`,\r\n"
			+ "			    `city`.`deleted_at`,\r\n"
			+ "			    `city`.`deleted_by`,\r\n"
			+ "			    `city`.`state`,\r\n"
			+ "			    `city`.`updated_at`,\r\n"
			+ "			    `city`.`updated_by`,\r\n"
			+ "			    `city`.`code` AS code_city, \r\n"
			+ "			    `city`.`name` AS name_city,\r\n"
			+ "			\r\n"
			+ "			    `d`.`name` AS department\r\n"
			+ "			    FROM `seguridad`.`city`\r\n"
			+ "			inner join department AS d on city.department_id =d.id",nativeQuery = true)
		List<ICityDto> GetListCitys();
	
	
}
