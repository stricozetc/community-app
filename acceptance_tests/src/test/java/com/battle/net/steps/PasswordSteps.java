package com.battle.net.steps;

import com.battle.net.service.api.PasswordService;
import com.battle.net.service.api.UserService;
import com.battle.net.utils.Container;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class PasswordSteps {
    private Container container;

    public PasswordSteps(Container container) {
        this.container = container;
    }

    @When("^User \"([^\"]*)\" changes password to \"([^\"]*)\"$")
    public void userChangePasswordTo(String userName, String newPassword) {
        container.response = UserService.changePassword(newPassword, container.userMap.get(userName), container.token);
        container.userMap.get(userName).setPassword(newPassword);
    }

    @Then("^Password is changed successfully$")
    public void passwordIsChangedSuccessfully() {
        Assert.assertTrue(container.response.as(Boolean.class));
    }

    @When("^User \"([^\"]*)\" restores the password$")
    public void userRestoresThePassword(String userName) {
        container.response = PasswordService.restorePassword(container.userMap.get(userName));
    }

    @Then("^The password is restored successfully$")
    public void thePasswordIsRestoredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
    }
}
