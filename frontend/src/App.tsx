import "react-toastify/dist/ReactToastify.css";
import "assets/styles/custom.scss";
import Routes from "Routes";

import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
