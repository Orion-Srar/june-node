const express = require('express');
const fileService = require("./file.service");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await fileService.readDB()
    res.json(users)

});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();

    const user = users.find(user => user.id === +id);

    if (!user){
        return  res.status(422).json('user not found')
    }

    res.json(user)

});

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;
    const users = await fileService.readDB()
    const user = {
        id: users.length + 1,
        name,
        age,
        gender
    }

    if (name.length < 3 || age < 1 || gender !== 'male' && gender !== 'female') {
        return res.status(400).json({
            message: 'User name mast be larger then 3 chars, age > 0, gender mast be \'male\' or \'female\''
        })
    }

    users.push(user)
    await fileService.writeDB(users)

    res.status(201).json({
        message: 'User created.',
        user
    })

});

app.patch('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body;


    const users = await fileService.readDB();
    const user = users.find(user => user.id === +id);

    if (!user){
        return res.status(422).json('user not found')
    }

    if (name) user.name = name;
    if (age) user.age = age;


    await fileService.writeDB(users);

    res.status(204).json(user)
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();
    const index = users.findIndex(user => user.id === +id);

    if (index ===-1){
        return res.status(422).json('user not found')
    }
    users.splice(index, 1);
    await fileService.writeDB(users);

    res.sendStatus(204)
});


const PORT = 5000

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});





