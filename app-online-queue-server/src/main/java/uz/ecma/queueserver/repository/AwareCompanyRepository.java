package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.ecma.queueserver.entity.Aware;
import uz.ecma.queueserver.entity.AwareCompany;

import java.util.UUID;

public interface AwareCompanyRepository extends JpaRepository<AwareCompany, UUID> {

}
