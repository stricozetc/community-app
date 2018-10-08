package com.battle.net.steps;

import com.battle.net.service.PasswordService;
import com.battle.net.service.UserService;
import com.battle.net.utils.Container;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class PasswordSteps {
    private Container container;

    public PasswordSteps(Container container) {
        this.container = container;
    }

    @When("^User change password to \"([^\"]*)\"$")
    public void userChangePasswordTo(String newPassword) {
        container.response = UserService.changePassword(newPassword, container.user, container.token);
        container.user.setPassword(newPassword);
    }

    @Then("^Password is changed successfully$")
    public void passwordIsChangedSuccessfully() {
        Assert.assertTrue(container.response.as(Boolean.class));
    }

    @When("^User restores the password$")
    public void userRestoresThePassword() {
        container.response = PasswordService.restorePassword(container.user);
    }

    @Then("^The password is restored successfully$")
    public void thePasswordIsRestoredSuccessfully() {
        Assert.assertEquals(container.response.statusCode(), 200);
    }
}
