package uz.ecma.queueserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.ecma.queueserver.entity.Company;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqCompany;
import uz.ecma.queueserver.payload.ReqUser;
import uz.ecma.queueserver.repository.CompanyRepository;
import uz.ecma.queueserver.security.CurrentUser;
import uz.ecma.queueserver.service.CompanyService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;
    @Autowired
    CompanyRepository companyRepository;

    @PostMapping
    public HttpEntity<?> addCompany(@RequestBody ReqCompany reqCompany) {
        ApiResponse apiResponse = companyService.addCompany(reqCompany);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getCompany(@PathVariable UUID id) {
        Company byId = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("asd"));
        return ResponseEntity.ok(companyService.getCompany(byId));
    }

    @GetMapping("getCompanyForAdmin/{id}")
    public HttpEntity<?> getCompanyForAdmin(@PathVariable UUID id, @CurrentUser User user) {
        Company byId = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("asd"));
        return ResponseEntity.ok(companyService.getCompanyForAdmin(byId, user));
    }

    @GetMapping("/byCategory/{id}")
    public HttpEntity<?> getCompanyListByCategory(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                  @RequestParam(value = "size", defaultValue = "6") Integer size, @PathVariable Integer id) {
        return ResponseEntity.ok(companyService.getCompanyListByCategory(page, size, id));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editCompany(@PathVariable UUID id, @RequestBody ReqCompany reqCompany, @CurrentUser User user) {
        ApiResponse apiResponse = companyService.editCompany(id, reqCompany, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/new")
    public HttpEntity<?> getNewCompanies(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                         @RequestParam(value = "size", defaultValue = "5") Integer size) {
        return ResponseEntity.ok(companyService.getNewCompanies(page, size));
    }

    @GetMapping("/category")
    public HttpEntity<?> getCategories() {
        return ResponseEntity.ok(companyService.getCategories());
    }

    @GetMapping("/search/{name}")
    public HttpEntity<?> searchCompany(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                       @RequestParam(value = "size", defaultValue = "10") Integer size, @PathVariable String name) {

        return ResponseEntity.ok(companyService.getSearchedCompanies(page, size, name));
    }
}
