package com.battle.net.steps;

import com.battle.net.model.Statistic;
import com.battle.net.service.api.StatisticService;
import com.battle.net.utils.Container;

import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import org.junit.Assert;

import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Random;

@Slf4j
public class StatisticSteps {
    int bestResult = 0;

    private Container container;

    public StatisticSteps(Container container) {
        this.container = container;
    }

    @Then("^Game results are set successfully$")
    public void gameResultsSet() {
        Assert.assertTrue(container.response.as(Boolean.class));
    }

    @And("^Get leaders of the game \"([^\"]*)\"$")
    public void getLeadersOfTheGame(String appName) {
        container.response = StatisticService.getLeaders(appName);
    }

    @When("^Set results of the game \"([^\"]*)\" for user \"([^\"]*)\" in the top ten$")
    public void setResultsOfTheGameForUserInTheTopTen(String appName, String userName, DataTable data) {
        String userToken = container.userMap.get(userName).getToken();
        String appToken = container.gameMap.get(appName).getAppToken();

        log.debug("Get the best and last results of leaders");

        container.response = StatisticService.getLeaders(appName);
        int size = StatisticService.getLeaders(appName).jsonPath().getList("").size();
        if (size > 0) {
            System.out.println(container.response.getBody().asString());
            bestResult = container.response.path("[0].scores");
        }

        log.debug("Set game result for game: {}, for user {}", appName, userName);

        Statistic statistic = data.asList(Statistic.class).get(0);
        statistic.setScores(bestResult + 10);
        container.statisticMap.put(userName, statistic);
        container.response = StatisticService.setGameResults(userToken, appToken, statistic);
    }

    @Then("^Check user \"([^\"]*)\" is in the top ten$")
    public void checkUserIsInTheTopTen(String userName) {
        int score = container.response.jsonPath().get("find { it.name.equals('" + userName + "')}.scores");
        Assert.assertTrue(score == container.statisticMap.get(userName).getScores());
    }
}
