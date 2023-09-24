import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Center,
  TableContainer,
  Input,
} from "@chakra-ui/react";



function addOrRemoveObject(input, array, keyName) {
  const existingIndex = array.findIndex(
    (item) => item[keyName] === input.trim()
  );

  if (existingIndex !== -1) {
    // If the input already exists, remove the object
    array.splice(existingIndex, 1);

    return [...array];
  }

  // Add the new object with the provided key-value pair

  const newObject = { [keyName]: input };
  array.push(newObject);
  return [...array];
}





function MyTable({
  size = "sm",
  data,
  tableTitle,
  tableHeads,
  tableRows,
  colorScheme,
  color,
  subTitle,
  arr,
  numberFiled,
}) {
  const TheTable = () => {
    const inputRefs = React.useRef({});
    return (
      <>
        <Thead>
          <Tr>
            {tableHeads.map((e, i) => {
              return (
                <Th
                  border={`0.1px solid #C5C5C5`}
                  textAlign="center"
                  fontSize={["sm"]}
                  fontFamily={"serif"}
                  color="gray.600"
                  fontWeight={"black"}
                  py="1"
                  key={i}
                  textTransform={"none"}
                >
                  {e}
                  <Center pt="1">
                    <Input
                      disabled={numberFiled?.includes(e)}
                      type="search"
                      ref={(inputRef) => (inputRefs.current[e] = inputRef)}
                      size={"xs"}
                      noOfLines={1}
                      placeholder={"Filter: " + e}
                      textAlign={"center"}
                      onKeyDown={(ee) => {
                        // on Enter key press
                        if (ee.key === "Enter" && ee.target.value.trim()) {
                          const value = ee.target.value.trim();
                          addOrRemoveObject(value, arr, e);
                          ee.target.value = "";
                        }
                      }}
                    />
                  </Center>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody fontSize={["sm", "md", "lg", "xl"]}>
          {data.map((t, index) => {
            return (
              <Tr key={index}>
                {tableRows.map((e, i) => (
                  <Td
                    key={i}
                    textOverflow={"ellipsis"}
                    whiteSpace="nowrap"
                    overflow={"hidden"}
                    maxW="25rem"
                  >
                    {t[e]}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </>
    );
  };

  if (!data?.length)
    return (
      <Center
        userSelect={"none"}
        whiteSpace={"nowrap"}
        overflow="hidden"
        textOverflow="ellipsis"
        m="2"
        p="2"
        minHeight="40vh"
      >
        <Text
          textAlign={"center"}
          fontSize={["md", "2xl", "4xl", "6xl"]}
          fontWeight="black"
          color={color}
          fontFamily="cursive"
        >
          Nothing to Show...
        </Text>
      </Center>
    );

  return (
    <TableContainer p="2" m="2">
      <Table variant="striped" colorScheme={colorScheme} size={size}>
        <TableCaption
          userSelect={"none"}
          placement="top"
          fontSize={["xl", "2xl", "3xl", "5xl"]}
          textDecoration="underline"
          textShadow={`0px 0px 10px #d0d9d2`}
      
     
        >
          <Text
            color={color}
            textDecoration="underline "
            fontSize={["2xl", "3xl", "4xl"]}
            noOfLines="1"
            whiteSpace={"break-spaces"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            textAlign={"center"}
          >
            {tableTitle}
           
      
          
          </Text>
        </TableCaption>

        <TheTable />
      </Table>
    </TableContainer>
  );
}



export default MyTable;
