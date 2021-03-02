package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.Role;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.entity.WorkTime;
import uz.ecma.queueserver.exception.BadRequestException;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqWorkTime;
import uz.ecma.queueserver.payload.ResWorkTime;
import uz.ecma.queueserver.repository.CompanyRepository;
import uz.ecma.queueserver.repository.DirectionRepository;
import uz.ecma.queueserver.repository.WorkTimeRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static uz.ecma.queueserver.entity.enums.RoleName.DIRECTOR;

@Service
public class WorkTimeService {
    @Autowired
    WorkTimeRepository workTimeRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    DirectionRepository directionRepository;
    @Autowired
    DirectionService directionService;


    public ApiResponse addWorkTime(ReqWorkTime reqWorkTime, User user) {
        try {
            boolean a = false;
            for (Role role : user.getRoles()) {
                if (role.getRoleName() == DIRECTOR) {
                    a = true;
                    break;
                }
            }
            if (a) {
                WorkTime workTime = new WorkTime();
                workTime.setStartTime((reqWorkTime.getStartTime() == null) ? ("09:00") : reqWorkTime.getStartTime());
                workTime.setFinishTime((reqWorkTime.getFinishTime() == null) ? ("18:00") : reqWorkTime.getFinishTime());
                if (reqWorkTime.isLunchActive()) {
                    workTime.setLunchActive(reqWorkTime.isLunchActive());
                    workTime.setLunchStartTime((reqWorkTime.getLunchStartTime() == null) ? ("13:00") : reqWorkTime.getLunchStartTime());
                    workTime.setLunchFinishTime((reqWorkTime.getLunchFinishTime() == null) ? ("14:00") : reqWorkTime.getLunchFinishTime());
                } else {
                    workTime.setLunchActive(reqWorkTime.isLunchActive());
                    workTime.setLunchStartTime(null);
                    workTime.setLunchFinishTime(null);
                }
                if (reqWorkTime.getDirectionId() != null) {
                    workTime.setDirection(directionRepository.findById(reqWorkTime.getDirectionId()).orElseThrow(() -> new ResourceNotFoundException("getDirection")));
                }

                workTime.setCompany(companyRepository.findById(user.getCompany().getId()).orElseThrow(() -> new ResourceNotFoundException("getCompany")));

                workTime.setActive(reqWorkTime.isActive());
                workTimeRepository.save(workTime);
                return new ApiResponse("Ish vaqti saqlandi", "\n" +
                        "Hours saved", "Часы сохранены", "Ish vaqti saqlandi", true);
            }
            return new ApiResponse("Sizda bunday role yo'q", "You do not have time ", "У тебя нет времени", "Sizda ish vaqti yuq", false);

        } catch (Exception e) {
            return new ApiResponse("Xatolik", "\n" +
                    "Error", "ошибка", "xatolik", false);
        }
    }

    public ApiResponse editWorkTime(UUID id, ReqWorkTime reqWorkTime, User user) {
        try {
            boolean a = false;
            for (Role role : user.getRoles()) {
                if (role.getRoleName() == DIRECTOR) {
                    a = true;
                    break;
                }
            }
            if (a) {
                Optional<WorkTime> optionalWorkTime = workTimeRepository.findById(id);
                if (optionalWorkTime.isPresent()) {
                    if (reqWorkTime.isActive()) {
                        WorkTime workTime = new WorkTime();
                        workTime.setStartTime((reqWorkTime.getStartTime() == null) ? (" 09:00") : reqWorkTime.getStartTime());
                        workTime.setFinishTime((reqWorkTime.getFinishTime() == null) ? (" 18:00") : reqWorkTime.getFinishTime());
                        if (reqWorkTime.isLunchActive()) {
                            workTime.setLunchActive(reqWorkTime.isLunchActive());
                            workTime.setLunchStartTime((reqWorkTime.getLunchStartTime() == null) ? (" 13:00") : reqWorkTime.getLunchStartTime());
                            workTime.setLunchFinishTime((reqWorkTime.getLunchFinishTime() == null) ? (" 14:00") : reqWorkTime.getLunchFinishTime());
                        } else {
                            workTime.setLunchActive(reqWorkTime.isLunchActive());
                            workTime.setLunchStartTime(null);
                            workTime.setLunchFinishTime(null);
                        }
                        if (reqWorkTime.getCompanyId() == null || reqWorkTime.getDirectionId() == null) {
                            throw new BadRequestException("Company bilan Direction bush  bo'lishi mumkin emas");
                        }
                        if (reqWorkTime.getCompanyId() == null) {
                            workTime.setDirection(directionRepository.findById(reqWorkTime.getDirectionId()).orElseThrow(() -> new ResourceNotFoundException("getDirection")));
                        }

                        if (reqWorkTime.getDirectionId() == null) {
                            workTime.setCompany(companyRepository.findById(reqWorkTime.getCompanyId()).orElseThrow(() -> new ResourceNotFoundException("getCompany")));
                        }
                        workTime.setActive(reqWorkTime.isActive());
                        workTimeRepository.save(workTime);
                        return new ApiResponse(
                                "ish vaqti tahrirlandi",
                                "Edited",
                                "Изменить время",
                                "Ish vaqti tahrirlandi",
                                true);
                    }
                    return new ApiResponse("Sizda ish vaqti yuq", "You do not have time ", "У тебя нет времени", "Sizda ish vaqti yuq", false);
                }
                return new ApiResponse("Bunday ish vaqti mavjud emas", "No such hours are available", "\n" +
                        "Нет таких часов", "Bunday ish vaqti mavjud emas", false);
            }
            return new ApiResponse("Sizda bunday role yo'q", "You do not have time ", "У тебя нет времени", "Sizda ish vaqti yuq", false);
        } catch (Exception e) {
            return new ApiResponse("Xatolik", "\n" +
                    "Error", "ошибка", "xatolik", false);
        }
    }

    public ResWorkTime getWorkTime(WorkTime workTime) {
        return new ResWorkTime(
                workTime.getId(),
                workTime.getStartTime(),
                workTime.getFinishTime(),
                workTime.isLunchActive(),
                workTime.getLunchStartTime(),
                workTime.getLunchFinishTime(),
                workTime.getCompany() == null ? null : companyRepository.findById(workTime.getCompany().getId()).orElseThrow(() -> new ResourceNotFoundException("getCompany")),
                workTime.getDirection() == null ? null : directionRepository.findById(workTime.getDirection().getId()).orElseThrow(() -> new ResourceNotFoundException("getDirection")),
                workTime.isActive()
        );
    }

    public List<ResWorkTime> getWorkTimeList(UUID company_id) {
        return workTimeRepository.findAllByDirection_CompanyId(company_id).stream().map(this::getWorkTime).collect(Collectors.toList());
    }
}
