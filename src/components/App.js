import React from "react";
import {Router, Route, Switch } from "react-router-dom";

import Number from "./Number";
import Wheel from "./Wheel";
import Gift from "./Gift";
import Error from "./Error";
import history from "../history";

const App = () => {
    
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                <Switch>
                    <Route path="/" exact component={Number} />
                    <Route path="/Wheel/:msisdn/:groupName" exact component={Wheel} />
                    <Route path="/Gift/:offerId" exact component={Gift} />
                    <Route path="/ErrorPage" exact component={Error} />
                </Switch>
                </div>
            </Router>
        </div>
    );

};

export default App;