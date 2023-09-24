import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export function TopBtn({
  title,
  Icons,
  onClick,
  disabled,
  size,
  colorScheme,
  link,
  
}) {
  return (
    <Tooltip
      label={title}
      aria-label={title}
      rounded={"md"}
      bg="gray.300"
      color="blue.500"
      hasArrow
      fontSize={["xx-small", "xs"]}
    >
      <Box p="0.2">
        {onClick ? (
          <IconBtn
            {...{
              title,
              Icons,
              onClick,
              disabled,
              size,
              colorScheme,
           
              
            }}
          />
        ) : (
          <Link href={link}>
            <IconBtn
              {...{
                title,
                Icons,
                onClick,
                disabled,
                size,
                colorScheme,
                
              }}
            />
          </Link>
        )}
      </Box>
    </Tooltip>
  );
}

export default function IconBtn({
  title,
  Icons,
  onClick,
  disabled,
  size = ["xl", "3xl", "5xl"],
  colorScheme = "gray",
}) {
  return (
    <IconButton
      isDisabled={disabled}
      variant={"link"}
      aria-label={title}
      fontSize={size}
      icon={Icons}
      onClick={onClick || null}
      colorScheme={colorScheme}
    />
  );
}
