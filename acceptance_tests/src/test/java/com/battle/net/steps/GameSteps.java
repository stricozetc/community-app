package com.battle.net.steps;

import com.battle.net.model.Game;
import com.battle.net.service.api.GameService;
import com.battle.net.utils.Container;
import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;


public class GameSteps {
    private Container container;

    public GameSteps(Container container) {
        this.container = container;
    }

    @When("^User adds game with name \"([^\"]*)\" to App$")
    public void userAddsGameWithName(String appName) {
        container.response = GameService.addGame(container.gameMap.get(appName));
        Game game = container.response.jsonPath().getObject("", Game.class);
        container.gameMap.put(appName, game);
    }

    @Then("^Game is added for the user$")
    public void gameIsAddedForTheUser() {
        Assert.assertEquals(container.response.statusCode(), 200);
    }

    @When("^User edit the game \"([^\"]*)\"$")
    public void userEditTheGame(String appName) {
        container.response = GameService.editGame(container.gameMap.get(appName));
    }

    @When("^User \"([^\"]*)\" get information about games$")
    public void userGetInformationAboutGames(String userName) {
        container.response = GameService.getGames(container.userMap.get(userName));
    }

    @Then("^Check information for game \"([^\"]*)\" is valid$")
    public void checkGamesInformationIsValid(String appName) {
        Game responseGame = container.response.jsonPath().getObject("find { it.appName.equals('" + appName + "')}", Game.class);
        Assert.assertEquals(container.gameMap.get(appName), responseGame);
    }

    @Then("^Game \"([^\"]*)\" is removed successfully$")
    public void gameIsRemovedForTheUser(String appName) {
        Assert.assertEquals(200, container.response.statusCode());
        container.gameMap.remove(appName);
    }

    @When("^User \"([^\"]*)\" remove the game \"([^\"]*)\"$")
    public void userRemoveTheGame(String userName, String appName) {
        container.response = GameService.getGames(container.userMap.get(userName));
        Game gameForRemoving = container.response.jsonPath().getObject("find { it.appName.equals('" + appName + "')}", Game.class);
        container.response = GameService.deleteGame(gameForRemoving);
    }

    @When("^User sets new description \"([^\"]*)\" to game \"([^\"]*)\"$")
    public void userSetsNewDescriptionToGame(String description, String appName) {
        container.gameMap.get(appName).setDescription(description);
    }

    @And("^User sets new maxRoomPlayer \"([^\"]*)\" to game \"([^\"]*)\"$")
    public void userSetsNewMaxRoomPlayerToGame(String maxRoomPlayer, String appName) {
        container.gameMap.get(appName).setMaxRoomPlayer(Integer.valueOf(maxRoomPlayer));
    }

    @And("^User \"([^\"]*)\" creates game with name \"([^\"]*)\" on port \"([^\"]*)\"$")
    public void userCreatesGameWithName(String userName, String appName, String port) {
        Game game = GameService.createNewGame(container.userMap.get(userName), appName, port);
        container.gameMap.put(appName, game);
    }

    @Then("^User \"([^\"]*)\" has (\\d+) games?$")
    public void userHasGame(String userName, int countOfGames) {
        Assert.assertEquals(container.response.jsonPath().getList("findAll { it.userId=" + container.userMap.get(userName).getId() + "}").size(), countOfGames);
    }

    @When("^Get information about all games of all users$")
    public void getInformationAboutAllGamesOfAllUsers() {
        container.response = GameService.getAllGamesFromAllUsers();
    }

    @And("^User sets redirectUrl \"([^\"]*)\" to game \"([^\"]*)\"$")
    public void userSetsRedirectUrlToGame(String url, String appName) {
        container.gameMap.get(appName).setRedirectUrl(url);
    }

    @And("^User sets appToken for game \"([^\"]*)\" to DB$")
    public void userSetsAppTokenForGameToDB(String appName) {
        GameService.setAppTokenToDB(container.gameMap.get(appName));
    }
}
