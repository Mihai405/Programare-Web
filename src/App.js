import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Nav  from './Nav';
import { Register } from './Register';

export function App(){
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path='/' component={ () =><h1>HomePage</h1>} />
                <Route path='/login' component={ () => <h1>Login</h1>} />
                <Route path='/register' component={Register} />
            </Switch>
        </BrowserRouter>
    );
}