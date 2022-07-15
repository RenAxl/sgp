import { AuthContext } from "AuthContext";
import "bootstrap/js/src/collapse.js";
import { useContext, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getTokenData, isAuthenticated } from "util/auth";
import { removeAuthData } from "util/storage";

import "./styles.css";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        {" "}
        {/* previne quebra de linha entre logo e itens */}
        <Link to="/" className="nav-logo-text">
          <h4>SGP</h4>
        </Link>
        
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/boards" activeClassName="active">
                PLACAS
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

