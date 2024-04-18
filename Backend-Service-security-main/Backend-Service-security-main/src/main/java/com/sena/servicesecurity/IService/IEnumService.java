package com.sena.servicesecurity.IService;

import com.sena.servicesecurity.Enums.MesesEnum;
import com.sena.servicesecurity.Enums.NomeclaturaEnum;
import com.sena.servicesecurity.Enums.TipoDocumentoEnum;

public interface IEnumService {
	
	TipoDocumentoEnum[] getTipoDocumento();
	
	NomeclaturaEnum[] getNomeclatura();
	
	MesesEnum[] getMeses();
	
}
