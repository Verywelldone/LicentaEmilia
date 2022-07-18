package jwtspring.models.dto;

import jwtspring.models.product.ProductItem;
import lombok.Getter;

@Getter
public class UpdateProductDTO {

    private long productId;
    private ProductItem productItem;
}
