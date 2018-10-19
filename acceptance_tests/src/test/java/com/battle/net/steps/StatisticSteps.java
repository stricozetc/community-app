package com.battle.net.steps;

import com.battle.net.model.Game;
import com.battle.net.model.Statistic;
import com.battle.net.model.User;
import com.battle.net.service.api.StatisticService;
import com.battle.net.utils.Container;

import cucumber.api.java.en.And;
import io.restassured.response.Response;
import org.junit.Assert;

import java.util.List;
import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class StatisticSteps {
    int previousResult = 0;

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

    @When("^Set results of the game \"([^\"]*)\" for user \"([^\"]*)\" (in|out of) the top ten$")
    public void setResultsOfTheGameForUserInTheTopTen(String appName, String userName, String param, DataTable data) {
        Statistic statistic = data.asList(Statistic.class).get(0);
        log.debug("Set game result for game: {}, for user {}", appName, userName);
        container.response = setResults(container.userMap.get(userName), param,
                container.gameMap.get(appName), statistic);
        container.statisticMap.put(userName, statistic);
    }

    @Then("^Check user \"([^\"]*)\" is in the top ten$")
    public void checkUserIsInTheTopTen(String userName) {
        System.out.println(container.response.getBody().asString());
        int score = container.response.jsonPath().get("find { it.name.equals('" + userName + "')}.scores");
        Assert.assertEquals(score, container.statisticMap.get(userName).getScores());
    }

    @Then("^Check scores of the user \"([^\"]*)\" is not changed in the top ten$")
    public void checkScoresOfTheUserIsNotChangedInTheTopTen(String userName) {
        int score = container.response.jsonPath().get("find { it.name.equals('" + userName + "')}.scores");
        Assert.assertNotEquals(score, container.statisticMap.get(userName).getScores());
        Assert.assertEquals(score, previousResult);
    }

    @When("^User \"([^\"]*)\" change scores (in|out of) the top ten for game \"([^\"]*)\"$")
    public void userChangeScoresOutOfTheTopTenForGame(String userName, String param, String appName) {
        previousResult = container.statisticMap.get(userName).getScores();

        log.debug("Change scores for user {} for game {}", userName, appName);

        container.response = setResults(container.userMap.get(userName), param,
                container.gameMap.get(appName), container.statisticMap.get(userName));
    }

    private static Response setResults(User user, String param, Game game, Statistic statistic) {
        int bestResult = 0;
        int lastResult = 0;

        log.debug("Get the best and last results of leaders");
        Response response = StatisticService.getLeaders(game.getAppName());
        int size = response.jsonPath().getList("").size();
        if (size > 0) {
            bestResult = response.path("[0].scores");
            lastResult = response.path("[" + (size - 1) + "].scores");
        }

        statistic.setScores(param.equals("in") ? bestResult + 10 : lastResult - 10);
        return StatisticService.setGameResults(
                user.getToken(),
                game.getAppToken(),
                statistic);
    }

    @When("^Get recent games for user \"([^\"]*)\"$")
    public void getRecentGamesForUser(String userName) {
        log.debug("Get recent games for user {} ", userName);
        container.response = StatisticService.getRecentGames(container.token, container.userMap.get(userName));
        System.out.println(container.response.getBody().asString());
    }

    @Then("^User has recent game \"([^\"]*)\" with scores \"([^\"]*)\" and result \"([^\"]*)\"$")
    public void userHasRecentGameWithScoresAndResult(String game, String scores, String result) {
        int size = container.response.jsonPath().getList("").size();
        for (int i = 0; i < size; i++) {
            Assert.assertEquals(game, container.response.path("[" + i + "].game").toString());
            Assert.assertEquals(scores, container.response.path("[" + i + "].scores").toString());
            Assert.assertEquals(result, container.response.path("[" + i + "].result").toString());
        }
    }

    @When("^Get best users$")
    public void getBestUsers()  {
       container.response=StatisticService.getBestUsers(container.token);
    }

    @And("^Set results of the game \"([^\"]*)\" for user \"([^\"]*)\"$")
    public void setResultsOfTheGameForUser(String appName, String userName, DataTable data){
        Statistic statistic = data.asList(Statistic.class).get(0);
        log.debug("Set game result for game: {}, for user {}", appName, userName);
        container.response = StatisticService.setGameResults(container.userMap.get(userName).getToken(),
            container.gameMap.get(appName).getAppToken(),statistic);
    }

    @Then("^Best users are:$")
    public void bestUsersAre (List<String> users)  {
        int size = container.response.jsonPath().getList("").size();
        for (int i = 0; i < size; i++) {
            Assert.assertEquals(users.get(i), container.response.path("[" + i + "].name").toString());
        }
    }
}
