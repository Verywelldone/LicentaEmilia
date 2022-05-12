package jwtspring.models.dto;

import jwtspring.models.product.Product;
import lombok.Getter;

@Getter
public class UpdateProductDTO {

    private long productId;
    private Product product;
}
