package com.sena.servicesecurity.Service;

import org.springframework.stereotype.Service;

import com.sena.servicesecurity.Enums.MesesEnum;
import com.sena.servicesecurity.Enums.NomeclaturaEnum;
import com.sena.servicesecurity.Enums.TipoDocumentoEnum;
import com.sena.servicesecurity.IService.IEnumService;

@Service
public class EnumService implements IEnumService{

	@Override
	public TipoDocumentoEnum[] getTipoDocumento() {
		return TipoDocumentoEnum.values();
	}

	@Override
	public NomeclaturaEnum[] getNomeclatura() {
		// TODO Auto-generated method stub
		return NomeclaturaEnum.values();
	}

	@Override
	public MesesEnum[] getMeses() {
		// TODO Auto-generated method stub
		return MesesEnum.values();
	}
	
	

	
}
