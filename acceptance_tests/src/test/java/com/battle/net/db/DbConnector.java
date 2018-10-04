package com.battle.net.db;

import com.battle.net.utils.Constants.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import com.battle.net.model.User;
import lombok.extern.slf4j.Slf4j;

import static java.lang.String.format;

@Slf4j
public class DbConnector {
    private static final String DELETE_USER = "DELETE FROM `community-app`.users where email='%s'";

    public DbConnector() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            log.error("Class not found: " + e.getMessage());
        }
    }

    private Connection getConnection() throws SQLException {
        log.debug("Create connection to database");
        return DriverManager.getConnection(Db.URI, Db.LOGIN, Db.PASSWORD);
    }

    public void deleteUser(User user) {
        try (Connection connection = getConnection();
             Statement stmt = connection.createStatement()) {

            stmt.executeUpdate(format(DELETE_USER, user.getEmail()));
            log.debug("User is deleted (email: {})", user.getEmail());
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }
}
