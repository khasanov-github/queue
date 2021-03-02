package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.OperatorDirection;
import uz.ecma.queueserver.entity.Queue;
import uz.ecma.queueserver.entity.Role;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.entity.enums.QueueStatus;
import uz.ecma.queueserver.entity.enums.RoleName;
import uz.ecma.queueserver.payload.*;
import uz.ecma.queueserver.repository.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@EnableScheduling
public class QueueService {
    @Autowired
    QueueRepository queueRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DirectionRepository directionRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    OperatorDirectionRepository operatorDirectionRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CheckRole checkRole;

    public ApiResponse addQueue(ReqQueue request, User user) {

        if (!userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            User newUser = new User();
            newUser.setPhoneNumber(request.getPhoneNumber());
            newUser.setRoles(roleRepository.findAllByRoleNameIn(new ArrayList<>(Collections.singletonList(RoleName.USER))));
            newUser.setPassword(passwordEncoder.encode("123"));
            userRepository.save(newUser);
            return getQueue(request, newUser);
        }
        return getQueue(request, user);

    }

    public ApiResponse getQueue(ReqQueue request, User user) {
        if (isTrue(RoleName.USER, user) || isTrue(RoleName.RECEPTION, user) || user.isEnabled()) {
            Queue newQueue = new Queue();
            newQueue.setStartTime(new Timestamp(new Date().getTime()));
            newQueue.setStatus(QueueStatus.WAITING);
            newQueue.setClient(user);
            newQueue.setDirection(directionRepository.findById(request.getDirectionId()).orElseThrow(() -> new ResourceNotFoundException("getDirection")));
            newQueue.setQueueNumber((queueRepository.getCountQueue(request.getDirectionId(), "WAITING")) + 1);
            queueRepository.save(newQueue);
            Queue getQueue = queueRepository.findByDirectionIdAndStatusAndClient_PhoneNumber(request.getDirectionId(), QueueStatus.WAITING, request.getPhoneNumber()).orElseThrow(() -> new ResourceNotFoundException("getQueue"));
            return new ApiResponse(
                    "Navbat muvaffaqiyatli olindi",
                    "Queued successfully",
                    "В очереди успешно",
                    "Навбат муваффакиятли олинди",
                    true,
                    new ResQueue(
                            getQueue.getId(),
                            getQueue.getClient().getPhoneNumber(),
                            getDurationTime(request.getDirectionId()),
                            queueRepository.getCountOperator(request.getDirectionId()),
                            getQueue.getDirection().getId(),
                            null,
                            getQueue.getStatus().toString(),
                            getQueue.getQueueNumber(),
                            getProbablyTime(request.getDirectionId()),
                            null,
                            null
                    ));
        }
        return new ApiResponse(
                "Sizda bunday huquq yo'q",
                "",
                "",
                "",
                false
        );
    }

    public ResQueue getQueue(User user) {
        if (isTrue(RoleName.OPERATOR, user) || user.isEnabled()) {
            OperatorDirection direction = operatorDirectionRepository.getDirectionId(user.getId());
            Integer directionId = direction.getDirection().getId();
            Integer waiting = queueRepository.getCountQueue(directionId, "WAITING");
            String durationTime = getDurationTime(directionId);
            if (queueRepository.existsByStatus(QueueStatus.WAITING)) {
                Integer lastQueueNumber = (queueRepository.getLastQueue(directionId, "WAITING")).getQueueNumber();
                return new ResQueue(
                        directionId,
                        waiting,
                        durationTime,
                        lastQueueNumber
                );
            }
            return new ResQueue(
                    directionId,
                    waiting,
                    durationTime,
                    0
            );
        }
        return new ResQueue();
    }

    public ResPageable getQueuesByDirection(Integer directionId, Integer size, String status) {

        switch (status.toUpperCase()) {
            case "WAITING":
                return getPageable("WAITING", size, directionId);
            case "DELAY":
                return getPageable("DELAY", size, directionId);
            case "CLOSED":
                return getPageable("CLOSED", size, directionId);
            case "REJECT":
                return getPageable("REJECT", size, directionId);
            case "CANCELED":
                return getPageable("CANCELED", size, directionId);
            default:
                return new ResPageable();
        }
    }

