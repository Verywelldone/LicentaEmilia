package jwtspring.models.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "products",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        })
public class Product {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private BigDecimal price;

    @Column
    private BigDecimal weight;

    @Column
    private String description;

    @Column
    private byte[] thumbnail;

    @Column
    private byte[] image;

    @Column
    private int stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private ProductCategory productCategory;

}
