import { Stat, StatLabel, Text } from "@chakra-ui/react";
import React from "react";

export default function Total({ total ,color }) {
  return (
    <Stat>
      <StatLabel
        color={ color || "blue.300"}
        whiteSpace={"nowrap"}
        fontSize={[8, 10, 15]}
        userSelect="none"
      >
        Showing:{" "}
        <Text
          textShadow="1.8px 0.1px  1px #add8d6"
          ml="2"
          as="span"
          color={ color || "blue.600"}
          fontWeight="bold"
          fontSize={[8, 10, 15]}
        >
          {total}
        </Text>
      </StatLabel>
    </Stat>
  );
}
