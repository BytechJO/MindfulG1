import React from "react";
import { cn } from "./utils";

function Skeleton(props) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", props.className)}
      {...props}
    />
  );
}

export { Skeleton };
