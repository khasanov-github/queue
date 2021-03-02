package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.ecma.queueserver.entity.AttachmentContent;
import uz.ecma.queueserver.entity.Aware;
import uz.ecma.queueserver.projection.CustomAware;

import java.util.UUID;
@CrossOrigin
@RepositoryRestResource(path = "aware",collectionResourceRel = "list",excerptProjection = CustomAware.class)
public interface AwareRepository extends JpaRepository<Aware,Integer> {

}
