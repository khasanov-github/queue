package uz.ecma.queueserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.ecma.queueserver.entity.Contact;
import uz.ecma.queueserver.exception.ExistException;
import uz.ecma.queueserver.payload.ReqContact;
import uz.ecma.queueserver.payload.ResContact;
import uz.ecma.queueserver.repository.ContactRepository;
import uz.ecma.queueserver.repository.DistrictRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class ContactService {
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    ContactRepository contactRepository;

    Contact addContact(ReqContact reqContact) {
        return contactRepository.save(new Contact(
                districtRepository.findById(reqContact.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")),
                    reqContact.getAddress(),
                reqContact.getPhoneNumbers(),
                reqContact.getEmail(),
                reqContact.getFax(),
                reqContact.getLat(),
                reqContact.getLng()

        ));

    }

    Contact editContact(UUID id, ReqContact reqContact) {
        if (contactRepository.existsByEmailEqualsIgnoreCaseAndIdNot(reqContact.getEmail(), id)) {
            throw new ExistException("Bunday email mavjud");
        }
        Optional<Contact> optionalContact = contactRepository.findById(id);
        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();
            contact.setDistrict(districtRepository.findById(reqContact.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")));
            contact.setAddress(reqContact.getAddress());
            contact.setEmail(reqContact.getEmail());
            contact.setFax(reqContact.getFax());
            contact.setPhoneNumber(reqContact.getPhoneNumbers());
            contact.setLat(reqContact.getLat());
            contact.setLng(reqContact.getLng());
            return contactRepository.save(contact);
        }
        throw new ResourceNotFoundException("Bunday conact topilmadi");
    }


    ResContact getContact(Contact contact) {
        return new ResContact(
                contact.getDistrict(),
                contact.getAddress(),
                contact.getPhoneNumber(),
                contact.getEmail(),
                contact.getFax(),
                contact.getLat(),
                contact.getLng()
        );
    }
}
