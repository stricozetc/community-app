package com.battle.net.steps;

import com.battle.net.utils.Container;
import com.battle.net.db.DbConnector;
import com.battle.net.utils.ReportPortalLogApi;
import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import io.restassured.RestAssured;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Hooks {
    private Container container;

    static {
        RestAssured.filters(new ReportPortalLogApi());
    }

    public Hooks(Container container) {
        this.container = container;
    }

    @Before
    public void before(Scenario scenario) {
        log.info("Scenario '{}' started", scenario.getName());
    }

    @After(order = 0)
    public void after(Scenario scenario) {
        container.userMap.values().forEach(user -> {
            log.debug("Delete user from DB: ({})", user.toString());
            new DbConnector().deleteUser(user);
        });

        log.info("Scenario '{}' {}", scenario.getName(), scenario.getStatus());
    }


    @After(order = 1, value = "@GAME")
    public void afterGameScenario() {
        container.gameMap.values().forEach(game -> {
            log.debug("Delete game from DB: ({})", game.toString());
            new DbConnector().deleteGame(game);
        });
    }
}
