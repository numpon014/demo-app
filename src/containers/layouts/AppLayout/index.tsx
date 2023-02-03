// import { Wrapper } from "./index.style";
import { Outlet } from 'react-router-dom';
import logo from '../../../logo.svg';

function AppLayout() {
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="app-layout-body">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
