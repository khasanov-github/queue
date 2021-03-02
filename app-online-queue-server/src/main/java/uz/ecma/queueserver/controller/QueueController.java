package uz.ecma.queueserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.payload.*;
import uz.ecma.queueserver.security.CurrentUser;
import uz.ecma.queueserver.service.QueueService;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/queue")
public class
QueueController {
    @Autowired
    QueueService queueService;

    @GetMapping("/list/{directionId}")
    public HttpEntity<?> getQueueByDirection(
            @PathVariable Integer directionId,
            @RequestParam(value = "status", defaultValue = "DEFAULT") String status,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        ResPageable resPageable = queueService.getQueuesByDirection(directionId, size, status);
        return ResponseEntity.ok(resPageable);
    }

    @PostMapping("/setStatus")
    public HttpEntity<?> setStatus(@RequestBody ReqStatus request, @CurrentUser User user) {
        ApiResponse response = queueService.setStatus(request.getQueueId(), request.getStatus(), user);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(response);
    }

    @PostMapping
    public HttpEntity<?> addQueue(@RequestBody ReqQueue request, @CurrentUser User user) {
        ApiResponse response = queueService.addQueue(request, user);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }

    @GetMapping
    public HttpEntity<?> getQueue(@CurrentUser User user) {
        ResQueue queue = queueService.getQueue(user);
        return ResponseEntity.ok(queue);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getCounts(@PathVariable UUID id){
        final ApiResponse countsInfo = queueService.getCountsInfo(id);
        return ResponseEntity.status(countsInfo.isSuccess()?200:409).body(countsInfo);
    }


}
