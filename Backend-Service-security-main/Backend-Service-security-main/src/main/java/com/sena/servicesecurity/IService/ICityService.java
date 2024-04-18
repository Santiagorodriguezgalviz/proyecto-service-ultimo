package com.sena.servicesecurity.IService;

import java.util.List;

import com.sena.servicesecurity.DTO.ICityDto;
import com.sena.servicesecurity.Entity.City;

public interface ICityService extends IBaseService<City> {
	List<ICityDto> GetListCitys();
}
