import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import Container from "./container";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Container />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


// index.js (renderowanie container.js)
//   │
// container.js (renderowanie komponentów)
//     └──  components/
//     ├── translate/
//     │       ├── translate.js(komponent)
//     │       └── translate.ts(logika - funkcje, api request)
//     ├── spinner/
//     │       └── spinner.js(komponent - ten nie wymaga nic poza sass)
//     └──  languages/
//             ├── languages.js(render języków)
//             └── avalibleLanguages.js(object dostępnych języków do tłumaczenia key => value)
