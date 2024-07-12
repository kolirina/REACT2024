import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  // onRestart: () => void;
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
    // this.props.onRestart();
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong🙀</h2>
          <button onClick={this.handleRestartClick}>Restart</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
