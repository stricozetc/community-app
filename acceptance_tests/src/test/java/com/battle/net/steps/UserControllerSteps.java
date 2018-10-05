package com.battle.net.steps;

import com.battle.net.model.User;
import com.battle.net.service.UserControllerService;
import com.battle.net.utils.Container;

import org.junit.Assert;

import cucumber.api.DataTable;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class UserControllerSteps {

    private Container container;

    public UserControllerSteps(Container container) {
        this.container = container;
    }

    @When("^User login to App")
    public void userLoginToApp() {
        container.response = UserControllerService.login(container.user);
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
        container.response = UserControllerService.register(container.user);
        container.user.setId(container.response.path("id"));
    }

    @Then("^Check user is registered successfully$")
    public void checkUserIsRegisteredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
        Assert.assertEquals(container.response.path("isActive"), true);
    }

    @When("^User change password to \"([^\"]*)\"$")
    public void userChangePasswordTo(String newPassword) {
        container.response = UserControllerService.changePassword(newPassword, container.user, container.token);
        container.user.setPassword(newPassword);
    }

    @Then("^Password is changed successfully$")
    public void passwordIsChangedSuccessfully() {
        Assert.assertTrue(container.response.as(Boolean.class));
    }
    
    @When("^User select '(en|ru)' language$")
    public void userSelectLanguage(String language) {
        container.response = UserControllerService.selectLanguage(language, container.user);
    }

    @Then("^User language is '(en|ru)'$")
    public void userLanguageIs(String language) {
        container.response = UserControllerService.getUserLanguage(container.user);
        Assert.assertEquals(200, container.response.statusCode());
        Assert.assertEquals(language, container.response.getBody().asString());
    }
}
