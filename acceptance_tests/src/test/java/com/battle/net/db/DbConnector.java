package com.battle.net.db;

import com.battle.net.model.Game;
import com.battle.net.model.User;
import com.battle.net.utils.Constants.Db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import lombok.extern.slf4j.Slf4j;

import static java.lang.String.format;

@Slf4j
public class DbConnector {
    private static final String DELETE_USER = "DELETE FROM `community-app`.users where email='%s'";
    private static final String DELETE_GAME = "DELETE FROM `community-app`.games where appName='%s'";
    private static final String DELETE_STATISTIC = "DELETE FROM `community-app`.statistic where userToken='%s'";
    private static final String DELETE_GAME_STATISTIC = "DELETE FROM `community-app`.statistic where appToken='%s'";

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

            log.debug("Query to delete user: {}", format(DELETE_USER, user.getEmail()));

            int count = stmt.executeUpdate(format(DELETE_USER, user.getEmail()));

            log.debug("Number of deleted records: {}", count);
            if (count > 0) log.debug("User is deleted successfully (user: {})", user.toString());
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public void deleteGame(Game game) {
        try (Connection connection = getConnection();
             Statement stmt = connection.createStatement()) {

            log.debug("Query to delete game: {}", format(DELETE_GAME, game.getAppName()));

            int count = stmt.executeUpdate(format(DELETE_GAME, game.getAppName()));

            log.debug("Number of deleted records: {}", count);
            if (count > 0) log.debug("Game is deleted successfully");
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public void deleteStatistic(User user) {
        try (Connection connection = getConnection();
             Statement stmt = connection.createStatement()) {

            log.debug("Query to delete statistic: {}", format(DELETE_STATISTIC, user.getToken()));

            int count = stmt.executeUpdate(format(DELETE_STATISTIC, user.getToken()));

            log.debug("Number of deleted records: {}", count);
            if (count > 0) { log.debug("Statistic is deleted successfully"); }
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public void deleteGameStatistic(Game game) {
        try (Connection connection = getConnection();
             Statement stmt = connection.createStatement()) {

            log.debug("Query to delete game statistic: {}", format(DELETE_GAME_STATISTIC, game.getAppToken()));
            int count = stmt.executeUpdate(format(DELETE_GAME_STATISTIC, game.getAppToken()));
            log.debug("Number of deleted records: {}", count);
            if (count > 0) { log.debug("Statistic is deleted successfully"); }
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }
}
