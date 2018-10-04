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

    @After
    public void after(Scenario scenario) {
        log.debug("Delete user from DB (user: {})", container.user.toString());
        new DbConnector().deleteUser(container.user);

        log.info("Scenario '{}' {}", scenario.getName(), scenario.getStatus());
    }
}
