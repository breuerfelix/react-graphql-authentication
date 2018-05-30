import fs from 'fs';
import mkdirp from 'mkdirp';

function createUser(username){
    mkdirp(`./fileDatabase/${username}`);
    mkdirp(`./fileDatabase/${username}/domains`);
}

function getFiles(username){
    return fs.readdirSync(`./fileDatabase/${username}/domains`);
}

function readFile(user, cb) {
    fs.readFile(`./fileDatabase/${user}/serverblock.conf`, function (err, buf) {
        var serverString = buf.toString();
        cb(serverString);
    });
}

module.exports = {
    readFile,
    getFiles,
    createUser
}
