import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import Root from './components/Root/Root';
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
