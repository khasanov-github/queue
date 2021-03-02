package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.ecma.queueserver.entity.Company;
import uz.ecma.queueserver.entity.Direction;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DirectionRepository extends JpaRepository<Direction, Integer> {
    List<Direction> findAllByCompanyId(UUID uuid);

    Optional<Direction> findByCompanyAndNameUzlEqualsIgnoreCaseOrNameUzkEqualsIgnoreCaseOrNameRuEqualsIgnoreCaseOrNameEnEqualsIgnoreCase(Company company, String nameUzl, String nameUzk, String nameRu, String nameEn);

    @Query(value = "select * from direction d where (select lower(names) from complains) like concat('%', lower(d.name_en), '%') or (select lower(names) from complains) like concat('%', lower(d.name_ru), '%') or (select lower(names) from complains) like concat('%', lower(d.name_uzl), '%') or (select lower(names) from complains) like concat('%', lower(d.name_uzk), '%')", nativeQuery = true)
    List<Direction> getDitectionByComplainsHas();

    @Query(value = "select count(id) from direction where DATE(created_at) between :comWeek and DATE(NOW())",nativeQuery = true)
    Integer getComWeek(Date comWeek);

    @Query(value = "select id from direction where company_id=:companyId", nativeQuery = true)
    List<Integer> findAllDirectionIdByCompany(UUID companyId);
}