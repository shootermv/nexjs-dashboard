import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <Suspense key={query}>
        <Table customers={customers} />
      </Suspense>
    </div>
  );
}
