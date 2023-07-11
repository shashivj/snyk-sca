// @ts-ignore
import * as core from '@aws/codecatalyst-adk-core';
// @ts-ignore
import * as project from '@aws/codecatalyst-project';
// @ts-ignore
import * as runSummaries from '@aws/codecatalyst-run-summaries';
// @ts-ignore
import * as space from '@aws/codecatalyst-space';

try {
    // Get inputs from the action
    const input_SnykAuthToken = core.getInput('SnykAuthToken'); // Find Auth Token from Snyk account
    console.log('snyk setup');
    console.log('SnykAuthToken ', input_SnykAuthToken);

    // Interact with CodeCatalyst entities
    console.log(`Current CodeCatalyst space ${space.getSpace().name}`);
    console.log(`Current CodeCatalyst project ${project.getProject().name}`);

    // Action Code start
    //export doesn't seem to work, but keeping the code for future debugging.
    const cmdOutputOld = core.command(`export SNYK_TOKEN='${input_SnykAuthToken}'`);
    console.log('snyk token =', cmdOutputOld);
    const tokenEnv1 = core.command('echo $SNYK_TOKEN');
    console.log('tokenEnv1 =', tokenEnv1);

    const cmdOutput1 = core.command('npm install -g snyk');
    console.log('snyk install start=');
    console.log(cmdOutput1);
    const cmdOutput2 = core.command('npm install');
    console.log(cmdOutput2);

    //snyk auth seems to work
    const cmdOutputNew = core.command(`snyk auth '${input_SnykAuthToken}'`);

    console.log('snyk test starting ', cmdOutputNew);
    const cmdOutput3 = core.command('snyk test');
    console.log(cmdOutput3);
    const cmdOutput4 = core.command('snyk monitor');
    console.log(cmdOutput4);
    const cmdOutput5 = core.command('snyk test');
    console.log(cmdOutput5);

    //console.log(core.command('export -p'));
    //core.command(`export SNYK_TOKEN='${input_SnykAuthToken}'`);
    //console.log(core.command('export -p'));
    //console.log(core.command('sudo cat $PATH/.bash_profile'));
} catch (error) {
    core.setFailed(`Action Failed, reason: ${error}`);
}
