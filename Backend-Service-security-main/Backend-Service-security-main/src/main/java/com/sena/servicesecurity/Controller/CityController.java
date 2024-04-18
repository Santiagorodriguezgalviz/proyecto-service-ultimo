package com.sena.servicesecurity.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.DTO.ICityDto;
import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.Entity.City;
import com.sena.servicesecurity.IService.ICityService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/city")
public class CityController extends ABaseController<City,ICityService>{
	
	public CityController(ICityService service) {
        super(service, "City");
    }

	@GetMapping("/list")
    public ResponseEntity<ApiResponseDto<List<ICityDto>>> show() {
        try {
            List<ICityDto> entity = service.GetListCitys();
            return ResponseEntity.ok(new ApiResponseDto<List<ICityDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<ICityDto>>(e.getMessage(), null, false));
        }
    }

}
