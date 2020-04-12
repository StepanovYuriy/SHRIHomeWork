import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageMain from './blocks/pages/PageMain/PageMain';
import PageSettings from './blocks/pages/PageSettings/PageSettings';
import PageBuildHistory from './blocks/pages/PageBuildHistory/PageBuildHistory';
import PageBuildDetails from './blocks/pages/PageBuildDetails/PageBuildDetails';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/build-history">
                <PageBuildHistory />
            </Route>
            <Route path="/build/:buildId">
                <PageBuildDetails />
            </Route>
            <Route path="/settings">
                <PageSettings />
            </Route>
            <Route path="/">
                <PageMain />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
