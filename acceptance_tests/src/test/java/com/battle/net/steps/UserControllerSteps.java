package com.battle.net.steps;

import com.battle.net.db.DbConnector;
import com.battle.net.model.User;
import com.battle.net.service.UserControllerService;
import cucumber.api.DataTable;
import cucumber.api.java.After;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.restassured.response.Response;
import org.junit.Assert;


public class UserControllerSteps {
    Response response;
    User user;

    @When("^User login to App")
    public void userLoginToApp() {
        response = UserControllerService.login(user);
    }

    @Then("^Check user is logged in successfully$")
    public void checkUserIsLoggedInSuccessfully() {
        Assert.assertEquals(response.statusCode(), 200);
        Assert.assertEquals(response.path("success"), true);
    }

    @When("^User register to app first time$")
    public void userRegisterToAppFirstTime(DataTable credentials) {
        user = credentials.asList(User.class).get(0);
        response = UserControllerService.register(user);
    }

    @Then("^Check user is registered successfully$")
    public void checkUserIsRegisteredSuccessfully() {
        Assert.assertEquals(response.statusCode(), 200);
        Assert.assertEquals(response.path("isActive"), true);
    }

    @After
    public void deleteUserFromDb() {
        new DbConnector().deleteUser(user);
    }
}
