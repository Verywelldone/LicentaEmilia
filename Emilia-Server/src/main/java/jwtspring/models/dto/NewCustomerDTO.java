package jwtspring.models.dto;

import lombok.Getter;

@Getter
public class NewCustomerDTO {
    private String shippingAddress;
    private String country;
    private String phone;
    private String fullName;
}
