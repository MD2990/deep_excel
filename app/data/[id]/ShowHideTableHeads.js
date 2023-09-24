"use client";
import { Checkbox, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import state from "@app/_store";
import { setLocalStorage } from "@lib/helpers";

export default function ShowHideTableHeads({ id, keys, handleShowHide }) {
  return (
    <Wrap
      direction={["column", "row", "row", "row"]}
      rounded={"md"}
      boxShadow={"md"}
      spacingX={1}
      justify={"start"}
      spacing={1}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      align={"start"}
      p="1"
      m="1"
      justifyContent={"start"}
      alignItems={"start"}
      justifySelf={"start"}
      alignSelf={"start"}
      fontSize={["xs", "sm", "md"]}
      fontFamily={"body"}
      fontWeight={"normal"}
      color={"gray.600"}
    >
      <WrapItem>
        <Checkbox
          color={`${
            state.tableHeads.length === state.keys.length
              ? "green.500"
              : "gray.500"
          }`}
          colorScheme={`${
            state.tableHeads.length === state.keys.length ? "green" : "gray"
          }`}
          size={["xs", "sm", "md"]}
          value={
            state.tableHeads.length === state.keys.length &&
            state.tableHeads.length > 0
          }
          isChecked={
            state.tableHeads.length === state.keys.length &&
            state.tableHeads.length > 0
          }
          isIndeterminate={
            state.tableHeads.length > 0 &&
            !state.tableHeads.includes(state.keys[0])
          }
          onChange={() => {
            if (state.tableHeads.length === 0) {
              state.tableHeads = state.keys;
            } else {
              state.tableHeads = [];
            }

            setLocalStorage(id, state.tableHeads);
          }}
        >
          All
        </Checkbox>
      </WrapItem>

      {
        // show the table heads
        keys.map((v, i) => (
          <WrapItem
            key={i}
            color={`
                ${state.tableHeads.includes(v) ? "green.500" : "gray.500"}`}
          >
            <Checkbox
              colorScheme={`
                ${state.tableHeads.includes(v) ? "green" : "gray"}`}
              size={["xs", "sm", "md"]}
              isChecked={state.tableHeads.includes(v)}
              onChange={handleShowHide}
              value={v}
              isIndeterminate={
                state.tableHeads.length > 0 && !state.tableHeads.includes(v)
              }
            >
              {v}
            </Checkbox>
          </WrapItem>
        ))
      }
    </Wrap>
  );
}
