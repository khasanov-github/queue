package uz.ecma.queueserver.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReqDirection {
    @NotBlank
    private String nameUzl;
    private String nameUzk;
    private String nameRu;
    private String nameEn;
    @NotBlank
    private boolean isAutoTime;
    private Integer time;
    private String companyId;
}
