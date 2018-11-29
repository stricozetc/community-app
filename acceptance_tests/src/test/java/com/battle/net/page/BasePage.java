package com.battle.net.page;

import static com.codeborne.selenide.Selenide.open;

public class BasePage {
    public static final String ADMIN_CONSOLE_URL = "http://localhost/#/_admin_console";
    public static final String BATTLE_URL = "http://localhost/#/battles";

    public AdminConsolePage openAdminConsole() {
        open(ADMIN_CONSOLE_URL);
        return new AdminConsolePage();
    }

    public MainPage openMainPage() {
        open(BATTLE_URL);
        return new MainPage();
    }
}
