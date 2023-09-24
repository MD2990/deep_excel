"use client";
import React from "react";
import { Spinner } from "@chakra-ui/react";
export default function Span() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.200"
      size={["sm", "md", "lg", "xl"]}
    />
  );
}
