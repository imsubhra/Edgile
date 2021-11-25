const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
require("dotenv").config();

const port = process.env.port;

mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log('Connected to mongo server'))
	.catch(err => console.error(err));

  
app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
    })
);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10000mb' }));
app.use(express.urlencoded({limit: '10000mb', extended: false }));
app.use(express.json());

const regRouter = require('./routes/logup');
const addRouter = require('./routes/users_add');
const getRouter = require('./routes/users_get');
const getOrgId = require('./routes/org_id_get');
const create = require('./routes/create');
const view = require('./routes/view');

app.use("/", regRouter);
app.use("/addUser",addRouter);
app.use("/getUsers", getRouter);
app.use("/getOrgId", getOrgId);
app.use("/createExam", create);
app.use("/viewExam", view);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,  res) => {
    res.status(error.status || 500);
    res.json({error:{
        message: error.message
    }});
});

  

app.listen(port, () => console.log("Started on port ", port || 5000 ));