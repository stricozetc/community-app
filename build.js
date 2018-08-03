const args = ['run build'];

const appOpts = { stdio: 'inherit', cwd: 'frontend', shell: true };
require('child_process').spawn('npm', args, appOpts);


const serverOpts = { stdio: 'inherit', cwd: 'server', shell: true };
require('child_process').spawn('npm', args, serverOpts);
