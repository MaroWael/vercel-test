import express from 'express';
const app = express();

app.use(express.json());
let users = [];

app.get('/', (req, res) => {
    res.send('Home Page');
});
// Retrive Users
app.route('/user')
.get((req, res) => {
    if (users.length === 0) {
        res.status(404).json({"Message":'No users found'});
        return;
    }
    res.status(200).json(users);
})
// Create User
.post((req, res) => {
    const user = req.body;
    const findUser = users.find(u => u.id === user.id);
    if(findUser) {
        res.status(409).json({"Message": "User already exists"});
        return;
    }
    users.push(user);
    res.status(201).json({"Message": "User created successfully"});
});

// Delete User
app.delete('/user/:id',(req, res) => {
    const id = req.params.id;
    const findUserIdx = users.findIndex(u => u.id === Number(id));
    if(findUserIdx === -1)
    {
        res.status(401).json({"message": "User not found"});
        return;
    }
    users.splice(findUserIdx, 1);
    res.status(200).json({"message": "User deleted successfully"});
})
app.listen(2000);