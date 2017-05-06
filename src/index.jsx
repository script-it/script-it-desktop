import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const fileToOpen = remote.getCurrentWindow().loadSettings.fileToOpen;

ReactDOM.render(<App fileToOpen={fileToOpen} />, document.getElementById('app'));
