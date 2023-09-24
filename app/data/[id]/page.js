import React from "react";
import ShowData from "./showData";
import { errorAlert } from "@components/Lib/Alerts";
export const revalidate = 10; // revalidate at most 10 seconds
async function getFiles(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_IP}/getById?database=${id}&pageNumber=0&pageSize=15`
    );

    if (!res) {
      return {
        notFound: true,
      };
    }

    const newData = await fetch(`${process.env.NEXT_PUBLIC_IP}/allValues`, {
      cache: "no-cache",
    });
    const { allData } = await newData.json();

    const { data, count, keys } = await res.json();

    return { data, keys, count, allData } || [];
  } catch (error) {
    errorAlert(error.message.toString());
  }
}

export default async function page({ params }) {
  const id = params?.id;
  const { data: serverData, keys, count, allData } = await getFiles(id);

  return (
    <ShowData
      serverData={serverData || []}
      keys={keys || []}
      count={count}
      allData={allData}
    />
  );
}
