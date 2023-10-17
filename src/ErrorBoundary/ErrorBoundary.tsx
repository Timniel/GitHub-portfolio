import React, { Component, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(): void {
    console.error("Error caught by boundary");
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <h1 className="mx-auto text-white text-3xl italic font-medium ">
          Something went wrong.
        </h1>
      );
    }

    return <Outlet />;
  }
}

export default ErrorBoundary;
