const clientArgs = ['run build'];
const clientOpts = { stdio: 'inherit', cwd: '../frontend', shell: true };
require('child_process').spawn('npm', clientArgs, clientOpts);
