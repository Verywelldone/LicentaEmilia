package jwtspring.models.dto;

import jwtspring.models.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaintainUserDTO {

    private long id;
    private String username;
    private String email;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String city;
    private String address;

    private String lastLogin;
    private String createdAt;
    private String updatedAt;
    private Boolean isConfirmed;
    private Boolean isBanned;

    public static MaintainUserDTO of(User user) {
        return MaintainUserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())

                .firstName(user.getUserInfo().getFirstName())
                .lastName(user.getUserInfo().getLastName())
                .phoneNumber(user.getUserInfo().getPhoneNumber())
                .city(user.getUserInfo().getCity())
                .address(user.getUserInfo().getAddress())

                .lastLogin(user.getLastLogin())
                .createdAt(user.getCreatedAt())
                .isConfirmed(user.getIsConfirmed())
                .updatedAt(user.getUpdatedAt())
                .isBanned(user.getIsBanned())
                .build();

    }
}
