import { RouteComponentProps } from "@reach/router";
import React, {useState} from "react"

import "./Dashboard.css"

type DashboardProps = RouteComponentProps & {

}
const Dashboard = (props: DashboardProps) => {
    return (
        <body className="dashboard-background">
            <div className="dashboard-text">MY PROJECTS</div>
            <button className="button">CREATE NEW</button>
        </body>
    );
}

export default Dashboard;