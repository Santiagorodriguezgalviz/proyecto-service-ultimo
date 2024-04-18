package com.sena.servicesecurity.IService;

import java.util.List;

import com.sena.servicesecurity.DTO.ICountryDto;
import com.sena.servicesecurity.Entity.Country;

public interface ICountryService  extends IBaseService<Country>{
	List<ICountryDto> getListCountrys();
}
