package jwtspring.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;


@Entity
@Table(name = "user_info")
@Getter
@Setter
public class UserInfo {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String phoneNumber;

    @Email
    @Column
    private String email;

    @Column
    private String city;

    @Column
    private String address;

    @OneToOne(mappedBy = "userInfo", cascade = CascadeType.MERGE)
    @PrimaryKeyJoinColumn
    private UserProfileImage profileImage;

}
