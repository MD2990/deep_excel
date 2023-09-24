import React from "react";
import { Box } from "@chakra-ui/react";
import { FormControl as FC } from "@chakra-ui/react";
import { FormLabel, Input } from "@chakra-ui/react";

export default function FileUpload({ labelName, refs, fileHandler }) {
  return (
    <FC cursor={"pointer"} p="2">
      <FormLabel cursor={"pointer"} fontWeight="bold" htmlFor={"file"}>
        {labelName}
      </FormLabel>
      <Box
        boxShadow="md"
        border="solid 1px"
        borderColor="gray.300"
        noOfLines="1"
        rounded="md"
        p="2"
      >
        <Input
          py="10%"
          border={"none"}
          size={["sm", "md", "lg", "xl"]}
          textAlign={"center"}
          id={"file"}
          name="file"
          type={"file"}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          required
          ref={refs}
          onChange={fileHandler}
        />
      </Box>
    </FC>
  );
}
