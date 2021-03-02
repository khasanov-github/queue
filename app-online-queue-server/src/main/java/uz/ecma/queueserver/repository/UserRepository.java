package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.ecma.queueserver.entity.Company;
import uz.ecma.queueserver.entity.Role;
import uz.ecma.queueserver.entity.User;

import java.util.*;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByPhoneNumber(String phoneNumber);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByPhoneNumberAndIdNot(String phoneNumber, UUID id);

    List<User> findAllByRolesInAndCompanyId(Set<Role> roles, UUID company_id);

    // List<User> findAllByRole
    @Query(value = "select * from users u where u.first_name like concat('%','Admin','%')", nativeQuery = true)
    User searchByRoleForAdmin();

    User findByCompany_Id(UUID company_id);
}
