package uz.ecma.queueserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.ecma.queueserver.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AwareCompany extends AbsEntity{
    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    private Aware aware;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    private Company company;

    @Column(nullable = false)
    private String awareLink;
}
