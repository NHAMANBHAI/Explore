import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-6 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {this.props.fallbackTitle || 'Component Render Exception'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                An unexpected runtime error occurred while rendering this view. The application error boundary captured the exception.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left overflow-x-auto text-[11px] font-mono text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
              <Button onClick={this.handleReset} variant="default" size="sm">
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Rendering
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline" size="sm">
                <Home className="w-3.5 h-3.5" />
                Reload Portal
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
