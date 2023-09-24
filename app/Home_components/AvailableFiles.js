import React from "react";
import {
  UnorderedList,
  ListItem,
  Box,
  Text,
  WrapItem,
} from "@chakra-ui/layout";
import Link from "next/link";
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/getData`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}
export const dynamic = "force-dynamic";

export default async function AvailableFiles() {
  const data = await getData();

  return (
    <WrapItem color={"gray.500"}>
      <Box>
        <Text
          color={"blue.700"}
          fontWeight={"bold"}
          textDecoration={"underline"}
          noOfLines={1}
        >
          Available Files in Database: {data?.length}
        </Text>

        <UnorderedList>
          {data?.map((name, i) => (
            <Link key={i} href={`/data/${name}`}>
              <ListItem
                _hover={{
                  bg: "gray.500",
                  color: "white",
                  rounded: "md",
                  textShadow: "1px 1px 7px white",
                }}
                p="0.5"
              >
                <Text noOfLines={1} fontSize={["xs", "sm", "md"]}>
                  {name}
                </Text>
              </ListItem>
            </Link>
          ))}
        </UnorderedList>
      </Box>
    </WrapItem>
  );
}
