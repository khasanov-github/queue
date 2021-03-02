package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.*;
import uz.ecma.queueserver.payload.ApiResponse;
import uz.ecma.queueserver.repository.*;

import java.util.*;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DirectionRepository directionRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    ComplainRepository complainRepository;

    LinkedList<String> list = new LinkedList<>();

    public ApiResponse changeMessageView(UUID id) {
        try {
            Message message = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMessage"));
            message.setView(true);
            messageRepository.save(message);
            return new ApiResponse(true, message.getUser().getId());
        } catch (Exception e) {
            return new ApiResponse(false, new Object());
        }
    }

    public ApiResponse getMessages(UUID id) {
        try {
                List<Message> messageList = messageRepository.findAllByUser_Id(id);
            return new ApiResponse(true, messageList);
        } catch (Exception e) {
            return new ApiResponse(true, null);
        }
    }

    public ApiResponse createReportFromUser(String id, String mesage) {
        try {
            if (id.length() < 34) {
                Integer integer = Integer.parseInt(id);
                Direction direction = directionRepository.findById(integer).orElseThrow(() -> new ResourceNotFoundException("getDirection"));
                User user = userRepository.searchByRoleForAdmin();
                Message messageForAdmin = new Message();
                messageForAdmin.setMessageText(direction.getNameUzl() + " " + mesage);
                messageForAdmin.setMessageText(direction.getCompany().getName() + " shu Companiyaning bo'limida ");
                messageForAdmin.setUser(user);
                messageRepository.save(messageForAdmin);
                return new ApiResponse(
                        "Adminga bo'lim haqida habar berildi. Yordamingiz uchun raxmat",
                        "Administrator notified about section. Thank you for your help",
                        "Администратор уведомил об отделе. Спасибо за вашу помощь",
                        "Админга бўлим ҳақида ҳабар берилди. Ёрдамингиз учун рахмат",
                        true);
            } else {
                UUID uuid = UUID.fromString(id);
                Company company = companyRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("getCompany"));
                User user = userRepository.searchByRoleForAdmin();
                Message messageForAdmin = new Message();
                messageForAdmin.setMessageText(company.getName() + " " + mesage);
                messageForAdmin.setUser(user);
                messageRepository.save(messageForAdmin);
                return new ApiResponse(
                        "Adminga kompaniya habar berildi. Yordamingiz uchun raxmat",
                        "Admin has been notified about the company. Thank you for your help",
                        "Администратор был уведомлен о компании. Спасибо за помощь",
                        "Админга компания ҳақида ҳабар берилди. Ёрдамингиз учун рахмат",
                        true);
            }
        } catch (Exception e) {
            return new ApiResponse(
                    "Xatolik",
                    "Error",
                    "ошибка",
                    "Xaтoлик",
                    false);
        }
    }

    public ApiResponse addComplain(List<String> names) {
        try {
            Complains complains = complainRepository.selectFirst();
            for (String name : names) {
                String complainsNames = complains.getNames();
                System.out.println(complainsNames.isEmpty());
                if (!complainsNames.isEmpty()) {
                    String s = complainsNames + " , " + name;
                    complains.setNames(s);
                } else {
                    String s = complainsNames + name;
                    complains.setNames(s);
                }
            }
            complainRepository.save(complains);
            return new ApiResponse(true, null);
        } catch (Exception e) {
            return new ApiResponse(false, null);
        }
    }

    public ApiResponse getComplains() {
        try {
            Complains complains = complainRepository.selectFirst();
            return new ApiResponse(true, complains.getNames());
        } catch (Exception e) {
            return new ApiResponse(false, null);
        }
    }

    public ApiResponse deleteComplain(String name) {
        try {
            Complains complains = complainRepository.selectFirst();
            String complainNames = complains.getNames();
            String[] split = complains.getNames().split(" , ");
            LinkedList<String> stringList = new LinkedList<String>(Arrays.asList(split));
            list = stringList;
            complains.setNames("");
            complainRepository.save(complains);

            int index = stringList.indexOf(name);
            for (String s : stringList) {
                if (s.toLowerCase().equals(name.toLowerCase())) {
                    stringList.remove(index);
                } else {
                    continue;
                }
            }
            for (int i = 0; i < stringList.size(); i++) {
                if (complains.getNames().isEmpty()) {
                    complains.setNames(list.get(i));
                    complainRepository.save(complains);
                } else {
                    complains.setNames(complains.getNames() + " , " + list.get(i));
                    complainRepository.save(complains);
                }
            }
            return new ApiResponse(true, complains.getNames());
        } catch (Exception e) {
            Complains complains = complainRepository.selectFirst();
            for (int i = 0; i < list.size(); i++) {
                if (complains.getNames().isEmpty()) {
                    complains.setNames(list.get(i));
                    complainRepository.save(complains);
                } else {
                    complains.setNames(complains.getNames() + " , " + list.get(i));
                    complainRepository.save(complains);
                }
            }
            return new ApiResponse(true, null);
        }
    }
}
