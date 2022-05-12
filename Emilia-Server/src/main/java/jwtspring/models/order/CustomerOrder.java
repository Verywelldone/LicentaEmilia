package jwtspring.models.order;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "customer_order")
public class CustomerOrder {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private int amount;

    @Column
    private String date;

    @Column
    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;

    @ManyToOne
    private Customer customer;

    @OneToOne(mappedBy = "customerOrder", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private OrderDetails orderDetails;

}
