const fs = require('fs');
const child_process = require('child_process');

const configsDir = process.argv[2];
const varDir = process.argv[3];

let configs = fs.readdirSync(configsDir);

configs = configs.map(c => {
    let m = c.match(/^([-_\w]+)\.js$/);
    if (!m) return undefined;
    return m[1];
}).filter(c => c !== undefined);

if (!configs.length) throw(`no config files found in dir ${configsDir}`);

for (let c of configs) {
    if (!fs.existsSync(`${varDir}/dbs/${c}.db`)) {
        console.log(`Creating DB: ${varDir}/dbs/${c}.db`);
        child_process.execSync(`sqlite3 ${varDir}/dbs/${c}.db < ${__dirname}/schema.sqlite3`);
    }
}

for (let c of configs) {
    let ps = child_process.spawn(`node ${__dirname}/mm.js ${configsDir}/${c}.js ${varDir}/dbs/${c}.db`, { shell: true, });

    ps.on('error', (err) => {
        console.error(`Failed to spawn sub-process: ${c}`);
        process.exit();
    });

    ps.on('close', (code) => {
        console.log(`${c} sub-process exited with code ${code}`);
        process.exit();
    });

    ps.stdout.on('data', (data) => { process.stdout.write(c + ': ' + data.toString()); });
    ps.stderr.on('data', (data) => { process.stderr.write(c + ': ' + data.toString()); });
}
