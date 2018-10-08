package com.battle.net.steps;

import com.battle.net.model.Game;
import com.battle.net.service.GameService;
import com.battle.net.utils.Container;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class GameSteps {
    private Container container;

    public GameSteps(Container container) {
        this.container = container;
    }

    @When("^User add game with name \"([^\"]*)\"$")
    public void userAddGameWithName(String appName) {
        container.game = new Game(container.user.getId(), appName);
        container.response = GameService.addGame(container.game);
    }

    @Then("^Game is added for the user$")
    public void gameIsAddedForTheUser() {
        Assert.assertEquals(container.response.statusCode(), 200);
        container.game = container.response.as(Game.class);
    }

}
