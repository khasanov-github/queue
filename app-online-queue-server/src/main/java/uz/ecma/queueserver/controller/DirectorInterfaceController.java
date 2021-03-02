package uz.ecma.queueserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.entity.enums.RoleName;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqUser;
import uz.ecma.queueserver.security.CurrentUser;
import uz.ecma.queueserver.service.DirectorInterfaceService;

import java.util.UUID;

@RestController
@RequestMapping("/api/directorInterface")
public class DirectorInterfaceController {

    @Autowired
    DirectorInterfaceService directorInterfaceService;

    @PostMapping("/{id}")
    public HttpEntity<?> addOperator(@RequestBody ReqUser reqUser, @CurrentUser User user, @PathVariable Integer id) {
        return ResponseEntity.ok(directorInterfaceService.addStaff(reqUser, user, id));
    }

    @PostMapping
    public HttpEntity<?> addReception(@RequestBody ReqUser reqUser, @CurrentUser User user) {
        return ResponseEntity.ok(directorInterfaceService.addStaff(reqUser, user, null));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editStaff(@PathVariable UUID id, @RequestBody ReqUser reqUser, @CurrentUser User user) {
        ApiResponse apiResponse = directorInterfaceService.editStaff(reqUser, user, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.RESET_CONTENT : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/getListOperator")
    public HttpEntity<?> getStaffListOperator(@CurrentUser User user) {
        return (HttpEntity<?>) directorInterfaceService.getListStaff(user, RoleName.OPERATOR);
    }

    @GetMapping("/getListReception")
    public HttpEntity<?> getStaffListReception(@CurrentUser User user) {
        ApiResponse apiResponse = new ApiResponse(true, directorInterfaceService.getListStaff(user, RoleName.RECEPTION));
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getStaff(@PathVariable UUID id) {
        return ResponseEntity.ok(directorInterfaceService.getStaff(directorInterfaceService.getUser(id)));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteStaff(@PathVariable UUID id, @CurrentUser User user) {
        return ResponseEntity.ok(directorInterfaceService.deleteStaff(id, user));
    }

    @PutMapping("/onOff/{uuid}")
    public HttpEntity<?> onOffOperator(@PathVariable UUID uuid, @RequestBody boolean active, @CurrentUser User user){
        ApiResponse apiResponse = directorInterfaceService.onOffOperator(uuid, active, user);
        return ResponseEntity.status(apiResponse.isSuccess()?202:409).body(apiResponse);
    }
}