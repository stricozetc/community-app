package com.battle.net.service.ui;

import com.battle.net.model.Game;
import com.battle.net.page.AdminConsolePage;

public class AdminConsoleService {
    private AdminConsolePage consolePage = new AdminConsolePage();

    public void createNewGame(Game game) {
        consolePage.clickOnAddGameButton()
                .enterAppName(game.getAppName())
                .enterDescription(game.getDescription())
                .enterMaxRoomPlayer(Integer.toString(game.getMaxRoomPlayer()))
                .enterRequestUrl(game.getRequestUrl())
                .enterRedirectUrl(game.getRedirectUrl())
                .submitGame();
    }
}
