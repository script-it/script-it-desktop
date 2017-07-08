import { remote } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const filename = remote.getCurrentWindow().loadSettings.filename;

ReactDOM.render(<App filename={filename} />, document.getElementById('app'));
