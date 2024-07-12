import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import Hi from './components/Hi';
import Home from './components/Home';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hi" element={<Hi />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
