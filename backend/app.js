const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

require("dotenv").config();

const details = require('./models/schema');
const registerRouter = require('./routes/webapp/register');
const addUsersRouter = require('./routes/desktopApp/addUsers');
const getUsersRouter = require('./routes/desktopApp/getUsers');
const getOrgId = require('./routes/desktopApp/getOrgId');
const createExam = require('./routes/desktopApp/createExam');
const viewExam = require('./routes/desktopApp/viewExam');
let port = 5000;

mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log('Connected to mongo server'))
	.catch(err => console.error(err));

app.use(cors({
    origin: 'http://localhost:5000',
    // credentials: true,
    })
);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10000mb' }));
app.use(express.urlencoded({limit: '10000mb', extended: false }));
app.use(express.json());

app.use("/", registerRouter);
app.use("/addUser",addUsersRouter);
app.use("/getUsers", getUsersRouter);
app.use("/getOrgId", getOrgId);
app.use("/createExam", createExam);
app.use("/viewExam", viewExam);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error:{
        message: error.message
    }});
});

  

app.listen(port, () => console.log("Started on port ", port));