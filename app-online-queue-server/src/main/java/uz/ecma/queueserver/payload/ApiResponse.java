package uz.ecma.queueserver.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private String messageUzb;
    private String messageEng;
    private String messageRus;
    private String messageUzK;
    private boolean success;
    private Object object;

    public ApiResponse(String messageUzb, boolean success) {
        this.messageUzb = messageUzb;
        this.success = success;
    }

    public ApiResponse(String messageUzb, String messageEng, String messageRus, String messageUzK, boolean success) {
        this.messageUzb = messageUzb;
        this.messageEng = messageEng;
        this.messageRus = messageRus;
        this.messageUzK = messageUzK;
        this.success = success;
    }

    public ApiResponse(boolean success, Object object) {
        this.success = success;
        this.object = object;
    }

    public ApiResponse(String messageUzb, Object object) {
        this.messageUzb = messageUzb;
        this.object = object;
    }
}
