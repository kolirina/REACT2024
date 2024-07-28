import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';

test('main.tsx', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.createRoot(container).render(
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>,
  );

  await screen.findByText(/Page/i);

  const elements = document.getElementsByClassName('app-root');
  expect(elements.length).toBe(0);

  container.remove();
});
