package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.*;
import uz.ecma.queueserver.entity.enums.RoleName;
import uz.ecma.queueserver.exception.BadRequestException;
import uz.ecma.queueserver.payload.*;
import uz.ecma.queueserver.repository.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    ContactService contactService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    WorkTimeService workTimeService;
    @Autowired
    DirectionRepository directionRepository;
    @Autowired
    WorkTimeRepository workTimeRepository;

    public ApiResponse addCompany(ReqCompany reqCompany) {
        try {
            if (!userRepository.existsByPhoneNumber(reqCompany.getReqUser().getPhoneNumber())) {
                if (!reqCompany.getReqUser().getFirstName().equals("") && !reqCompany.getReqUser().getLastName().equals("")) {
                    if (reqCompany.getReqUser().getPassword().equals(reqCompany.getReqUser().getPrePassword())) {
                        if (!companyRepository.existsByNameEqualsIgnoreCase(reqCompany.getName())) {
                            if (!companyRepository.existsByTin(reqCompany.getTin())) {
                                Company company = new Company();
                                company.setName(reqCompany.getName());
                                company.setContact(contactService.addContact(reqCompany.getReqContact()));
                                company.setLogo(reqCompany.getLogoId()==null?null:attachmentRepository.findById(reqCompany.getLogoId()).orElseThrow(() -> new ResourceNotFoundException("getLogo")));
                                company.setTin(reqCompany.getTin());
                                company.setCategory(categoryRepository.findById(reqCompany.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("getCategory")));
                                company.setAwareCompanies(reqCompany.getAwareCompanies());
                                Company saveCompany = companyRepository.save(company);
                                User user = userRepository.save(new User(
                                        reqCompany.getReqUser().getFirstName(),
                                        reqCompany.getReqUser().getLastName(),
                                        reqCompany.getReqUser().getMiddleName(),
                                        reqCompany.getReqUser().getPhoneNumber(),
                                        passwordEncoder.encode(reqCompany.getReqUser().getPassword()),
                                        saveCompany,
                                        roleRepository.findAllByRoleNameIn(new ArrayList<>(
                                                Arrays.asList(
                                                        RoleName.DIRECTOR,
                                                        RoleName.OPERATOR)))));

                                Direction direction = new Direction();
                                direction.setNameEn("Direction");
                                direction.setNameRu("Отдел");
                                direction.setNameUzk("Bo'lim");
                                direction.setNameUzl("Булим");
                                direction.setCompany(saveCompany);
                                Direction savedDirection = directionRepository.save(direction);


                                ReqWorkTime reqWorkTime = new ReqWorkTime();
                                reqWorkTime.setCompanyId(saveCompany.getId());
                                reqWorkTime.setActive(true);
                                workTimeService.addWorkTime(reqWorkTime,user);

                                return new ApiResponse(
                                        "Muvaffaqiyatli saqlandi",
                                        "Successfully saved",
                                        "Успешно сохранено",
                                        "Муваффақиятли сакланди", true,
                                        getCompany(saveCompany)
                                );

                            } else {
                                return new ApiResponse("Bunday STIR mavjud ", "This TIN already exists.", "Есть такая ИНН", "Бундай СТИР мавжуд", false);
                            }
                        } else {
                            return new ApiResponse("Bunday brand mavjud", "This brand already exists.", "Этот бренд уже существует", "Бундай бранд мавжуд", false);
                        }

                    } else {
                        return new ApiResponse("Parollar mos emas", "Passwords do not match", "Пароли не совпадают", "Пароллар мос эмас", false);
                    }
                } else {
                    return new ApiResponse("Bo'sh qatorlarni to'ldiring", "Fill in the blank fields", "Заполните пустые поля", "Бўш қаторларни тўлдиринг", false);
                }
            }
            return new ApiResponse("Bunday raqam ro'yhatdan o'tqazilgan ", "This number is already registered", "Этот номер уже зарегистрирован", "Бундай рақам рўйҳатдан ўтқазилган", false);

        } catch (Exception e) {
            return new ApiResponse("Tarmoqda xatolik", "Network error", "Ошибка сети", "Тармоқда хатолик", false);
        }

    }

    public ResCompany getCompany(Company company) {
        if (company.isActive()) {
            return new ResCompany(
                    company.getId(),
                    company.getName(),
                    company.getContact(),
                    company.getLogo(),
                    company.getTin(),
                    company.getCategory(),
                    company.getWorkTimes(),
                    company.getAwareCompanies(),
                    company.isActive(),
                    company.getRateAmount()==null?null:(company.getRateAmount()/company.getCountRate())
            );
        }
        return new ResCompany();

    }

    public ResCompany getCompanyForAdmin(Company company, User user) {
        boolean isAdmin=false;
        for (Role role : user.getRoles()) {
            if (role.getRoleName().toString().equals("ADMIN"))isAdmin=true;
        }
        if (isAdmin) {
            return new ResCompany(
                    company.getId(),
                    company.getName(),
                    company.getContact(),
                    company.getLogo(),
                    company.getTin(),
                    company.getCategory(),
                    company.getWorkTimes(),
                    company.getAwareCompanies(),
                    company.isActive(),
                    company.getRateAmount()==null?null:(company.getRateAmount()/company.getCountRate())
            );
        }
        return new ResCompany();

    }

    public ApiResponse getCompanyListByCategory(Integer page, Integer size, Integer id) {
        try {
            if (page < 0) {
                throw new BadRequestException("Page 0 dan kichik bo'lishi mumkin emas");
            }
            if (size < 1) {
                throw new BadRequestException("Size 1 dan kichik bo'lishi mumkin emas");
            }
            Pageable pageable = PageRequest.of(page, size);
            Page<Company> companyPage = companyRepository.findAllByCategoryId(id, pageable);
            return new ApiResponse("Company", "Company", "Company", "Company", true, new ResPageable(
                    page, size, companyPage.getTotalPages(), companyPage.getTotalElements(), companyPage.getContent().stream().map(this::getCompany).collect(Collectors.toList())
            ));
        } catch (IllegalArgumentException e) {
            return new ApiResponse(e.getMessage(), e.getMessage(), e.getMessage(), e.getMessage(), false);
        }
    }

    public ApiResponse editCompany(UUID id, ReqCompany reqCompany, User user) {
        try {
            User getUser = userRepository.findById(user.getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
            if (getUser.getRoles().size() == 4) {
                if (!companyRepository.existsByNameEqualsIgnoreCaseAndTinAndIdNot(reqCompany.getName(), reqCompany.getTin(), id)) {
                    Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCompany"));
                    company.setName(reqCompany.getName());
                    company.setContact(contactService.editContact(company.getContact().getId(), reqCompany.getReqContact()));
                    company.setLogo(attachmentRepository.findById(reqCompany.getLogoId()).orElseThrow(() -> new ResourceNotFoundException("getLogo")));
                    company.setTin(reqCompany.getTin());
                    company.setCategory(categoryRepository.findById(reqCompany.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("getCategory")));
                    company.setAwareCompanies(reqCompany.getAwareCompanies());
                    companyRepository.save(company);

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
                    "Siz yarata olmaysiz",
                    "You can not create",
                    "ты не можешь создать",
                    "Сиз ярата олмайсиз", false
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

    public ApiResponse getNewCompanies(Integer page, Integer size) {
        try {
            if (page < 0) {
                throw new BadRequestException("Page 0 dan kichik bo'lishi mumkin emas");
            }
            if (size < 1) {
                throw new BadRequestException("Size 1 dan kichik bo'lishi mumkin emas");
            }
            Pageable pageable = PageRequest.of(page, size);
            Page<Company> companyPage = (Page<Company>) companyRepository.findAll(pageable);
            return new ApiResponse("Mana Yangi Kampaniyalar", "Here are the new campaigns", "Вот новые кампании", "Мана Янги Кампаниялар", true, new ResPageable(
                    page, size, companyPage.getTotalPages(), companyPage.getTotalElements(), companyPage.getContent().stream().map(this::getCompany).collect(Collectors.toList())
            ));
        } catch (IllegalArgumentException e) {
            return new ApiResponse(e.getMessage(), e.getMessage(), e.getMessage(), e.getMessage(), false);
        }
    }

    public ApiResponse getCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
            return new ApiResponse("Mana Kategoriyalar", "Here are categories", "Вот новые категория", "Мана Янги категория", true, categories
            );
        } catch (IllegalArgumentException e) {
            return new ApiResponse(e.getMessage(), e.getMessage(), e.getMessage(), e.getMessage(), false);
        }
    }

    public ApiResponse getSearchedCompanies(Integer page, Integer size, String name) {
        try {
            if (page < 0) {
                throw new BadRequestException("Page 0 dan kichik bo'lishi mumkin emas");
            }
            if (size < 1) {
                throw new BadRequestException("Size 1 dan kichik bo'lishi mumkin emas");
            }
            Pageable pageable = PageRequest.of(page, size);
            Page<Company> companyPage = companyRepository.findAllByNameContains(name,pageable);
            return new ApiResponse("Company", "Company", "Company", "Company", true, new ResPageable(
                    page, size, companyPage.getTotalPages(), companyPage.getTotalElements(), companyPage.getContent().stream().map(this::getCompany).collect(Collectors.toList())
            ));
        } catch (IllegalArgumentException e) {
            return new ApiResponse(e.getMessage(), e.getMessage(), e.getMessage(), e.getMessage(), false);
        }
    }
}
