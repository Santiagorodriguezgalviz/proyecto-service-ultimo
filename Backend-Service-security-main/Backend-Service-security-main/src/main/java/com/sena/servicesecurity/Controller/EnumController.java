package com.sena.servicesecurity.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.DTO.ICityDto;
import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.Enums.MesesEnum;
import com.sena.servicesecurity.Enums.NomeclaturaEnum;
import com.sena.servicesecurity.Enums.TipoDocumentoEnum;
import com.sena.servicesecurity.IService.IEnumService;

import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/tipo_doc")
public class EnumController {
	@Autowired
	public IEnumService service;
	
	@GetMapping("/tipo_documento")
	public TipoDocumentoEnum[] TipoDocumento() {
		return service.getTipoDocumento();
	}
	
	@GetMapping("/nomeclatura")
	public NomeclaturaEnum[] Nomeclatura() {
		return service.getNomeclatura();
	}
	
	@GetMapping("/meses")
	public MesesEnum[] meses() {
		return service.getMeses();
	}
	
	
	
	
	
}
