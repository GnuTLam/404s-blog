import React, { Component, ErrorInfo, ReactNode } from 'react';
import { config } from '../config/env';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error in development
    if (config.debugMode || config.isDevelopment) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send error to monitoring service
    if (config.isProduction) {
      // Example: Send to error monitoring service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark-950 p-4">
          <div className="max-w-md w-full">
            <div className="glass p-8 rounded-xl text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-light-800 dark:text-white mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-light-600 dark:text-light-400">
                  We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>
              </div>

              {config.debugMode && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">
                    Error Details (Debug Mode):
                  </h3>
                  <pre className="text-xs text-red-700 dark:text-red-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-cyber-600 hover:bg-cyber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-light-200 hover:bg-light-300 dark:bg-dark-800 dark:hover:bg-dark-700 text-light-800 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 