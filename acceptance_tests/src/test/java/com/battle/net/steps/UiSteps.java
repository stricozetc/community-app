package com.battle.net.steps;

import com.battle.net.page.AppLoginPage;
import com.battle.net.page.MainPage;
import com.battle.net.utils.Container;
import com.codeborne.selenide.Selenide;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class UiSteps {
    private Container container;
    private AppLoginPage loginPage = new AppLoginPage();
    private MainPage mainPage;

    public UiSteps(Container container) {
        this.container = container;
    }

    @When("^Ui User \"([^\"]*)\" logs in to App$")
    public void uiUserLogsInToApp(String userName) {
        mainPage = loginPage.openApp().login(container.userMap.get(userName));
    }

    @And("^Ui User join the game \"([^\"]*)\"$")
    public void uiUserJoinTheGame(String appName) {
        mainPage.enterToGame(appName);
    }

    @Then("^The user \"([^\"]*)\" is redirected to the game \"([^\"]*)\"$")
    public void theUserIsRedirectedToTheGame(String uerName, String appName) {
        String expectedResult = container.gameMap.get(appName).getRedirectUrl() + "/" + container.userMap.get(uerName).getToken();
        Selenide.Wait().until(ExpectedConditions.urlToBe(expectedResult));
    }
}
