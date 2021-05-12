import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.output.css';

const App = () => (
  <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
    <div className="ml-6 pt-1">
      <h1 className="text-2xl text-blue-700 leading-tight bg-gre">
        Tailwind and Create React App
      </h1>
      <p className="text-base text-gray-700 leading-normal">
        Building apps together
      </p>
    </div>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));