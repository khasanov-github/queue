package uz.ecma.queueserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.ecma.queueserver.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class WorkTime extends AbsEntity {
    @Column(nullable = false)
    private String startTime;

    @Column(nullable = false)
    private String finishTime;

    private boolean lunchActive;

    private String lunchStartTime;

    private String lunchFinishTime;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Direction direction;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

    private boolean active;


}
