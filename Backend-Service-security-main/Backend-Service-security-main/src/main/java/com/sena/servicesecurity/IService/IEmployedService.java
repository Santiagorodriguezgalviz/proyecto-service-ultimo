package com.sena.servicesecurity.IService;

import java.util.List;

import com.sena.servicesecurity.DTO.IEmployedDto;
import com.sena.servicesecurity.Entity.Employed;

public interface IEmployedService extends IBaseService<Employed>{

	List<IEmployedDto> getListEmployee();
}
