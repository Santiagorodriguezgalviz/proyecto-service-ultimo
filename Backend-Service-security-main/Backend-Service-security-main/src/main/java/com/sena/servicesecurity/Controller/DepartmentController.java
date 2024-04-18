package com.sena.servicesecurity.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.DTO.IDepartmentDto;
import com.sena.servicesecurity.Entity.Department;
import com.sena.servicesecurity.IService.IDepartmentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/department")
public class DepartmentController extends ABaseController<Department,IDepartmentService>{
	public DepartmentController(IDepartmentService service) {
        super(service, "Department");
    }
	

	@GetMapping("/list")
    public ResponseEntity<ApiResponseDto<List<IDepartmentDto>>> show() {
        try {
            List<IDepartmentDto> entity = service.getListDepartaments();
            return ResponseEntity.ok(new ApiResponseDto<List<IDepartmentDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<IDepartmentDto>>(e.getMessage(), null, false));
        }
    }
}
