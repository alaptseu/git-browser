import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import App from './components/App';
import Search from './components/Search';
import User from './components/User';
import Repos from './components/Repos'

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search}/>
            <Route path="user/:username/token/:token" component={User}>
                <Route path="repos" component={Repos} />
            </Route>
        </Route>
    </Router>
);


ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
