package jwtspring.models.dto;

import jwtspring.models.order.EOrderStatus;
import jwtspring.models.product.ProductItem;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class OrderDTO {

    private long customerId;

    private int amount;

    private String date;

    private EOrderStatus orderStatus;

    private BigDecimal totalPrice;

    private int quantity;

    private List<ProductItem> productItemList;

}
