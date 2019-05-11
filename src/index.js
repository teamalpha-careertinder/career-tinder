import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import FormPage from "./Containers/Signup"



import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <FormPage /> , document.getElementById('root'));

registerServiceWorker();