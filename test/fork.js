'use strict';
const exec                  = require('child_process').exec;

module.exports = function(modulePath, args) {
    return new Promise(function(resolve, reject) {
        const child = exec('node ' + modulePath, args || []);//, { stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
        var stderr = '';
        var stdout = '';

        child.stderr.on('data', function(data) {
            stderr += data.toString();
        });

        child.stdout.on('data', function(data) {
            stdout += data.toString();
        });

        child.on('exit', function(code, signal) {
            if (code === 0) return resolve(stdout);
            reject(Error(stderr));
        });

        child.on('error', function(err) {
            reject(err);
        });
    });
};
