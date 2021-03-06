import Axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class signup extends React.Component {

    constructor() {
        super()
        const useStyles = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.dark,
            },
            form: {
                width: '100%', 
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));
        this.state = {
            firstname:"",
            lastname:"",
            email:"",            
            university:"",
            designation:"",
            classes: useStyles
        }
    }

    sendValues = (event) => {

        event.preventDefault();

        if ((this.state.firstname === "") || (this.state.lastname === "") || (this.state.email === "")  || (this.state.university === "") || (this.state.designation === "")) {
            alert("Enter All Details ");
        }
        else {
            if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email) && (this.state.firstname.length >= 1) && (this.state.lastname.length >= 1) && (this.state.university.length >= 1) && (this.state.designation.length >= 1)) {
                const details = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                   
                    university: this.state.university,
                    designation: this.state.designation
                }
                // console.log(details)

                Axios.post("http://localhost:5000/signup", { details })
                    .then(res => {
                        alert(res.data.statusMessage);
                        this.setState({
                            firstname:"",
                            lastname:"",
                            email:"",            
                            university:"",
                            designation:"",
                        });
                        Array.from(document.querySelectorAll("input")).forEach(
                            input => (input.value = "")
                        );


                    })
                    .catch((err) => {
                        alert(err.response);
                    });
            }
            else {
                alert("Enter Proper Details");
            }

        }


    }

    handleInputChange = e => {
        let inputValue = e.target.value.trim();
        // console.log(inputValue)
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    

    

    render() {
        return (
            <div>
                <Container component="main" maxWidth="xs" dark>
                    <CssBaseline />
                    <div className={this.state.classes.paper}>
                        <Typography component="h1" variant="h5" style={{marginTop: '20%', marginBottom: '10%'}}>
                            Register Your Department
                        </Typography>
                        <form className={this.state.classes.form} noValidate onSubmit={this.sendValues}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Firstname"
                                        autoFocus
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Lastname"
                                        name="lastname"
                                        autoComplete="lname"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="university"
                                        label="Department"
                                        autoComplete="university"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="designation"
                                        label="Employee Designation"
                                        autoComplete="Employee Designation"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={this.state.classes.submit}
                                style={{marginTop: '8%'}}
                            >
                                Register 
                            </Button>
                        </form>
                    </div>

                </Container>
            </div>

           
        )
    }
}