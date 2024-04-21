import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {YMaps} from "@pbe/react-yandex-maps";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <YMaps>
            <App/>
        </YMaps>
    </React.StrictMode>,
)
