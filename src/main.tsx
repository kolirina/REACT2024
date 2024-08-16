import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HookForm from './pages/HookForm.tsx';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import store from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="HookForm" element={<HookForm />} />
            <Route path="UncontrolledForm" element={<UncontrolledForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
