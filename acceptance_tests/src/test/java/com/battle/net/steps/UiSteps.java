package com.battle.net.steps;

import com.battle.net.model.Game;
import com.battle.net.model.User;
import com.battle.net.page.AdminConsolePage;
import com.battle.net.page.AppLoginPage;
import com.battle.net.page.MainPage;
import com.battle.net.service.ui.AdminConsoleService;
import com.battle.net.service.ui.LoginService;
import com.battle.net.utils.Container;
import com.codeborne.selenide.Selenide;
import cucumber.api.DataTable;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class UiSteps {
    private Container container;
    private AppLoginPage loginPage = new AppLoginPage();
    private LoginService loginService = new LoginService();
    private MainPage mainPage = new MainPage();
    private AdminConsolePage consolePage = new AdminConsolePage();
    private AdminConsoleService consoleService = new AdminConsoleService();

    public UiSteps(Container container) {
        this.container = container;
    }

    @When("^Ui User \"([^\"]*)\" logs in to App$")
    public void uiUserLogsInToApp(String userName) {
        loginService.login(container.userMap.get(userName));
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

    @Given("^Ui user registers to app$")
    public void uiUserRegistersToApp(DataTable credentials) {
        User user = credentials.asList(User.class).get(0);
        loginService.register(user);
        container.userMap.put(user.getName(), user);
    }

    @And("^Ui user create the game$")
    public void uiUserCreateTheGame(DataTable data) {
        Game game = data.asList(Game.class).get(0);
        consoleService.createNewGame(game);
        container.gameMap.put(game.getAppName(), game);
    }

    @And("^Ui user go to admin console page$")
    public void uiUserGoToAdminConsolePage() {
        consolePage.openAdminConsole();
    }

    @And("^Ui user go to main page$")
    public void uiUserGoToMainPage() {
        mainPage.openMainPage();
    }

    @And("^Get appToken for game \"([^\"]*)\"$")
    public void getAppTokenForGame(String appName) {
        String appToken = consolePage.clickOnTokenButton(appName).getValueFromInputToken();
        container.gameMap.get(appName).setAppToken(appToken);
    }
}
