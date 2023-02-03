import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './containers/pages/HomePage';
import AppLayout from './containers/layouts/AppLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
