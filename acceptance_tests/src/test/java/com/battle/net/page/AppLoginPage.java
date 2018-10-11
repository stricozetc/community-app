package com.battle.net.page;

import com.battle.net.model.User;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;
import static com.codeborne.selenide.Selenide.open;

public class AppLoginPage {
    private static final String APP_BASE_URL = "http://localhost/#/";

    private static final String ENTER_BUTTON = "//div[contains(@class, 'Styled-button') and not(contains(@class, 'btn'))]/button";
    private static final String REGISTRATION_BUTTON = "div.ca-landing__register-btn button";
    private static final String EMAIL_FIELD = "#email";
    private static final String PASSWORD_FIELD = "#password";
    private static final String SUBMIT_BUTTON = "button[type='submit']";
    private static final String NAME_FIELD = "#name";
    private static final String REPEAT_PASSWORD = "#passwordToRepeat";

    public AppLoginPage openApp() {
        open(APP_BASE_URL);
        return this;
    }

    public MainPage login(User user) {
        $x(ENTER_BUTTON).click();
        $(EMAIL_FIELD).setValue(user.getEmail());
        $(PASSWORD_FIELD).setValue(user.getPassword());
        /*
        *The button SUBMIT requires click two times
        * You can use $(PASSWORD_FIELD).pressTab();
        * To avoid failed test
        * The bag is in trello (https://trello.com/c/PYGoEObA/202-the-button-submit-requires-double-click)
         */
        $(PASSWORD_FIELD).pressTab();
        $(SUBMIT_BUTTON).click();

        return new MainPage();
    }

    public AppLoginPage registration(User user) {
        $(REGISTRATION_BUTTON).click();
        $(EMAIL_FIELD).setValue(user.getEmail());
        $(NAME_FIELD).setValue(user.getName());
        $(PASSWORD_FIELD).setValue(user.getPassword());
        $(REPEAT_PASSWORD).setValue(user.getPassword());
        $(SUBMIT_BUTTON).click();

        return this;
    }
}
