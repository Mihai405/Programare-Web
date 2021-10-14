import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Nav  from './Nav';
import  { Shop } from './Shop/Shop.js';
import { Register } from './Auth/Register.js';

export function App(){
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path='/' component={ Shop } />
                <Route path='/login' component={ () => <h1>Login</h1>} />
                <Route path='/register' component={Register} />
            </Switch>
        </BrowserRouter>
    );
}