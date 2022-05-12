package jwtspring.models.dto;

import jwtspring.models.product.Product;
import lombok.Getter;

@Getter
public class productDTO {

    private long categoryId;
    private Product product;
}
