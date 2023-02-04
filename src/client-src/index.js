/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import controller from './Controller.js'

import './assets/fonts/typeface-roboto/index.css';
import './assets/fonts/material-icons/index.css';
import './assets/css/style.css';

ReactDOM.render(<App controller={controller}/>,
                document.getElementById('root')
)
