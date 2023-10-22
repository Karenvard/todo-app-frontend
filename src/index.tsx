import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Store} from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter basename="/todo-app-frontend">
        <Provider store={Store}>
            <ToastContainer/>
            <App />
        </Provider>
    </BrowserRouter>
);