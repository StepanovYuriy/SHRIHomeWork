import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PageStartScreen from './blocks/pages/PageStartScreen/PageStartScreen';
import PageSettings from './blocks/pages/PageSettings/PageSettings';
import PageBuildHistory from './blocks/pages/PageBuildHistory/PageBuildHistory';
import PageBuildDetails from './blocks/pages/PageBuildDetails/PageBuildDetails';

const App = () => (
    <BrowserRouter>
        <nav style={{ position: 'absolute' }}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/build-history">Build History</Link>
                </li>
                <li>
                    <Link to="/build-details">Build Details</Link>
                </li>
            </ul>
        </nav>

        <Switch>
            <Route path="/build-history">
                <PageBuildHistory />
            </Route>
            <Route path="/build-details">
                <PageBuildDetails />
            </Route>
            <Route path="/settings">
                <PageSettings />
            </Route>
            <Route path="/">
                <PageStartScreen />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
