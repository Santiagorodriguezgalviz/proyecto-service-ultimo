package com.sena.servicesecurity.IService;

import java.util.List;

import com.sena.servicesecurity.DTO.IDepartmentDto;
import com.sena.servicesecurity.Entity.Department;

public interface IDepartmentService extends IBaseService<Department> {
	 List<IDepartmentDto> getListDepartaments();
}
