import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageMain from './blocks/pages/PageMain/PageMain';
import PageSettings from './blocks/pages/PageSettings/PageSettings';
import PageBuildHistory from './blocks/pages/PageBuildHistory/PageBuildHistory';
import PageBuildDetails from './blocks/pages/PageBuildDetails/PageBuildDetails';
import Spinner from './blocks/common/Spinner/Spinner';

const App: React.FC = () => (
    <Suspense fallback={<Spinner />}>
        <BrowserRouter>
            <Switch>
                <Route path="/build-history" component={PageBuildHistory} />
                <Route path="/build/:buildId" component={PageBuildDetails} />
                <Route path="/settings" component={PageSettings} />
                <Route path="/" component={PageMain} />
            </Switch>
        </BrowserRouter>
    </Suspense>
);

export default App;
