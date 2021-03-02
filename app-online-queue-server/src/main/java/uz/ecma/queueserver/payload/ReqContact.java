package uz.ecma.queueserver.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class ReqContact {
    @NotNull
    private Integer districtId;
    private String address;
    private List<String> phoneNumbers;
    @Email
    private String email;

    private String fax;

    private String lat;

    private String lng;

}
