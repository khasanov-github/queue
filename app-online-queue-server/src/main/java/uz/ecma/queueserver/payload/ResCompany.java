package uz.ecma.queueserver.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.ecma.queueserver.entity.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResCompany {
    private UUID id;

    private String name;

    private Contact contact;

    private Attachment logo;

    private String tin;

    private Category category;

    private List<WorkTime> workTimes;

    private List<AwareCompany> awareCompanies;

    private boolean active=false;

    private Double rate;
    private Timestamp createdAt;

    public ResCompany(UUID id, String name, Contact contact, Attachment logo, String tin, Category category, List<WorkTime> workTimes, List<AwareCompany> awareCompanies, boolean active, Double rate) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.logo = logo;
        this.tin = tin;
        this.category = category;
        this.workTimes = workTimes;
        this.awareCompanies = awareCompanies;
        this.active = active;
        this.rate = rate;
    }

    public ResCompany(UUID id, String name, Contact contact, Attachment logo, String tin, boolean active,Timestamp createdAt) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.logo = logo;
        this.tin = tin;
        this.active = active;
        this.createdAt = createdAt;
    }
}
