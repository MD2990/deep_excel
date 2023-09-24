import { Suspense } from "react";
import AvailableFiles from "./Home_components/AvailableFiles";
import Home from "./Home_components/Home";
import Span from "./Home_components/Span";
import ErrorBoundary from "./Home_components/Error";
export default function Main() {
  return (
    <Home>
      <ErrorBoundary>

      <Suspense fallback={<Span />}>
        <AvailableFiles />
      </Suspense>
      </ErrorBoundary>
    </Home>
  );
}
