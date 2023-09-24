import { HStack, Input } from "@chakra-ui/react";
import React from "react";
import { FcSearch } from "react-icons/fc";
import { BiLoaderCircle } from "react-icons/bi";
import { useSnapshot } from "valtio";
import state from "@app/_store";
import TopBtn from "./BTNs";

export default function SearchInputField({ onClick }) {
  const snap = useSnapshot(state);

  const handleChange = (e) => {

    state.searchTerm = e.target.value;

    if (state.searchTerm === "" || state.searchTerm.length === 0) {
      state.isFilteredData = false;
      state.currentPage = 0;
      state.api = "defaultApi";
     
    }
  };
  return (
    <HStack
      rounded="2xl"
      bg="gray.200"
      m="2"
      w="50%"
      justify={"center"}
      align={"center"}
    >
      <Input
        isDisabled={snap.isLoading}
        fontSize={["sm", "md", "lg", "xl"]}
        textAlign="center"
        p="4"
        mx="4"
        minW="5rem"
        size={["xs", "sm", "md", "lg"]}
        type="search"
        placeholder="Search by any field"
        value={snap.searchTerm}
        onChange={handleChange}
        focusBorderColor="gray.200"
        /*
          if enter is pressed, the search button is clicked
        */
        onKeyDown={(e) => {
          if (e.key === "Enter" && state.searchTerm?.length > 1) {
            onClick();
          }
        }}
      />
      <TopBtn
        onClick={onClick}
        title={"Search"}
        Icons={snap.isLoading ? <BiLoaderCircle /> : <FcSearch />}
        disabled={snap.searchTerm.length < 2 || snap.isLoading}
        
      />
    </HStack>
  );
}
