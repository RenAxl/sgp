import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

import './styles.css';

const Auth = () => {

    return (
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Venha conhecer o SGP</h1>
                <p>O SGP irá ajudar a lidar com a complexidade da área de rede de transporte</p>
                <AuthImage />
            </div>
            <div className="auth-form-container">
                <Switch>
                    <Route path="/admin/auth/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Auth;



