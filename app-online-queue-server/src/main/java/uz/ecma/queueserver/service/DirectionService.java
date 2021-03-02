package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.Direction;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.exception.BadRequestException;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqDirection;
import uz.ecma.queueserver.repository.CompanyRepository;
import uz.ecma.queueserver.repository.DirectionRepository;
import uz.ecma.queueserver.repository.RoleRepository;
import uz.ecma.queueserver.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class DirectionService {
    @Autowired
    DirectionRepository directionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CheckRole checkRole;

    public ApiResponse addDirection(ReqDirection reqDirection, User user) {
        try {
            if (reqDirection.getNameEn().isEmpty()||reqDirection.getNameRu().isEmpty()||reqDirection.getNameUzl().isEmpty()||reqDirection.getNameUzk().isEmpty()){
                return new ApiResponse(
                        "Malumot yo`q",
                        "Information is not be empty",
                        "Информация не пуста",
                        "Маълумот ёк", false
                );
            }
            if (checkRole.isDirector(user)) {
                Optional<Direction> byCompanyAndNameUzl = directionRepository
                        .findByCompanyAndNameUzlEqualsIgnoreCaseOrNameUzkEqualsIgnoreCaseOrNameRuEqualsIgnoreCaseOrNameEnEqualsIgnoreCase(user.getCompany(), reqDirection.getNameUzl(), reqDirection.getNameUzk(), reqDirection.getNameRu(), reqDirection.getNameEn());
                if (byCompanyAndNameUzl.isPresent()) {
                    return new ApiResponse(
                            "Siz allaqachon yaratib bo`lgansiz",
                            "You have already created",
                            "Вы уже создали",
                            "Сиз аллақачон яратиб бўлгансиз", false
                    );
                }
                Direction direction = new Direction();
                direction.setCompany(user.getCompany());
                Direction makeDirection = makeDirection(direction, reqDirection);
                directionRepository.save(makeDirection);
                return new ApiResponse(
                        "Muvaffaqiyatli saqlandi",
                        "Successfully saved",
                        "Успешно сохранено",
                        "Муваффақиятли сақланди",
                        true);
            }
            return new ApiResponse(
                    "Siz yarata olmaysiz",
                    "You can not create",
                    "ты не можешь создать",
                    "Сиз ярата олмайсиз", false
            );
        } catch (Exception e) {
            return new ApiResponse(
                    "Xato",
                    "Error",
                    "Ошибка",
                    "Хато",
                    false);
        }
    }

    public ApiResponse editDirection(Integer id, ReqDirection reqDirection, User user) {
        try {
            if (reqDirection.getNameEn().isEmpty()||reqDirection.getNameRu().isEmpty()||reqDirection.getNameUzl().isEmpty()||reqDirection.getNameUzk().isEmpty()){
                return new ApiResponse(
                        "Malumot yo`q",
                        "Information is not be empty",
                        "Информация не пуста",
                        "Маълумот ёк", false
                );
            }
            if (checkRole.isDirector(user)) {
                Optional<Direction> byCompanyAndName = directionRepository
                        .findByCompanyAndNameUzlEqualsIgnoreCaseOrNameUzkEqualsIgnoreCaseOrNameRuEqualsIgnoreCaseOrNameEnEqualsIgnoreCase(user.getCompany(), reqDirection.getNameUzl(), reqDirection.getNameUzk(), reqDirection.getNameRu(), reqDirection.getNameEn());
                    if (!byCompanyAndName.isPresent() || byCompanyAndName.get().getId().equals(id)) {
                        Direction makeDirection = makeDirection(
                                directionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getDirection")), reqDirection);
                        directionRepository.save(makeDirection);
                        return new ApiResponse(
                                "Muvaffaqiyatli tahrirlandi",
                                "Successfully edited",
                                "Успешно отредактировано",
                                "Муваффақиятли таҳрирланди", true
                        );
                    }
                return new ApiResponse(
                        "Siz allaqachon yaratib bo`lgansiz",
                        "You have already created",
                        "Вы уже создали",
                        "Сиз аллақачон яратиб бўлгансиз", false
                );
            }
            return new ApiResponse(
                    "Siz tahrirlay olmaysiz",
                    "You can not edit",
                    "Вы не можете редактировать",
                    "Сиз таҳрирлай олмайсиз", false
            );
        } catch (
                Exception e) {
            return new ApiResponse(
                    "Xato",
                    "Error",
                    "Ошибка",
                    "Хато",
                    false);
        }
    }

    public ApiResponse deleteDirection(Integer id, User user) {
        try {
            if (checkRole.isDirector(user)) {
                directionRepository.deleteById(id);
                return new ApiResponse(
                        "Muvaffaqiyatli o`chirildi",
                        "Successfully deleted",
                        "Успешно удален",
                        "Муваффақиятли ўчирилди", true
                );
            }
            return new ApiResponse(
                    "Siz o`chira olmaysiz",
                    "You can not delete",
                    "Вы не можете удалить",
                    "Сиз ўчира олмайсиз", false
            );
        } catch (Exception e) {
            return new ApiResponse(
                    "Xato",
                    "Error",
                    "Ошибка",
                    "Хато",
                    false);
        }
    }

    public ApiResponse byCompany(UUID id) {
        return new ApiResponse(true, directionRepository.findAllByCompanyId(id));
    }

    private Direction makeDirection(Direction direction, ReqDirection reqDirection){
        direction.setNameUzl(reqDirection.getNameUzl());
        direction.setNameUzk(reqDirection.getNameUzk());
        direction.setNameEn(reqDirection.getNameEn());
        direction.setNameRu(reqDirection.getNameRu());
        if (reqDirection.isAutoTime() && (reqDirection.getTime() == null || reqDirection.getTime() <= 0)) {
            throw new BadRequestException("Vaqtni kiriting");
        }
        direction.setAutoTime(reqDirection.isAutoTime());
        direction.setTime(reqDirection.getTime());
        return direction;
    }
}
