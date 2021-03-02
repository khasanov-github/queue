package uz.ecma.queueserver.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.ecma.queueserver.entity.Company;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    @Query(value = "select * from company c where (select lower(names) from complains) like concat('%', lower(c.name), '%')", nativeQuery = true)
    List<Company> getCompanyByComplainsHas();

    boolean existsByNameEqualsIgnoreCase(String name);

    boolean existsByTin(String tin);

    Page<Company> findAllByCategoryId(Integer id, Pageable pageable);

    boolean existsByNameEqualsIgnoreCaseAndTinAndIdNot(String name, String tin, UUID id);

    Page<Company> findAllByNameContains(String name, Pageable pageable);

    @Query(value = "select * from company where active=false ",nativeQuery = true)
    List<Company> getActiveFalseCompany();

    @Query(value = "select count(id) from company where DATE(created_at) between :comWeek and DATE(NOW())",nativeQuery = true)
    Integer getComWeek(Date comWeek);

//
//    @Query(value = "select * from company where LOWER(name) like concat('%',Lower(:name), '%') ",nativeQuery = true)
//    List<Company> getByCompanyName(String name, PageRequest of);

}