package com.battle.net.steps;

import com.battle.net.model.User;
import com.battle.net.service.api.UserService;
import com.battle.net.utils.Container;

import org.junit.Assert;

import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

import java.util.List;

public class UserSteps {

    private Container container;

    public UserSteps(Container container) {
        this.container = container;
    }

    @When("^User \"([^\"]*)\" login to App")
    public void userLoginToApp(String userName) {
        container.response = UserService.login(container.userMap.get(userName));
        container.token = container.response.path("token");
    }

    @Then("^Check user is logged in successfully$")
    public void checkUserIsLoggedInSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("success"), true);
    }

    @When("^Users? registers? to app first time$")
    public void userRegistersToAppFirstTime(DataTable credentials) {
        List<User> users = credentials.asList(User.class);
        users.stream().forEach(user -> {
            container.response = UserService.register(user);
            user.setId(container.response.path("id"));
            user.setToken(container.response.path("token"));
            container.userMap.put(user.getName(), user);
        });
    }

    @Then("^Check user is registered successfully$")
    public void checkUserIsRegisteredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("isActive"), true);
    }

    @When("^User \"([^\"]*)\" select (en|ru) language$")
    public void userSelectLanguage(String username, String language) {
        container.response = UserService.selectLanguage(language, container.userMap.get(username));
    }

    @Then("^The language for user \"([^\"]*)\" is (en|ru)$")
    public void userLanguageIs(String username, String language) {
        container.response = UserService.getUserLanguage(container.userMap.get(username));
        Assert.assertEquals(200, container.response.statusCode());
        Assert.assertEquals(language, container.response.getBody().asString());
    }
}
