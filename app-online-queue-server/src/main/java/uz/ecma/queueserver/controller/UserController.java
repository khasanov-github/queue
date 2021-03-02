package uz.ecma.queueserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqUser;
import uz.ecma.queueserver.security.CurrentUser;
import uz.ecma.queueserver.service.AuthService;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    AuthService authService;

    @GetMapping("/userMe")
    public HttpEntity<?> userMe(@CurrentUser User user) {
        return ResponseEntity.status(user == null ? 409 : 200).body(user);
//        return ResponseEntity.status(user==null?HttpStatus.CONFLICT:HttpStatus.OK).body(user);
    }

    @PutMapping("/editPassword")
    public HttpEntity<?> editModerator(@RequestBody ReqUser reqUser, @CurrentUser User user) {
            ApiResponse apiResponse = authService.editPassword(reqUser, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @PutMapping("/editInformation")
    public HttpEntity<?> editInformation(@RequestBody ReqUser reqUser, @CurrentUser User user) {
        ApiResponse apiResponse = authService.editInformation(reqUser, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }
}
