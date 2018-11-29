package com.battle.net;

import com.epam.reportportal.cucumber.StepReporter;
import lombok.extern.slf4j.Slf4j;

/**
 * Disable steps BeforeHook and AfterHook
 * To these steps don't display in Report Portal
 * Use in TestRunner.class in section 'plugin'
 */

@Slf4j
public class StepReporterHooksDisabled extends StepReporter {
    @Override
    protected void beforeHooks(Boolean isBefore) {
    }

    @Override
    protected void afterHooks(Boolean isBefore) {
    }
}
