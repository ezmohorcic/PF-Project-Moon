import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from "./ReduxToolkit/store";
import { PersistGate } from 'redux-persist/integration/react'

import App from "./App.jsx";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);