package com.battle.net.page;

import static com.codeborne.selenide.Selenide.$x;
import static java.lang.String.format;

public class MainPage extends BasePage{
    public static final String ENTER_TO_GAME = "//div[text()='%s']//parent::div[@class='ca-game-card__title']//following-sibling::div[@class='ca-game-card__btn-container']//button";

    public void enterToGame(String appName) {
        $x(format(ENTER_TO_GAME, appName)).click();
    }
}
