package jwtspring.models.order;

import jwtspring.models.User;
import jwtspring.models.dto.NewCustomerDTO;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer {

    @Id
    @Column(name = "user_id")
    private long id;

    @Column
    private String shippingAddress;

    @Column
    private String country;

    @Column
    private String phone;

    @Column
    private String fullName;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerOrder> orderList = new ArrayList<>();

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;


    public static Customer of(NewCustomerDTO newCustomerDTO) {
        return Customer.builder().shippingAddress(newCustomerDTO.getShippingAddress())
                .country(newCustomerDTO.getCountry())
                .phone(newCustomerDTO.getPhone())
                .fullName(newCustomerDTO.getFullName())
                .build();
    }
}
