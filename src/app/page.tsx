// /app/page.tsx  (server component, root page)
import { Suspense } from "react";
import SearchPage from "@/app/searchBar/SearchPage";
import "@/app/globals.css"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
