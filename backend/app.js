const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mongoose = require('mongoose');
require("dotenv").config();

const port = process.env.port;
//create mongoose connection for MongoDB
mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log('Connected to mongo server'))
	.catch(err => console.error(err));

  
app.use(cors({
    origin: 'http://localhost:3000',
    })
);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10000mb' }));
app.use(express.urlencoded({limit: '10000mb', extended: false }));
app.use(express.json());

//CREATING ROUTES
const regRouter = require('./routes/signup_for_department');
const addRouter = require('./routes/users_add');
const getRouter = require('./routes/users_get');
const getOrgId = require('./routes/org_id_get');
const create = require('./routes/exam_create');
const view = require('./routes/exam_view');

app.use("/", regRouter);
app.use("/addUser",addRouter);
app.use("/getUsers", getRouter);
app.use("/getOrgId", getOrgId);
app.use("/createExam", create);
app.use("/viewExam", view);

//ERROR HANDLING
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

  
//PORT STARTING AND CHECKING
app.listen(port, () => console.log("Started on port ", port || 5000 ));