package jwtspring.models.dto;
import lombok.Getter;

@Getter
public class UpdateUserInfoDto {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String city;
    private String address;
}
