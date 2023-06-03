const fs = require('node:fs/promises');
const path = require('path');


module.exports = {
    readDB: async () => {
        const buffer = await fs.readFile(path.join(process.cwd(), 'users.json'));
        const json = buffer.toString();
        return json ? JSON.parse(json) : [];
    },

    writeDB: async (users) => {
        await fs.writeFile(path.join(process.cwd(), 'users.json'), JSON.stringify(users))
    }

}

