package jwtspring.models.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jwtspring.models.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orders")
public class Order {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @JsonFormat(pattern = "dd/MM/yyyy")
  private LocalDate dateCreated;

  @Column
  @Enumerated(EnumType.STRING)
  private EOrderStatus orderStatus;

  @JsonManagedReference
  @OneToMany(mappedBy = "pk.order")
  @Valid
  private List<OrderProduct> orderProducts = new ArrayList<>();

  @ManyToOne
  @JsonIgnore
  private User user;

  @Transient
  public Double getTotalOrderPrice() {
    double sum = 0D;
    List<OrderProduct> orderProducts = getOrderProducts();
    for (OrderProduct op : orderProducts) {
      sum += op.getTotalPrice();
    }
    return sum;
  }

  @Transient
  public int getNumberOfProducts() {
    return this.orderProducts.size();
  }
}
