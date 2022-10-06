const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// connect to the database
mongoose.connect(config.database_url, { useNewUrlParser: true });
 db = mongoose.connection;
db.on('error', (error) => console.log(`connection error: ${error}`));
db.once('open', () => console.log(`Connected to MongoDB: ${config.database_url}`));

app.use(bodyParser.json());
app.set(bodyParser.urlencoded({ extended: true }));
// corss origin domain
app.use(cors());

app.get(`${config.prefix}/test`, async (req, res) => {
    res.json({ message: 'Hello World!'});
});

const authMiddle = require('./middlewares/auth.middle')
app.use(authMiddle.checkToken);

const userRouter = require('./routes/user.route')
const itemRouter = require('./routes/item.route')
const roleRouter = require('./routes/role.route')
const categoryRouter = require('./routes/category.route')
const todoRouter = require('./routes/todo.route')

app.use(config.prefix, userRouter)
app.use(config.prefix, itemRouter)
app.use(config.prefix, roleRouter)
app.use(config.prefix, categoryRouter)
app.use(config.prefix, todoRouter)

// init role
const roleModel = require('./models/role.model')

async function initRole() {
    const role = await roleModel.findOne({ name: 'admin' });
    if (!role) {
        new roleModel({
            role_name: 'user'
        }).save();

         adminRole = new roleModel({
            role_name: 'admin'
        }).save();
    }
}

initRole();

app.listen(config.server_port, config.server_host, () => {
    console.log('Server Started, The port is ' + config.server_port);
});

const express = require('express');
app = express();
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// connect to the database
mongoose.connect(config.database_url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(`connection error: ${error}`));
db.once('open', () => console.log(`Connected to MongoDB: ${config.database_url}`));

app.use(bodyParser.json());
app.set(bodyParser.urlencoded({ extended: true }));
// corss origin domain
app.use(cors());

app.get(`${config.prefix}/test`, async (req, res) => {
    res.json({ message: 'Hello World!'});
});

const authMiddle = require('./middlewares/auth.middle')
app.use(authMiddle.checkToken);

const userRouter = require('./routes/user.route')
const itemRouter = require('./routes/item.route')
const roleRouter = require('./routes/role.route')
const categoryRouter = require('./routes/category.route')
const todoRouter = require('./routes/todo.route')

app.use(config.prefix, userRouter)
app.use(config.prefix, itemRouter)
app.use(config.prefix, roleRouter)
app.use(config.prefix, categoryRouter)
app.use(config.prefix, todoRouter)

// init role
const roleModel = require('./models/role.model')

async function initRole() {
    const role = await roleModel.findOne({ name: 'admin' });
    if (!role) {
        new roleModel({
            role_name: 'user'
        }).save();

         adminRole = new roleModel({
            role_name: 'admin'
        }).save();
    }
}

initRole();

app.listen(config.server_port, config.server_host, () => {
    console.log('Server Started, The port is ' + config.server_port);
});

