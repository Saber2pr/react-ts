import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Title } from './app.style';

export const App = () => {
  return (
    <>
      <Title />
      <main>helloworld</main>
      <footer>footer</footer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
