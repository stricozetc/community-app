package com.battle.net.page;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;
import static java.lang.String.format;

public class AdminConsolePage extends BasePage{
    private static final String ADD_GAME_BUTTON = "div.add-button button";
    private static final String TOKEN_BUTTON = "//div[text()='%s']//ancestor:: div//button[@title='Show Application Token']";
    private static final String INPUT_TOKEN = "//div[@class='input-container']//input";

    public SettingsGameFormPage clickOnAddGameButton() {
        $(ADD_GAME_BUTTON).click();
        return new SettingsGameFormPage();
    }

    public AdminConsolePage clickOnTokenButton(String appName) {
        $x(format(TOKEN_BUTTON, appName)).click();
        return this;
    }

    public String getValueFromInputToken() {
        String token = $x(INPUT_TOKEN).getAttribute("value");
        return token;
    }

}
