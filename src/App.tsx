import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AnimalDetails from './components/AnimalDetails';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<AnimalDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ErrorBoundary from './components/ErrorBoundary';
// import Home from './components/Home';
// import AnimalDetails from './components/AnimalDetails';
// import NotFound from './components/NotFound';

// const App = () => {
//   return (
//     <ErrorBoundary>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />}>
//             <Route path="details/:id" element={<AnimalDetails />} />
//             <Route path="hi" element={<AnimalDetails />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </ErrorBoundary>
//   );
// };

// export default App;
