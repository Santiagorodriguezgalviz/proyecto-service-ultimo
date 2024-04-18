package com.sena.servicesecurity.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.DTO.IDepartmentDto;
import com.sena.servicesecurity.Entity.Department;
 @Repository
public interface IDepartmentRepository extends IBaseRepository<Department, Long>{

	 
	 @Query(value ="SELECT \r\n"
	 		+ "    `department`.`id`,\r\n"
	 		+ "    `department`.`created_at`,\r\n"
	 		+ "    `department`.`created_by`,\r\n"
	 		+ "    `department`.`deleted_at`,\r\n"
	 		+ "    `department`.`deleted_by`,\r\n"
	 		+ "    `department`.`state`,\r\n"
	 		+ "    `department`.`updated_at`,\r\n"
	 		+ "    `department`.`updated_by`,\r\n"
	 		+ "    `department`.`code` AS code_department,\r\n"
	 		+ "    `department`.`name` AS name_department,\r\n"
	 		+ "    `c`.`name` AS country\r\n"
	 		+ "FROM \r\n"
	 		+ "    `seguridad`.`department`\r\n"
	 		+ "INNER JOIN \r\n"
	 		+ "    `country` AS c ON `department`.`country_id` = `c`.`id`;\r\n"
	 		+ "",nativeQuery = true)
	 List<IDepartmentDto> getListDepartaments();
}
