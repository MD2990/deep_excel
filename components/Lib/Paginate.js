import { Box, HStack } from "@chakra-ui/react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import state from "@app/_store";

export default function Paginate({ handlePageClick, count, loading }) {
  const pageCount = useCallback(() => {
    state.offset = state.currentPage * state.PER_PAGE;
    return Math.ceil(count / state.PER_PAGE);
  }, [count]);

  return (
    <>
      {count > 0 ? (
        <HStack
          p="4"
          m="2"
          align={"center"}
          justify="center"
          boxShadow={"xl"}
          rounded={"lg"}
          userSelect="none"
        >
          <ReactPaginate
            previousLabel={loading ? "⏳" : "← Previous"}
            nextLabel={loading ? "⏳" : "Next →"}
            pageCount={pageCount()}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={loading ? "disabled" : "pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            forcePage={state.currentPage}
          />
          <Box>
            <Menu isLazy>
              <MenuButton
                as={Button}
                rightIcon={<IoChevronDownCircleOutline size={"1.2rem"} />}
                fontSize="xs"
              >
                {` Showing ${
                  state.PER_PAGE <= count ? state.PER_PAGE : count
                } of ${count}`}
              </MenuButton>
              <MenuList>
                {[5, 10, 25, 50, 100, 250, 500, 1000]
                  .filter((i) => i <= count)

                  .map((item, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        state.PER_PAGE = item;

                        // the page is not changing, so we need to set it to 0
                        state.currentPage = 0;
                        handlePageClick({ selected: 0 });
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      ) : null}
    </>
  );
}
