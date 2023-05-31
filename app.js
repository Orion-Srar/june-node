const fs = require('fs');
const path = require('path');

function create(){

    const listFolder = ['folder1','folder2','folder3','folder4'];
    const listFiles = ['files1.txt','files2.txt','files3.txt','files4.txt'];

    const basePath = path.join(process.cwd(), 'baseFolder');

    fs.mkdir(basePath , (err) => {
            if (err) throw new Error(err.message)
    });

    listFolder.map(folder => {
        fs.mkdir(path.join(basePath, folder), err => {
            if (err) throw new Error(err.message)
        })
    });

    listFiles.map(files => {
        fs.writeFile(path.join(basePath, files), 'hello',(err)=> {
            if (err) throw new Error(err.message)
        })
    })
}

create();
