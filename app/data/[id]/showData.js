"use client";
import { useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef } from "react";
import MyTable from "@components/Lib/MyTable";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  errorAlert,
  handleFormDelete,
  successAlert,
} from "@components/Lib/Alerts";
import { TopBtn } from "@components/Lib/BTNs";
import Top from "@components/Lib/Top";
import state from "@app/_store";
import { FcDeleteDatabase, FcLeft } from "react-icons/fc";
import PrintModal from "@components/Lib/PrintModal";
import { useSnapshot } from "valtio";
import Paginate from "@components/Lib/Paginate";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@lib/helpers";
import SearchInputField from "@components/Lib/SearchInput";
import ShowHideTableHeads from "./ShowHideTableHeads";
import FilterSection from "./FilterSection";

export function cleanApp({ serverData, count }) {
  state.filteredData.splice(0);
  state.postData = {};
  state.selectedFilter = "";
  state.isFilteredData = false;
  state.currentPage = 0;
  state.api = "defaultApi";
  state.data = serverData;
  state.count = count;
  state.searchTerm = "";
  state.title = "";
}
function apiEndpoints({ index }) {
  const data = {
    textSearch: {
      endpoint: `${process.env.NEXT_PUBLIC_IP}/search?searchTerm=${state.searchTerm}&`,
      method: "GET",
    },
    filter: {
      endpoint: `${process.env.NEXT_PUBLIC_IP}/filter?`,
      method: "POST",
    },

    defaultApi: {
      endpoint: `${process.env.NEXT_PUBLIC_IP}/getById?`,
      method: "GET",
    },
    // Add more APIs and their corresponding endpoints and methods here
  };
  return data[index];
}

async function fetchApiData(endpoint, method) {
  try {
    state.isLoading = true;
    let apiUrl = endpoint;
    apiUrl += `pageNumber=${state.currentPage}&pageSize=${state.PER_PAGE}&database=${state.id}`;
    let response;
    if (method === "GET") {
      // Perform GET request
      response = await fetch(`${apiUrl}`);
    } else if (method === "POST") {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.postData),
      });
    }

    if (response?.ok) {
      const { data, count } = await response.json();
      state.isFilteredData = true;
      state.data = data;
      state.count = count;
    }
  } catch (error) {
    errorAlert(error.message.toString());
    state.isFilteredData = false;
  } finally {
    state.isLoading = false;
  }
}
export function handleApiChange() {
  const { endpoint, method } = apiEndpoints({
    index: [state?.api || "defaultApi"],
  });
  fetchApiData(endpoint, method);
}

export default function ShowData({ serverData, keys, allData, count }) {
  // get page params
  const searchParams = useParams();
  const { id } = searchParams;

  const router = useRouter();
  const snap = useSnapshot(state);

  const { isOpen, onOpen, onClose } = useDisclosure();
  let fieldNames = useRef([]);
  useEffect(() => {
    fieldNames.current = Object.values(
      allData || getLocalStorage(id) || []
    )?.map((obj) => obj?.field_name || []);
  }, [allData, id]);
  useEffect(() => {
    state.dbData = serverData;
    state.dbDataCount = count;
    state.keys = keys;
    state.title = id.replace(/%20/g, " ");
    state.id = id;
    state.tableHeads = getLocalStorage(id) || state.keys;

    return () =>
      cleanApp({
        serverData,
        count,
      });
  }, [count, id, keys, serverData]);

  const handleShowHide = useCallback(
    (e) => {
      const { value, checked } = e.target;

      if (checked) {
        if (state.tableHeads.includes(value)) return;
        state.tableHeads.push(value);
        setLocalStorage(id, state.tableHeads);
      } else {
        state.tableHeads = state.tableHeads.filter((v) => v !== value);
        setLocalStorage(id, state.tableHeads);
      }

      // save all checked columns to local storage
    },
    [id]
  );

  const deleteFunc = useCallback(() => {
    handleFormDelete({
      // that will be called when the user confirms the delete.
      handleDelete: () => {
        // Send the delete request to server.
        axios
          .delete(`${process.env.NEXT_PUBLIC_IP}/delete/${id}`)
          .then((res) => {
            // clear the local storage
            removeLocalStorage(id);
            removeLocalStorage(id + 1);
            // state.data = [];

            successAlert(res?.data?.message || undefined);
          })

          .catch((error) =>
            errorAlert(
              error?.response?.data?.message || error?.message || undefined
            )
          );
      },
      router,
    });
  }, [id, router]);

  async function handlePageClick({ selected: selectedPage }) {
    state.currentPage = selectedPage;
  }

  return (
    <>
      <ShowHideTableHeads {...{ id, keys, handleShowHide }} />

      <VStack m="2" justify={"center"}>
        <SearchInputField
          onClick={() => {
            state.isFilteredData = true;
            state.api = "textSearch";
            handleApiChange();
            //  fetchData();
          }}
        />

        <Top
          mt={"1%"}
          data={snap.isFilteredData ? state.data : state.dbData}
          total={
            `${snap.isFilteredData ? snap.count : count}  of ${count}` ||
            "No Data"
          }
          link="/"
          title="Add New Data"
          noAddBtn
        >
          <TopBtn
            title="Back"
            onClick={() => router.back()}
            Icons={<FcLeft />}
          />{" "}
          <TopBtn
            title="Delete Current Data Set"
            onClick={deleteFunc}
            Icons={<FcDeleteDatabase />}
          />
          <PrintModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            data={snap.isFilteredData ? state.data : state.dbData}
            size="2xl"
            title={id.replace(/%20/g, " ")}
          />
        </Top>

        {snap.filteredData.length && (
          <Wrap
            boxShadow={"lg"}
            rounded={"md"}
            maxW="50%"
            maxH={"50%"}
            justify={"center"}
            spacing={1}
            p="1"
            m="1"
          >
            <FilterSection
              serverData={serverData}
              count={count}
              handleApiChange={handleApiChange}
            />
          </Wrap>
        )}

        <MyTable
          color="teal.300"
          size={"sm"}
          tableTitle={id.replace(/%20/g, " ")}
          data={state.isFilteredData ? snap.data : serverData}
          colorScheme={"teal"}
          tableHeads={snap.tableHeads}
          tableRows={snap.tableHeads}
          arr={state.filteredData}
          numberFiled={fieldNames?.current}
        />

        <Paginate
          handlePageClick={(e) => {
            handlePageClick(e);
            handleApiChange();
          }}
          count={state.isFilteredData ? state.count : count}
          loading={snap.isLoading}
        />
      </VStack>
    </>
  );
}
