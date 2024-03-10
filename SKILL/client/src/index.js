import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Firstopen from './first';
import { BrowserRouter as Router } from 'react-router-dom';

function Website() {
  return (
    <Router>
      <Firstopen />
    </Router>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
