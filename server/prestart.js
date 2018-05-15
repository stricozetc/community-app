const clientArgs = ['run build'];
const clientOpts = { stdio: 'inherit', cwd: '../', shell: true };
require('child_process').spawn('npm', clientArgs, clientOpts);