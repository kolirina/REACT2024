'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRestartClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC = () => {
  const darkTheme = useTheme();

  return (
    <div className={darkTheme ? 'dark-ErrorBoundary' : 'light-ErrorBoundary'}>
      <h2>Something went wrong 🙀</h2>
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
};

export default ErrorBoundary;
