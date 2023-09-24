"use client";
import { Tag, TagLabel, WrapItem, HStack, Divider } from "@chakra-ui/react";
import React, { useRef } from "react";
import state from "@app/_store";
import { cleanApp, handleApiChange } from "./showData";
import  colors  from "@lib/const";
import { TopBtn } from "@components/Lib/BTNs";
import { FcClearFilters, FcSearch } from "react-icons/fc";

export default function  FilterSection({ serverData, count }) {
  const myColors = useRef(colors);
  return (
    <>
      {state.filteredData?.map((v, i) => (
        <WrapItem
          cursor={"pointer"}
          key={i}
          onClick={() => {
            // remove the selected filter from the array
            state.filteredData = state.filteredData.filter((_v, index) => {
              const f = index !== i;

              // remove the value from the powerKey array
              if (state.filteredData.length === 1) {
                cleanApp({
                  serverData,
                  count,
                });
              }
              return f;
            });


          }}
        >
          <Tag
            colorScheme={
              // get random color for each tag
              myColors?.current[i]
            }
            size={"sm"}
            _hover={{ bg: "teal.500", color: "white" }}
          >
            <TagLabel>
              {Object.keys(v)}
              {": "}
              {Object.values(v).toString().replace(",", "~")}
            </TagLabel>
          </Tag>
        </WrapItem>
      ))}

      <Divider />

      <FilterTags serverData={serverData} count={count} />
    </>
  );
}

function FilterTags({ serverData, count }) {
  return (
    <HStack>
      <TopBtn
        title="Clear All Filters"
        onClick={() => {
          cleanApp({
            serverData,
            count,
          });
        }}
        Icons={<FcClearFilters />}
        size={"2xl"}
      />
      <TopBtn
        title="Search"
        onClick={() => {
          state.postData =  [...state.filteredData]
           
          state.api = "filter";
          handleApiChange();
          state.isFilteredData = true;
        }}
        Icons={<FcSearch />}
        size={"2xl"}
      />
    </HStack>
  );
}
