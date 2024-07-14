import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);

// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import ErrorBoundary from './components/ErrorBoundary.tsx';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <ErrorBoundary>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </ErrorBoundary>,
// );
