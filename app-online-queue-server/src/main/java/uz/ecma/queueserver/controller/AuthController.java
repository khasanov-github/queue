package uz.ecma.queueserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.payload.*;
import uz.ecma.queueserver.repository.CompanyRepository;
import uz.ecma.queueserver.repository.UserRepository;
import uz.ecma.queueserver.security.CurrentUser;
import uz.ecma.queueserver.security.JwtTokenProvider;
import uz.ecma.queueserver.service.AuthService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AuthService authService;

    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody ReqLogin reqLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                reqLogin.getPhoneNumber(),
                reqLogin.getPassword()
        ));
        String token = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new ResToken(token));
    }


    @PostMapping("/register")
    public HttpEntity<?> registerUser(@RequestBody ReqUser reqUser) {
        ApiResponse response = authService.addRegister(reqUser);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }
    @PostMapping("/isHave")
    public HttpEntity<?> isHaveItem(@RequestBody ReqHave reqHave) {
        boolean existItem = false;
        switch (reqHave.getContentType()) {
            case "phoneNumber":
                existItem = userRepository.existsByPhoneNumber(reqHave.getPhoneNumber());
                break;
            case "companyTin":
                existItem = companyRepository.existsByTin(reqHave.getTin());
                break;
            case "companyName":
                existItem = companyRepository.existsByNameEqualsIgnoreCase(reqHave.getCompanyName());
                break;
            default:
                return null;
        }
        return ResponseEntity.status(existItem ? 409 : 200).body(existItem);
    }

    @GetMapping("/queueStatus/{id}")
    public HttpEntity<?> getQueueStatus(@PathVariable UUID id) {
        return ResponseEntity.ok(authService.getCompanyQueueStatus(id));
    }

    @GetMapping("/activeFalse")
    public HttpEntity<?> getCompanyActiveFalse() {
        return ResponseEntity.ok(companyRepository.getActiveFalseCompany());
    }

    @GetMapping("/company")
    public HttpEntity<?> getCompanyList(@RequestParam(value = "page", defaultValue = "0") int page,
                                        @RequestParam(value = "size", defaultValue = "10") int size,
                                        @CurrentUser User user) {
        ResPageable resPageable = authService.getList(page, size, user);
        return ResponseEntity.ok(resPageable);
    }

    @PutMapping("/editActive/{id}")
    public HttpEntity<?> editCompanyActive(@PathVariable UUID id, @RequestBody ReqCompany reqCompany) {
        ApiResponse apiResponse = authService.editCompanyActive(id, reqCompany);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }


    @PostMapping("/addModerator")
    public HttpEntity<?> addModerator(@RequestBody ReqUser reqUser, @CurrentUser User user) {
        ApiResponse apiResponse = authService.addModerator(reqUser, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getModerator(@PathVariable UUID id) {
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getModerator")));
    }

    @GetMapping("/all")
    public HttpEntity<?> getModerator() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editModerator(@PathVariable UUID id,@RequestBody ReqUser reqUser, @CurrentUser User user) {
        ApiResponse apiResponse = authService.editModerator(id,reqUser, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteModerator(@PathVariable UUID id, @CurrentUser User user) {
        ApiResponse apiResponse = authService.deleteModerator(id, user);
        return ResponseEntity.ok(apiResponse);
    }


    @GetMapping("/getComWeek")
    public HttpEntity<?> getComWeek(@RequestParam String dateWeek) throws ParseException  {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date comWeek = simpleDateFormat.parse(dateWeek);
        Integer comWeek1 = companyRepository.getComWeek(comWeek);
        String s = String.valueOf(comWeek1);
        ApiResponse apiResponse = new ApiResponse(s,true);
        return ResponseEntity.ok(apiResponse);
    }

//    @GetMapping("/company/byName")
//    public HttpEntity<?> getCompanyList(@RequestParam(value = "page", defaultValue = "0") int page,
//                                        @RequestParam(value = "size", defaultValue = "10") int size,
//                                        @RequestParam String name) {
//        ResPageable resPageable = authService.getComByName(page, size,name);
//        return ResponseEntity.ok(resPageable);
//    }

}
