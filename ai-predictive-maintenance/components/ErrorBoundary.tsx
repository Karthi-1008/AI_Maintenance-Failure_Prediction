import React, { Component, ErrorInfo, ReactNode } from 'react';
import Card from './Card.tsx';
import Icon from './Icon.tsx';
import { ICONS } from '../constants.tsx';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card title="Component Error" className="border-red-500/50">
            <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
                <Icon className="w-12 h-12 mb-4">{ICONS.ALERT_TRIANGLE}</Icon>
                <h4 className="font-semibold text-lg mb-2">Something went wrong.</h4>
                <p className="text-sm text-slate-400 mb-6">
                    This component encountered an error and could not be displayed.
                </p>
                <button
                    onClick={this.handleReset}
                    className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
