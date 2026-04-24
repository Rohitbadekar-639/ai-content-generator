"use client";

import { useLoading } from "@/app/(context)/LoadingContext";
import GlobalLoader from "./global-loader";

export default function GlobalLoaderProvider() {
  const { isLoading, loadingMessage } = useLoading();
  
  return (
    <GlobalLoader show={isLoading} message={loadingMessage} />
  );
}
