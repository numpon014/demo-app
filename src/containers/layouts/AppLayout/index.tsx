import { Outlet } from 'react-router-dom';
import { AppWrapper } from './index.style';

function AppLayout() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}

export default AppLayout;
