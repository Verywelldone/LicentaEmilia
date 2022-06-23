package jwtspring.models.dto;

import jwtspring.models.ServiceRating;
import jwtspring.models.UserInfo;
import jwtspring.models.product.ProductItem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Builder

public class ServiceRatingResDTO implements Serializable {

    private transient UserInfo fromUser;
    private transient ProductItem toProduct;
    private int stars;
    private String message;
    private String rateDate;

    public static ServiceRatingResDTO of(ServiceRating serviceRating,
                                         ProductItem productItem,
                                         UserInfo userInfo) {
        return ServiceRatingResDTO.builder()
                .fromUser(userInfo)
                .toProduct(productItem)
                .stars(serviceRating.getStars())
                .message(serviceRating.getMessage())
                .rateDate(serviceRating.getDate())
                .build();

    }
}
