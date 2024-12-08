import { Skeleton } from "@nextui-org/react";
import React from "react";

const CardLoading = ({
    index
}) => {
  return (
    <div
      key={index}
      className="rounded-lg p-4 transform transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="relative w-full h-[230px] bg-gray-200">
        <Skeleton className="w-full h-full rounded-lg">
          <div className="h-full w-full rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="rounded-lg">
          <div className="h-6 w-3/4 bg-default-200" />
        </Skeleton>
        <div className="flex items-center justify-between">
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/2 bg-default-200" />
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/4 bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-4 w-2/5 bg-default-200" />
        </Skeleton>
      </div>
    </div>
  );
};

export default CardLoading;
