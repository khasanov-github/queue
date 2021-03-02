package uz.ecma.queueserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.ecma.queueserver.entity.Rate;
import uz.ecma.queueserver.entity.Region;
import uz.ecma.queueserver.projection.CustomDistrict;
import uz.ecma.queueserver.projection.CustomRegion;

import java.util.UUID;
@CrossOrigin
@RepositoryRestResource(path = "region",collectionResourceRel = "list",excerptProjection = CustomRegion.class)
public interface RegionRepository extends JpaRepository<Region,Integer> {

}
