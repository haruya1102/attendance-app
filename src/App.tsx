import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
const Home = React.lazy(() => import('./components/Home/Home'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
