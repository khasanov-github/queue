package uz.ecma.queueserver.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.ecma.queueserver.entity.Queue;
import uz.ecma.queueserver.entity.enums.QueueStatus;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface QueueRepository extends JpaRepository<Queue,UUID> {

    List<Queue> findByDirection_CompanyId(UUID direction_company_id);

    boolean existsByDirectionId(Integer direction_id);

    @Query(value = "SELECT count(id) from queue where status=:status and direction_id in(SELECT id from direction where company_id=:id)",nativeQuery = true)
    Long getQueue(UUID id,String status);
    Optional<Queue> findByDirectionIdAndStatusAndClient_PhoneNumber(Integer direction_id, QueueStatus status, String client_phoneNumber);

    @Query(nativeQuery = true, value = "SELECT * FROM queue WHERE direction_id=:directionId AND status=:status ORDER BY created_at")
    Page<Queue> findAllByDirection(Integer directionId, String status, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM queue WHERE direction_id=:directionId AND status=:status ORDER BY created_at limit 50")
    List<Queue> findAllByDirectionLimit(Integer directionId, String status);

    @Query(nativeQuery = true, value = "SELECT * FROM queue WHERE status=:status")
    List<Queue> findAllByStatus(String status);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM queue WHERE direction_id=:id AND status=:status ")
    Integer getCountQueue(Integer id, String status);

    @Query(nativeQuery = true, value = "SELECT COUNT (*) FROM operator_direction WHERE direction_id=:id AND active=true ")
    Integer getCountOperator(Integer id);

    @Query(nativeQuery = true, value = "SELECT * FROM queue WHERE direction_id=:id AND status=:status ORDER BY created_at DESC limit 1")
    Queue getLastQueue(Integer id, String status);

    boolean existsByStatus(QueueStatus status);
}