import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';
import '../styles/globals.css'

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
};

export default MyApp;
