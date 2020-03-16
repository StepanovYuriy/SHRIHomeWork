const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const runGitClone = (repoName) => {
    console.log('Запущена проверка названия репозитория', repoName);

    const folderNameForRepo = repoName.replace(/\W/g, '_');
    const pathToStore = path.resolve(__dirname, './storage', folderNameForRepo);
    console.log('Папка для хранения репозитория:', pathToStore);

    if (!fs.existsSync(pathToStore)) {
        console.log('Запущен процесс для выполнения git clone');

        let gitClone = spawn('git', ['clone', 'https://github.com/StepanovYuriy/test.git', pathToStore]);

        gitClone.stdout.on('data', (data) => {
            console.log('stdout:', data);
        });

        gitClone.stderr.on('data', (data) => {
            console.log('stderr:', data);
        });

        gitClone.on('close', (code) => {
            console.log('child process exited with code', code);
            console.log('Процесс для выполнения git clone завершён с кодом', code);
            if (code === 0) {
                // По идее надо добавить последний коммит в очередь на сборку
            }
        });
    } else {
        console.log('Репозиторий с таким названием ранее уже указывался. Создание локальной копии не требуется');
    }
};

const getCommitByHash = (commitHash) => {
    const commitMessage = 'init commit',
        branchName = 'master',
        authorName = 'Степанов Юрий';
    // Пока не реализовано :|

    return { commitMessage, commitHash, branchName, authorName };
};

module.exports = {
    runGitClone,
    getCommitByHash,
};