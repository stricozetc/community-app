package com.battle.net;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        strict = true,
        features = {"src/test/resources/com/battle/net"},
        tags = {"~@Ignore"},
        plugin = {
                "com.battle.net.StepReporterHooksDisabled"
        }
)
public class TestRunner {
}
