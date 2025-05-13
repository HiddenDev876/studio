import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css'; // Ensure global styles are imported from the correct path

console.log("src/main.jsx executed"); // Entry point confirmation

// Basic Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ errorInfo });
    console.error("Uncaught error in React tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '20px', margin: '20px', border: '1px solid red', backgroundColor: '#ffe0e0', color: 'red', borderRadius: '8px' }}>
          <h1>Application Error</h1>
          <p>Something went wrong. Please check the console for more details or try refreshing the page.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error Details</summary>
            {this.state.error && <p><strong>Error:</strong> {this.state.error.toString()}</p>}
            {this.state.errorInfo && <p><strong>Component Stack:</strong> {this.state.errorInfo.componentStack}</p>}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);