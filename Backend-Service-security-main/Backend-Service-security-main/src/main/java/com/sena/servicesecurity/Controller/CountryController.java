package com.sena.servicesecurity.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.DTO.ICountryDto;
import com.sena.servicesecurity.DTO.IRoleDto;
import com.sena.servicesecurity.Entity.Country;
import com.sena.servicesecurity.IService.ICountryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/country")
public class CountryController extends ABaseController<Country,ICountryService>{
	public CountryController(ICountryService service) {
        super(service, "Country");
    }

	@GetMapping("/list")
    public ResponseEntity<ApiResponseDto<List<ICountryDto>>> show() {
        try {
            List<ICountryDto> entity = service.getListCountrys();
            return ResponseEntity.ok(new ApiResponseDto<List<ICountryDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<ICountryDto>>(e.getMessage(), null, false));
        }
    }
	
}
