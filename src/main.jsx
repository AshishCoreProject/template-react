import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import PostContext from './context/PostContext.jsx';
import {PostProvider, PostContext} from './context/PostContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PostProvider>
            <App />
        </PostProvider>
    </React.StrictMode>,
)
