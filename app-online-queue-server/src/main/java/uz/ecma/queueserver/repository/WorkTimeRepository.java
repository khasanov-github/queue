package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.ecma.queueserver.entity.Role;
import uz.ecma.queueserver.entity.WorkTime;

import java.util.List;
import java.util.UUID;

public interface WorkTimeRepository extends JpaRepository<WorkTime, UUID> {
    List<WorkTime> findAllByDirection_CompanyId(UUID direction_company_id);

}
