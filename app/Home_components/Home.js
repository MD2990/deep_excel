"use client";
import React from "react";
import { Wrap } from "@chakra-ui/react";
import Upload from "./Upload";

export default function Home({ children }) {
  return (
    <Wrap
      justify={"center"}
      align={"center"}
      alignContent={"center"}
      w="full"
      p="2"
      m="2"
      spacing={[2, 4, 8, 12]}
      mt="5%"
    >
      {children}

      <Upload />

    </Wrap>
  );
}
