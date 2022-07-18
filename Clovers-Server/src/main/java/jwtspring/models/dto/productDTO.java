package jwtspring.models.dto;

import jwtspring.models.product.ProductItem;
import lombok.Getter;

@Getter
public class productDTO {

    private long categoryId;
    private ProductItem productItem;
}
