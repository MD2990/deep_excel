import React, { useEffect, useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { FcPrint } from "react-icons/fc";
import { TopBtn } from "@components/Lib/BTNs";
import Select from "react-select";
import printPdf from "@lib/print";
import state from "@app/_store";
import { useSnapshot } from "valtio";
import { getLocalStorage, setLocalStorage } from "@lib/helpers";
import { useSearchParams } from "next/navigation";

function PrintModal({
  children,
  isOpen,
  onClose,
  onOpen,
  data,
  titlesFilter = ["_id", "__v"],
  newTitlesFilter,
  size = ["sm", "lg", "3xl", "5xl"],
}) {
  const snap = useSnapshot(state);
  const router = useSearchParams();
  const id = router.get("id");

  const filteredTitles = useMemo(
    () => (newTitlesFilter ? newTitlesFilter : titlesFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const uniqueQuery = useMemo(
    () => id + 1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // add a unique key to the query object

  useEffect(() => {
    if (!data?.length) return;

    const localData = getLocalStorage(uniqueQuery) || [];
    state.titles = localData;

    let ss = [];
    let value = Object.keys(...data).filter((v) => !filteredTitles.includes(v));
    let label = Object.keys(...data)
      .filter((v) => !filteredTitles.includes(v))
      .map((L) => L);
    value.map((s, index) => {
      ss.push({ value: s, label: label[index] });
    });

    state.selectedOptions = ss;

    return () => {
      state.titles = [];
    };
  }, [data, filteredTitles, router.pathname, uniqueQuery]);

  function printSelected() {
    printPdf({
      DB: data,
      titles: state.titles,
      keysFilter: state.titles,
      title: state.title,
      leftTitle: `Total: ${data.length}`,
      style: "l",
    });
  }

  return (
    <>
      {data?.length ? (
        <>
          <TopBtn title="Print Options" onClick={onOpen} Icons={<FcPrint />} />
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={size}
          >
            <ModalOverlay />
            <ModalContent>
              {/*  if needed can be used as top title =>    <ModalHeader color="blackAlpha.600" fontSize={[12, 15, 18, 20]}>
            {title}
          </ModalHeader> */}
              <ModalCloseButton />
              <ModalBody>
                <Select
                  closeMenuOnSelect={false}
                  options={state.selectedOptions}
                  id={"select"}
                  isMulti
                  defaultValue={getLocalStorage(uniqueQuery) || []}
                  onChange={(e) => {
                    setLocalStorage(uniqueQuery, e);

                    state.titles = e;
                  }}
                />
                {children}
              </ModalBody>

              <ModalFooter alignSelf="center">
                <Button
                  colorScheme="gray"
                  onClick={onClose}
                  size={["xs", "sm", "md"]}
                  mr="2"
                >
                  Cancel
                </Button>
                <TopBtn
                  disabled={snap.titles.length < 1}
                  title="Print"
                  Icons={<FcPrint />}
                  onClick={() => {
                    printSelected();
                    onClose();
                  }}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>{" "}
        </>
      ) : null}
    </>
  );
}
export default React.memo(PrintModal);
