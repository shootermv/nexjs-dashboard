import { fetchFilteredCustomers } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";
export default async function Page() {
  const customers = await fetchFilteredCustomers("");

  return (
    <div className="w-full">
      <Table customers={customers} />
    </div>
  );
}
