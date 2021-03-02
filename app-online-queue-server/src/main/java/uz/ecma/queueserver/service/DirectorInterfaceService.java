package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import uz.ecma.queueserver.entity.OperatorDirection;
import uz.ecma.queueserver.entity.User;
import uz.ecma.queueserver.entity.enums.RoleName;
import uz.ecma.queueserver.exception.BadRequestException;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.payload.ReqUser;
import uz.ecma.queueserver.payload.ResUser;
import uz.ecma.queueserver.repository.DirectionRepository;
import uz.ecma.queueserver.repository.OperatorDirectionRepository;
import uz.ecma.queueserver.repository.RoleRepository;
import uz.ecma.queueserver.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class DirectorInterfaceService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OperatorDirectionRepository operatorDirectionRepository;

    @Autowired
    DirectionRepository directionRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CheckRole checkRole;

    @Autowired
    PasswordEncoder passwordEncoder;

    public ApiResponse addStaff(ReqUser reqUser, User user, Integer directionId) {
        User currentUser = getUser(user.getId());
        if (!reqUser.getPassword().equals(reqUser.getPrePassword())) {
            return new ApiResponse(
                    "Parollar nomutanosib",
                    "Passwords is not same",
                    "Пароли не совпадают",
                    "Пароллар номутаносиб", false
            );
        }
        if (checkRole.isDirector(currentUser)) {
            if (!userRepository.findByPhoneNumber(reqUser.getPhoneNumber()).isPresent()) {
                if (reqUser.getFirstName() != null &&
                        reqUser.getLastName() != null &&
                        reqUser.getPassword() != null &&
                        reqUser.getRole() != null) {
                    User newStaff = new User(
                            reqUser.getFirstName(),
                            reqUser.getLastName(),
                            reqUser.getMiddleName(),
                            reqUser.getPhoneNumber(),
                            passwordEncoder.encode(reqUser.getPassword()),
                            checkRole.getRole(reqUser.getRole())
                    );
                    newStaff.setCompany(currentUser.getCompany());
                    User save = userRepository.save(newStaff);
                    if (reqUser.getRole().equals(RoleName.OPERATOR.toString())) {
                        operatorDirectionRepository.save(new OperatorDirection(save, directionRepository.findById(directionId)
                                .orElseThrow(() -> new ResourceNotFoundException("getDirection")), true));
                    }
                    return new ApiResponse(
                            "Muvaffaqiyatli qo'shildi",
                            "Successfully added",
                            "Успешно добавлено",
                            "Муваффақиятли қошилди", true
                    );
                }
                return new ApiResponse(
                        "Хatolik ma'lumotlar to'liq emas",
                        "failed. Invalid data",
                        "Информация не до конца",
                        "Хатолик маълумотлар тўлиқ эмас", false);
            }
            return new ApiResponse(
                    "bunday nomdagi user serverda mavjud",
                    "failed. there is such user phone number on server",
                    "Такой пользователь в сервере уже есть",
                    "бундай номдаги усэр сэрвэрда мавжуд", false);
        }
        return new ApiResponse(
                "Man etilgan",
                "forbidden",
                "Запрешено",
                "Ман этилган", false);
    }

    public ApiResponse editStaff(ReqUser reqUser, User user, UUID staffId) {
        try {
            if (checkRole.isDirector(user)) {
                if (reqUser.getPassword().equals(reqUser.getPrePassword())) {
                    User staff = getUser(staffId);
                    if (userRepository.existsByPhoneNumberAndIdNot(reqUser.getPhoneNumber(), staffId)) {
                        return new ApiResponse(
                                "Bu raqam band",
                                "This phone number is busy",
                                "Этот номер телефона занят",
                                "Бу рақам банд", false
                        );
                    }
                    if ((reqUser.getRole().equals(RoleName.OPERATOR.toString()) || reqUser.getRole().equals(RoleName.RECEPTION.toString()))
                            && reqUser.getFirstName() != null &&
                            reqUser.getLastName() != null &&
                            reqUser.getPassword() != null &&
                            reqUser.getRole() != null) {
                        staff.setFirstName(reqUser.getFirstName());
                        staff.setLastName(reqUser.getLastName());
                        staff.setMiddleName(reqUser.getMiddleName());
                        staff.setPassword(passwordEncoder.encode(reqUser.getPassword()));
                        staff.setRoles(checkRole.getRole(reqUser.getRole()));
                        staff.setPhoneNumber(reqUser.getPhoneNumber());
                        User save = userRepository.save(staff);
                        return new ApiResponse(
                                "Muvaffaqiyatli tahrirlandi",
                                "Successfully edited",
                                "Успешно отредактировано",
                                "Муваффақиятли таҳрирланди",
                                true, save
                        );
                    }
                    return new ApiResponse(
                            "Xato",
                            "Error",
                            "Ошибка",
                            "Хато",
                            false);
                }
                return new ApiResponse(
                        "Parollar nomutanosib",
                        "Passwords is not same",
                        "Пароли не совпадают",
                        "Пароллар номутаносиб", false

                );
            }
            return new ApiResponse(
                    "Siz tahrirlay olmaysiz",
                    "You can not edit",
                    "Вы не можете редактировать",
                    "Сиз таҳрирлай олмайсиз", false
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

    public List<User> getListStaff(User user, RoleName roleName) {
        User currentUser = getUser(user.getId());
        if (checkRole.isDirector(currentUser)) {
            return userRepository.findAllByRolesInAndCompanyId(checkRole.getRole(roleName.toString()), user.getCompany().getId());
        }
        throw new BadRequestException("You can not use");
    }

    public ApiResponse getStaff(User user) {
        try {
            User currentUser = getUser(user.getId());
            if (checkRole.isDirector(currentUser)) {
                return new ApiResponse(true, new ResUser(
                        user.getFirstName(),
                        user.getLastName(),
                        user.getMiddleName(),
                        user.getCompany(),
                        new ArrayList<>(user.getRoles()),
                        user.getPhoneNumber()
                ));
            }
            return new ApiResponse(
                    "Sizga ko'ra olmaysiz",
                    "You may not show",
                    "Вы не можете смотреть",
                    "Сиз кура олмасиз", false
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

    public ApiResponse deleteStaff(UUID id, User user) {
        try {
            if (checkRole.isDirector(user)) {
                OperatorDirection operatorDirection = operatorDirectionRepository.getDirectionId(id);
                if (operatorDirection != null) {
                    operatorDirectionRepository.delete(operatorDirection);
                }
                userRepository.deleteById(id);
                return new ApiResponse(
                        "Muvaffaqiyatli o'chirildi",
                        "Successfully deleted",
                        "Успешно удалённо",
                        "Муваффақиятли ўчирилди", true
                );

            }
            return new ApiResponse(
                    "O'chira olmaysiz",
                    "You may not delete",
                    "Вы не можете удалить",
                    "ўчира олмайсиз", false
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

    public User getUser(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }

    public ApiResponse onOffOperator(UUID id, boolean active, User user) {
        try {
            if (checkRole.isDirector(user)) {
                OperatorDirection operatorDirection = operatorDirectionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOperator"));
                operatorDirection.setActive(active);
                operatorDirectionRepository.save(operatorDirection);
                return new ApiResponse("OK", true);
            }
            return new ApiResponse(
                    "Sizga ko'ra olmaysiz",
                    "You may not show",
                    "Вы не можете смотреть",
                    "Сиз кура олмасиз", false
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


}
