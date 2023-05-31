const fs = require('node:fs/promises');
const path = require('node:path');

const foo = async () => {
    const basePath = path.join(process.cwd(), 'baseFolder');
    await fs.mkdir(basePath, {recursive: true});
    const filesNames = ['files1.txt','files2.txt','files3.txt','files4.txt',];
    const foldersNames = ['folder1','folder2','folder3','folder4',];

    foldersNames.map(async (folder) => {
        await fs.mkdir(path.join(basePath, folder), {recursive: true})
    })

    filesNames.map(async (files) => {
        await fs.writeFile(path.join(basePath, files), '')
    })

    let files = await fs.readdir(basePath);
    for (const file of files) {
        let stat =await fs.stat(path.join(basePath,file));
        console.log(path.join(basePath, file), ':',  stat.isFile());
    }

}

foo();
