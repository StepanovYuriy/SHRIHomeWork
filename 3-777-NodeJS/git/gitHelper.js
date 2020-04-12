const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const GITHUB_URL = 'https://github.com/';

const getPathToStore = (repoName) => {
    const folderNameForRepo = repoName.replace(/\W/g, '_');

    return path.resolve(__dirname, './storage', folderNameForRepo);
};

const runGitClone = (repoName) => {
    console.info('Запущена проверка названия репозитория', repoName);

    return new Promise((resolve, reject) => {
        const pathToStore = getPathToStore(repoName);
        if (!pathToStore) reject();

        if (!fs.existsSync(pathToStore)) {
            console.info('Запущен процесс для выполнения git clone');
            const gitProcess = spawn('git', ['clone', GITHUB_URL + repoName, pathToStore]);

            const timeToFail = setTimeout(() => {
                gitProcess.kill();
                reject('Time is out');
            }, 10 * 1000);

            gitProcess.on('close', (code) => {
                console.info('gitProcess exited with code', code);
                clearTimeout(timeToFail);

                if (code === 0) {
                    resolve('success');
                }

                reject(`gitProcess exited with code ${code}`);
            });
        } else {
            console.info('Создание локальной копии не требуется. Она уже есть');
            resolve('success');
        }
    });
};

const getCommitByHash = (commitHash, settings) => {
    console.info('getCommitByHash', commitHash);

    return new Promise((resolve, reject) => {
        if (!settings) reject();
        const pathToStore = getPathToStore(settings.repoName);

        const format = '--pretty=format:{ "commitHash":"%H", "commitMessage": "%s", "authorName":"%cn" }';
        const command = ['show', '--quiet', format, commitHash];

        let logData = '';

        console.info('Запущен процесс для получения логов билда');
        const gitProcess = spawn('git', command, { cwd: pathToStore });

        gitProcess.stdout.on('data', (data) => {
            logData += data.toString();
        });

        gitProcess.on('close', (code) => {
            console.info('gitProcess exited with code', code);
            if (code === 0) {
                try {
                    // eslint-disable-next-line no-shadow
                    const { commitMessage, commitHash, authorName } = JSON.parse(logData);
                    const branchName = settings.mainBranch;

                    resolve({ commitMessage, commitHash, branchName, authorName });
                } catch (error) {
                    console.error(error);
                }
            }
            reject();
        });
    });
};

module.exports = {
    runGitClone,
    getCommitByHash,
};
