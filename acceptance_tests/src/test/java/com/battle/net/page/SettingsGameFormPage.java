package com.battle.net.page;

import static com.codeborne.selenide.Selenide.$;

public class SettingsGameFormPage {
    private static final String APP_NAME = "#appName";
    private static final String DESCRIPTION = "#description";
    private static final String MAX_ROOM_PLAYER = "#maxRoomPlayer";
    private static final String REQUEST_URL = "#requestUrl";
    private static final String REDIRECT_URL = "#redirectUrl";
    private static final String SUBMIT_BUTTON = "button[type='submit']";

    public SettingsGameFormPage enterAppName(String appName) {
        $(APP_NAME).clear();
        $(APP_NAME).sendKeys(appName);
        return this;
    }

    public SettingsGameFormPage enterDescription(String description) {
        $(DESCRIPTION).clear();
        $(DESCRIPTION).sendKeys(description);
        return this;
    }

    public SettingsGameFormPage enterMaxRoomPlayer(String maxRoomPlayer) {
        $(MAX_ROOM_PLAYER).clear();
        $(MAX_ROOM_PLAYER).sendKeys(maxRoomPlayer);
        return this;
    }

    public SettingsGameFormPage enterRequestUrl(String requestUrl) {
        $(REQUEST_URL).clear();
        $(REQUEST_URL).sendKeys(requestUrl);
        return this;
    }

    public SettingsGameFormPage enterRedirectUrl(String redirectUrl) {
        $(REDIRECT_URL).clear();
        $(REDIRECT_URL).sendKeys(redirectUrl);
        return this;
    }

    public SettingsGameFormPage submitGame() {
        $(SUBMIT_BUTTON).click();
        return this;
    }
}
