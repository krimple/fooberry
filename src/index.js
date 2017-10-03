import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (navigator.userAgent.indexOf('Edge') > -1) {
  alert('IE and Edge not supported. Please use Safari, Firefox or Chrome...');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
