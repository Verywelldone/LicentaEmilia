package jwtspring.models.dto;

import jwtspring.models.product.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductDto {
    private Product productItem;
    private Integer quantity;
}
