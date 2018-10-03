package com.battle.net.steps;

import com.battle.net.service.UserControllerService;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.restassured.response.Response;
import org.junit.Assert;

public class UserControllerSteps {
    Response response;

    @When("^User login to BattleNet$")
    public void userLoginToBattleNet() {
        response = UserControllerService.login();
    }

    @Then("^Check user is logged in$")
    public void checkUserIsLoggedIn() {
        Assert.assertEquals(response.statusCode(), 200);
        Assert.assertEquals(response.path("success"), true);
    }
}
