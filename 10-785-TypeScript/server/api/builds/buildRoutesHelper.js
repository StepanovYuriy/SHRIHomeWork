const {
    getSettingsFromDB,
    getBuildListFromDB,
    saveNewBuildToDB,
    getBuildDetailsFromDB,
    getBuildLogFromDB,
    getCodeAndMessage,
} = require('../../db/dbHelper');
const { getCommitByHash } = require('../../git/gitHelper');

const getBuildListRoute = async (req, res) => {
    try {
        const data = await getBuildListFromDB(req, { ...req.query });
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

const saveNewBuildRoute = async (req, res) => {
    const { commitHash } = req.body;
    let commit = null;

    try {
        const { data } = await getSettingsFromDB(req);
        commit = await getCommitByHash(commitHash, data);
    } catch (error) {
        const code = 400;
        const message = `Не удалось получить данные для commitHash: ${commitHash}`;
        return res.status(code).json({ code, message });
    }

    try {
        const data = await saveNewBuildToDB(req, commit);
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

const getBuildDetailsRoute = async (req, res) => {
    try {
        const data = await getBuildDetailsFromDB(req, { ...req.params });
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

const getBuildLogRoute = async (req, res) => {
    try {
        const data = await getBuildLogFromDB(req, { ...req.params });
        return res.json(data);
    } catch (error) {
        const { code, message } = getCodeAndMessage(error.toJSON());
        return res.status(code).json({ code, message });
    }
};

module.exports = {
    getBuildListRoute,
    saveNewBuildRoute,
    getBuildDetailsRoute,
    getBuildLogRoute,
};
