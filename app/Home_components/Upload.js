import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  useToast,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import FileUpload from "@components/Lib/Fields";
import { useSnapshot } from "valtio";
import state from "@app/_store";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Upload() {
  const toast = useToast();
  const ref = useRef("");
  const snap = useSnapshot(state);
  const router = useRouter();

  useEffect(() => {
    //to get new data from server
    router.refresh();
    //to clear the title of uploaded file
    document.body.addEventListener("click", () => (state.title = ""));
    return () => {
      document.body.removeEventListener("click", () => {
        state.title = "";
      });
    };
  }, [router]);

  function fileHandler(e) {
    try {
      const { files } = e.target;
      state.theFile = files;
      state.title = "";
    } catch (error) {
      state.title = error.message;

      toast({
        description: error.message,
        title: "Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      state.btn = true;
      //  const files = state.theFile ? [...state.theFile] : [];
      // validate file type
      const validExts = [".xlsx", ".xls"];
      // check if the file type is valid

      let fileExt = state.theFile[0].name;
      fileExt = fileExt.substring(fileExt.lastIndexOf("."));
      if (!validExts.includes(fileExt)) {
        state.title = `Invalid file type [ ${state.theFile[0].name} ] , only ${validExts} are allowed`;
        toast({
          description: state.title,
          title: "Error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        state.btn = false;
        return;
      }

      const formData = new FormData();
      formData.append("file", state.theFile[0]);

      await axios.post(`${process.env.NEXT_PUBLIC_IP}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        description: state.theFile[0].name,
        title: "Uploaded Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      state.title = "Uploaded Successfully";
      state.btn = false;
    } catch (err) {
      state.title = err.response?.data?.msg || err.message;
      state.btn = false;
      toast({
        description:
          "Something went wrong, Please check your file and try again",
        title: `File: ${state.theFile[0]?.name || "Error"}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      state.btn = false;
      state.theFile = [];
      ref.current.value = "";
      router.refresh();
    }
  };
  return (
    <WrapItem>
      <VStack
        justify={"center"}
        align={"center"}
        minH="50vh"
        textAlign="center"
      >
        <Text
          noOfLines="1"
          fontSize={["xs", "sm", "md"]}
          fontFamily={"monospace"}
          fontWeight={"bold"}
          textTransform={"capitalize"}
          letterSpacing={"tighter"}
          color={snap.title.includes("Successfully") ? "green.500" : "red.500"}
        >
          {snap.title}
        </Text>

        <Box maxW="55%" minW="25rem" p="2" m="2" w="full">
          <form onSubmit={handleSubmit}>
            <FileUpload
              labelName={"Upload File"}
              refs={ref}
              fileHandler={fileHandler}
            />
            {snap.theFile.length > 0 ? (
              <Box alignContent={"center"} textAlign={"center"}>
                {Array.from(snap.theFile).map((file, index) => (
                  <Text key={index} fontSize={"xs"} fontFamily={"monospace"}>
                    {file.name}
                    {" - "}
                    {Math.round(
                      (file.size / (1024 * 1024) + Number.EPSILON) * 100
                    ) / 100}
                    MB
                  </Text>
                ))}
              </Box>
            ) : null}

            <HStack
              justify={"center"}
              align={"center"}
              spacing={[1, 2]}
              alignContent={"center"}
              justifyItems={"center"}
              justifySelf={"center"}
              alignSelf={"center"}
            >
              <Button
                py="1"
                my="1"
                colorScheme="green"
                variant="solid"
                disabled={snap.btn}
                type="submit"
                size={["sm", "md"]}
                loadingText="Uploading"
                isLoading={snap.btn}
                isDisabled={snap.theFile.length === 0}
              >
                Upload
              </Button>
              <Button
                py="1"
                my="1"
                colorScheme="red"
                variant="solid"
                isDisabled={snap.theFile.length === 0}
                size={["sm", "md"]}
                onClick={() => {
                  ref.current.value = "";
                  state.theFile = [];
                  state.title = "";
                }}
              >
                Clear
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </WrapItem>
  );
}
