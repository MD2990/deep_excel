"use client";
import { useToast } from "@chakra-ui/react";
import Swal from "sweetalert2";
import React from "react";




export function successAlert(msg = "Deleted successfully") {
  Swal.fire({
    icon: "success",
    timerProgressBar: true,
    title: msg,
    showConfirmButton: false,
    timer: 2500,
  });
}

export function errorAlert(
  msg = "Something went wrong! Please try Again",
  errorTitle = "Error"
) {
  Swal.fire({
    icon: "error",
    title: errorTitle,
    text: msg,
    timer: 3000,
    timerProgressBar: true,
  });
}

export function NoDataAlert(
  msg = "No data found! Please try Again with different search term.",
  errorTitle = "Nothing Found !!!"
) {
  Swal.fire({
    icon: "info",
    title: errorTitle,
    text: msg,
    timer: 3000,
    timerProgressBar: true,
  });
}

export function Toast() {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function addToast() {
    toastIdRef.current = toast({ description: "some text" });
  }

  return addToast();
}

export async function handleFormDelete({ handleDelete, router }) {
  try {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "error",
      cancelButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      focusCancel: true,
      reverseButtons: true,
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete();
          if (router) router.replace("/");
        }
      })
      .catch((error) => {
        errorAlert(error?.message.toString());
      });
  } catch (error) {
    errorAlert(error?.message.toString());
  }
}


