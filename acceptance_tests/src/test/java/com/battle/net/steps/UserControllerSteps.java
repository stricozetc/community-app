package com.battle.net.steps;

import com.battle.net.utils.Container;
import com.battle.net.model.User;
import com.battle.net.service.UserControllerService;
import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;


public class UserControllerSteps {
    private Container container;

    public UserControllerSteps(Container container) {
        this.container = container;
    }

    @When("^User login to App")
    public void userLoginToApp() {
        container.response = UserControllerService.login(container.user);
    }

    @Then("^Check user is logged in successfully$")
    public void checkUserIsLoggedInSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("success"), true);
    }

    @When("^User register to app first time$")
    public void userRegisterToAppFirstTime(DataTable credentials) {
        container.user = credentials.asList(User.class).get(0);
        container.response = UserControllerService.register(container.user);
    }

    @Then("^Check user is registered successfully$")
    public void checkUserIsRegisteredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("isActive"), true);
    }
}
