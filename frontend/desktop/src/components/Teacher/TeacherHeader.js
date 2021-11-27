import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function TeacherHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Teacher Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/teacher/createExam">Create Exam</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}