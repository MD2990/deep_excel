"use client";
import React from "react";
import { Button, Center } from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    // eslint-disable-next-line no-console
    console.log({ error });
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center p="1" m="1">
          <Button
            size={["xs", "sm", "md", "lg"]}
            fontSize={["xs", "sm", "md", "lg", "xl"]}
            color={"red.400"}
            fontWeight={"bold"}
            fontFamily={"mono"}
            variant={"unstyled"}
            onClick={() => {
              this.setState({ hasError: false });

              // refresh the page
              window.location.reload();
            }}
          >
            Something went wrong, Please try again ...
          </Button>
        </Center>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
