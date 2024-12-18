package org.example.advertisement_system.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.advertisement_system.entity.User;

@Mapper
public interface UserMapper {
    User findByUsername(@Param("username") String username);

    void insertUser(User user);
}
