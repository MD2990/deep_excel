import { Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <Link href="/">
      <VStack justify="center" minHeight="70vh" m="2" px="4" userSelect="none">
        <Text
          px="4"
          mx="4"
          className="blob"
          fontSize={["md", "lg", "3xl", "6xl"]}
          textAlign="center"
          noOfLines={1}
          color="blackAlpha.600"
          fontWeight="bold"
          textShadow=" 20px 20px 5px lightGray"
        >
          <Text as="span" fontSize={["xl", "2xl", "6xl", "9xl"]}>
            S
          </Text>
          omething went wrong, Please try again !!! ⚠
        </Text>
      </VStack>
    </Link>
  );
}
