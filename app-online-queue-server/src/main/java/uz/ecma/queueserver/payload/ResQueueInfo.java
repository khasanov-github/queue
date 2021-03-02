package uz.ecma.queueserver.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.ecma.queueserver.entity.Queue;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResQueueInfo {
    private Integer directionId;
    private Integer totalQueues;
    private Queue currentQueue;
    private String timeSpend;
}
