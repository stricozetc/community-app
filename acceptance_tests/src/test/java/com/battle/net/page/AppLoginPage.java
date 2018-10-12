package com.battle.net.page;

import com.battle.net.model.User;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;
import static com.codeborne.selenide.Selenide.open;

public class AppLoginPage {
    private static final String APP_BASE_URL = "http://localhost/#/";

    private static final String LOGIN_BUTTON = "//div[contains(@class, 'Styled-button') and not(contains(@class, 'btn'))]/button";
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

    public AppLoginPage clickOnLoginButton() {
        $x(LOGIN_BUTTON).click();
        return this;
    }

    public AppLoginPage enterEmail(String email) {
        $(EMAIL_FIELD).clear();
        $(EMAIL_FIELD).setValue(email);
        return this;
    }

    public AppLoginPage enterPassword(String password) {
        $(PASSWORD_FIELD).clear();
        $(PASSWORD_FIELD).setValue(password);
        return this;
    }

    public MainPage clickOnSubmitButton() {
        /*
         *The button SUBMIT requires click two times
         * You can use $(PASSWORD_FIELD).pressTab();
         * To avoid failed test
         * The bag is in trello (https://trello.com/c/PYGoEObA/202-the-button-submit-requires-double-click)
         */
//        $(PASSWORD_FIELD).pressTab();
        $(SUBMIT_BUTTON).click();
        return new MainPage();
    }

    public AppLoginPage clickOnRegistrationButton() {
        $(REGISTRATION_BUTTON).click();
        return this;
    }

    public AppLoginPage enterName(String name) {
        $(NAME_FIELD).clear();
        $(NAME_FIELD).setValue(name);
        return this;
    }

    public AppLoginPage enterRepeatPassword(String password) {
        $(REPEAT_PASSWORD).clear();
        $(REPEAT_PASSWORD).setValue(password);
        return this;
    }
}
