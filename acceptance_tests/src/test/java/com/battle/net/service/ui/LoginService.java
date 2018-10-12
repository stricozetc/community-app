package com.battle.net.service.ui;

import com.battle.net.model.User;
import com.battle.net.page.AppLoginPage;

public class LoginService {

    private AppLoginPage loginPage = new AppLoginPage();

    public void login(User user) {
        loginPage.openApp()
                .clickOnLoginButton()
                .enterEmail(user.getEmail())
                .enterPassword(user.getPassword())
                .clickOnSubmitButton();
    }

    public void register(User user) {
        loginPage.openApp()
                .clickOnRegistrationButton()
                .enterEmail(user.getEmail())
                .enterPassword(user.getPassword())
                .enterName(user.getName())
                .enterRepeatPassword(user.getPassword())
                .clickOnSubmitButton();

        loginPage.enterEmail(user.getEmail())
                .enterPassword(user.getPassword())
                .clickOnSubmitButton();
    }
}
