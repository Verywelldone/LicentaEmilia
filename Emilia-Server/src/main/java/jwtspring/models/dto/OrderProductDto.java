package jwtspring.models.dto;

import jwtspring.models.product.ProductItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductDto {
    private ProductItem productItem;
    private Integer quantity;
}
