const { getSettingsFromDB, saveSettingsToDB, getCodeAndMessage } = require('../../db/dbHelper');
const { runGitClone } = require('../../git/gitHelper');

const getSettingsRoute = async (req, res) => {
    try {
        const data = await getSettingsFromDB(req);
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

const saveSettingsRoute = async (req, res) => {
    try {
        const { repoName, buildCommand, mainBranch, period } = req.body;

        if (!repoName || !buildCommand || !mainBranch || Number.isNaN(period)) {
            const code = 400;
            const message = 'Заполнены не все поля';
            return res.status(code).json({ code, message });
        }

        try {
            await runGitClone(repoName);
        } catch (error) {
            const code = 400;
            const message = 'Не удалось создать локальную копию репозитория';
            return res.status(code).json({ code, message });
        }

        await saveSettingsToDB(req, { ...req.body });

        const data = await getSettingsFromDB(req);
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

module.exports = {
    getSettingsRoute,
    saveSettingsRoute,
};
