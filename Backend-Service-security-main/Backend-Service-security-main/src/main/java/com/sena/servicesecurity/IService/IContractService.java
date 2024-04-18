package com.sena.servicesecurity.IService;

import java.util.List;

import com.sena.servicesecurity.DTO.IContractDto;
import com.sena.servicesecurity.Entity.Contract;

public interface IContractService extends IBaseService<Contract>{

	List<IContractDto> GetListContract();
}
