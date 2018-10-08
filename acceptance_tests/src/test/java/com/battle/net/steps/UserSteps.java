package com.battle.net.steps;

import com.battle.net.model.User;
import com.battle.net.service.UserService;
import com.battle.net.utils.Container;

import org.junit.Assert;

import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class UserSteps {

    private Container container;

    public UserSteps(Container container) {
        this.container = container;
    }

    @When("^User login to App")
    public void userLoginToApp() {
        container.response = UserService.login(container.user);
        container.token = container.response.path("token");
    }

    @Then("^Check user is logged in successfully$")
    public void checkUserIsLoggedInSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("success"), true);
    }

    @When("^User register to app first time$")
    public void userRegisterToAppFirstTime(DataTable credentials) {
        container.user = credentials.asList(User.class).get(0);
        container.response = UserService.register(container.user);
        container.user.setId(container.response.path("id"));
    }

    @Then("^Check user is registered successfully$")
    public void checkUserIsRegisteredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("isActive"), true);
    }

    @When("^User select (en|ru) language$")
    public void userSelectLanguage(String language) {
        container.response = UserService.selectLanguage(language, container.user);
    }

    @Then("^User language is (en|ru)$")
    public void userLanguageIs(String language) {
        container.response = UserService.getUserLanguage(container.user);
        Assert.assertEquals(200, container.response.statusCode());
        Assert.assertEquals(language, container.response.getBody().asString());
    }
}