    public ResPageable getPageable(String status, Integer size, Integer directionId) {

        ResPageable resPageable = new ResPageable();
        Page<Queue> queue = queueRepository.findAllByDirection(directionId, status, PageRequest.of(0, size));
        resPageable.setPage(0);
        resPageable.setSize(size);
        resPageable.setTotalElements(queue.getTotalElements());
        resPageable.setTotalPages(queue.getTotalPages());
        List<ResQueue> resQueues = new ArrayList<>();
        List<Queue> content = queue.getContent();
        for (Queue oneQueue : content) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("d MMM HH:mm:ss");
            resQueues.add(
                    new ResQueue(
                            oneQueue.getId(),
                            oneQueue.getClient().getPhoneNumber(),
                            getDurationTime(directionId),
                            queueRepository.getCountOperator(directionId),
                            oneQueue.getDirection().getId(),
                            oneQueue.getOperator().getId(),
                            status,
                            oneQueue.getQueueNumber(),
                            null,
                            simpleDateFormat.format(oneQueue.getStartTime()),
                            simpleDateFormat.format((oneQueue.getFinishTime()) == null ? new Date() : oneQueue.getFinishTime())
                    ));
        }
        resPageable.setObject(resQueues);
        return resPageable;

    }

    public ApiResponse setStatus(UUID queueId, String status, User user) {

        if (isTrue(RoleName.OPERATOR, user) || user.isEnabled()) {
            Queue queue = queueRepository.findById(queueId).orElseThrow(() -> new ResourceNotFoundException("getQueue"));
            switch (status.toUpperCase()) {
                case "DELAY":
                    if (queue.getStatus().equals(QueueStatus.WAITING)) {
                        queue.setStartTime(new Timestamp(new Date().getTime()));
                        queue.setStatus(QueueStatus.DELAY);
                        queueRepository.save(queue);
                        return
                                new ApiResponse(
                                        "Navbat kechiktirildi",
                                        "Delay the queue",
                                        "Задержать очередь",
                                        "Навбат кечиктирилди",
                                        true
                                );
                    } else {
                        return
                                new ApiResponse(
                                        "Xatolik",
                                        "Error",
                                        "Ошибка",
                                        "Хатолик",
                                        false
                                );
                    }
                case "ACCEPTED":
                    if (queue.getStatus().equals(QueueStatus.WAITING) || queue.getStatus().equals(QueueStatus.DELAY)) {
                        queue.setStatus(QueueStatus.ACCEPTED);
                        queue.setStartTime(new Timestamp(new Date().getTime()));
                        queue.setOperator(user);
                        queueRepository.save(queue);
                        return
                                new ApiResponse(
                                        "Navbat tasdiqlandi",
                                        "Confirm Queue",
                                        "Подтвердить очередь",
                                        "Навбат тасдикланди",
                                        true
                                );
                    } else {
                        return
                                new ApiResponse(
                                        "Xatolik",
                                        "Error",
                                        "Ошибка",
                                        "Хатолик",
                                        false
                                );
                    }
                case "CLOSED":
                    if (queue.getStatus().equals(QueueStatus.ACCEPTED)) {
                        queue.setStatus(QueueStatus.CLOSED);
                        queue.setFinishTime(new Timestamp(new Date().getTime()));
                        queue.setOperator(user);
                        queueRepository.save(queue);
                        return
                                new ApiResponse(
                                        "Navbat yakunlandi",
                                        "Complete the queue",
                                        "Завершить очередь",
                                        "Навбат якунланди",
                                        true
                                );
                    } else {
                        return
                                new ApiResponse(
                                        "Xatolik",
                                        "Error",
                                        "Ошибка",
                                        "Хатолик",
                                        false
                                );
                    }
                default:
                    return
                            new ApiResponse(
                                    "Xatolik",
                                    "Error",
                                    "Ошибка",
                                    "Хатолик",
                                    false
                            );
            }
        }
        return new ApiResponse();
    }

    public String getDurationTime(Integer directionId) {
        Integer time = getTime(directionId);
        if (time > 60) {
            int hours = time / 60;
            int min = time % 60;
            return hours + " hours " + min + " min";
        }
        return time + " min";
    }

    public String getProbablyTime(Integer directionId) {
        Integer waiting = queueRepository.getCountQueue(directionId, "WAITING");
        Integer time = getTime(directionId);

        int probablyTime = (waiting - 1) * time;
        if (probablyTime >= 60) {
            int hours = probablyTime / 60;
            int min = probablyTime % 60;

            if (hours >= 24) {
                int day = hours / 24;
                return day + " day " + hours + " hours " + min + " min";
            }
            return hours + " hours " + min + " min";
        }
        return probablyTime + " min";
    }

    public Integer getTime(Integer directionId) {
        List<Queue> queues = queueRepository.findAllByDirectionLimit(directionId, "CLOSED");
        int count = 0;
        int sum = 0;
        if (queues.isEmpty()) {
            return 0;
        }
        for (Queue queue : queues) {
            Integer hours = calculateTime(queue, "HH");
            if (hours > 0) {
                Integer min = calculateTime(queue, "mm");
                sum = sum + min + (hours * 60);
                count++;
            }
            Integer min = calculateTime(queue, "mm");
            sum = sum + min;
            count++;
        }
        return sum / count;
    }

    public Integer calculateTime(Queue queue, String format) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);

        LocalDateTime start = queue.getStartTime().toLocalDateTime();
        int startTime = Integer.parseInt(start.format(formatter));

        LocalDateTime finish = queue.getFinishTime().toLocalDateTime();
        int finishTime = Integer.parseInt(finish.format(formatter));

        if (finishTime >= startTime) {
            return finishTime - startTime;
        }
        return (60 - startTime) + finishTime;
    }

    public boolean isTrue(RoleName roleName, User user) {
        boolean isTrue = false;
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == roleName) {
                isTrue = true;
                break;
            }
        }
        return isTrue;
    }

    public ApiResponse getCountsInfo(UUID companyId) {
        List<Integer> allDirectionIdByCompany = directionRepository.findAllDirectionIdByCompany(companyId);
        List<ResQueueInfo> response = new ArrayList<>();
        allDirectionIdByCompany.forEach(integer -> {
            response.add(new ResQueueInfo(
                    integer,
                    queueRepository.getCountQueue(integer, "WAITING"),
                    queueRepository.getLastQueue(integer, "ACCEPTED"),
                    getDurationTime(integer)));
                }
        );
        return new ApiResponse(true, response);
    }

    @Scheduled(fixedDelay = 1000 * 60 * 3)
    public void toReject() {
        List<Queue> delay = queueRepository.findAllByStatus("DELAY");
        for (Queue queue : delay) {
            Timestamp startTime = queue.getStartTime();
            Date date = new Date(startTime.getTime() + 300000 * 6);

            if (date.getTime() < new Date().getTime()) {
                queue.setStatus(QueueStatus.REJECT);
                queue.setFinishTime(new Timestamp(new Date().getTime()));
                queueRepository.save(queue);
            }
        }
    }
}