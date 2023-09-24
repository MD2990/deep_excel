import { Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FcAddDatabase } from "react-icons/fc";
import { TopBtn } from "../Lib/BTNs";
import Total from "./Total";

export default function Top({
  total,
  link,
  title,
  mt,
  children,
  noAddBtn,
}) {
  return (
    <Wrap
      direction={"row"}
      w='full'
      justify="space-between"
      spacing={[4, 8, 12, 16]}
      p="1"
      align={"flex-end"}
      m="1"
      ml={{ base: "3.5rem", md: "1rem" }}
      mt={mt}
      bg="gray.100"
      rounded={"lg"}
      boxShadow="lg"
    >
      {children}
      {!noAddBtn && (
        <WrapItem>
          <TopBtn link={link} title={title} Icons={<FcAddDatabase />} />
        </WrapItem>
      )}
      <WrapItem></WrapItem>
      <WrapItem>
        <Total total={total} />
      </WrapItem>
    </Wrap>
  );
}
