import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";

export default async function Page() {
  const customers = await fetchFilteredCustomers("");

  return (
    <div className="w-full">
      <Table customers={customers} />
    </div>
  );
}
