import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
class DisplayTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: "",
            loader: false
        }
    }

    componentDidMount() {
        this.setState({
            loader: true
        });
        let self = this;
        axios.get("http://localhost:5000/getUsers/teachers")
            .then((teachersData) => {
                self.setState({
                    teachers: teachersData.data.users,
                    loader: false
                });
            })
            .catch((err) => {
                self.setState({
                    loader: false
                });
            })
    }
    render() {
        let showTeachers = [];
        if (this.state.teachers === "" && this.state.loader === false) {
            showTeachers.push(
                <p>
                    Failed to fetch data.
                </p>
            );
        } else if (this.state.teachers === "") {
            // Nothing to do
        } else if (this.state.teachers.length === 0) {
            showTeachers.push(
                <p>
                    No teacher found!
                </p>
            );
        } else {
            for (let i = 0; i < this.state.teachers.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                showTeachers.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardTitle>ID : {this.state.teachers[i]._id}</CardTitle>
                        <CardText>Email : {this.state.teachers[i].email}</CardText>
                    </Card>
                );
            }
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <AdminHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Display Teachers</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        {showTeachers}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DisplayTeachers;
