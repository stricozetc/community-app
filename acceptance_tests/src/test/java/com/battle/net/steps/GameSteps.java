package com.battle.net.steps;

import com.battle.net.model.Game;
import com.battle.net.service.GameService;
import com.battle.net.utils.Container;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

import java.util.Map;

public class GameSteps {
    private Container container;

    public GameSteps(Container container) {
        this.container = container;
    }

    @When("^User add game with name \"([^\"]*)\"$")
    public void userAddGameWithName(String appName) {
        container.game = new Game(container.user.getId(), appName);
        container.response = GameService.addGame(container.game);
        container.game = container.response.as(Game.class);
    }

    @Then("^Game is added for the user$")
    public void gameIsAddedForTheUser() {
        Assert.assertEquals(container.response.statusCode(), 200);
    }

    @When("^User edit the game with new parameters$")
    public void userEditTheGameWithNewParameters(Map<String, String> newParams) {
        container.game.setDescription(newParams.get("description"));
        container.game.setMaxRoomPlayer(Integer.valueOf(newParams.get("maxRoomPlayer")));
        container.response = GameService.editGame(container.game);
    }

    @Then("^The game is edited successfully$")
    public void theGameIsEditedSuccessfully() {
        container.response = GameService.getGame(container.user);
        Game editedGame = container.response.jsonPath().getObject("find { it.appName.equals('" + container.game.getAppName() + "')}", Game.class);
        Assert.assertEquals(container.game, editedGame);
    }
}
