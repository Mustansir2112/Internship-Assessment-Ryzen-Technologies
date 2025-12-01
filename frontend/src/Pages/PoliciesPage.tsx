import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RawPolicy {
  _id: string;
  customer_id: {
    name: string;
    email: string;
    city: string;
  };
  policy_type: string;
  premium_amount: number;
  start_date: string;
  end_date: string;
  status: "active" | "expired";
}

interface CustomerInfo {
  name: string;
  email: string;
  city: string;
}

interface Policy {
  _id: string;
  customer_id: CustomerInfo;
  policy_type: string;
  premium_amount: number;
  start_date: Date;
  end_date: Date;
  status: "active" | "expired";
}

export default function PolicyListPage() {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [cityInput, setCityInput] = useState("");
  const [policiesData, setPoliciesData] = useState<Policy[]>([]);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    policy_type: "",
    status: "",
    city: "",
  });

  const totalPages = Math.ceil(policiesData.length / pageSize);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams();

        if (filters.policy_type)
          query.append("policy_type", filters.policy_type);
        if (filters.status) query.append("status", filters.status);
        if (filters.city) query.append("city", filters.city);

        const res = await fetch(
          `http://localhost:3000/api/policies/getPolicies?${query.toString()}`
        );

        const data = await res.json();

        const converted: Policy[] = (data.policies as RawPolicy[]).map((p) => ({
          ...p,
          start_date: new Date(p.start_date),
          end_date: new Date(p.end_date),
        }));

        setPoliciesData(converted);
        setPage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const paginated = policiesData.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (loading) {
    return <div className="w-full max-w-6xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Policy Type</Label>
          <select
            className="h-10 px-3 border rounded-md bg-background"
            value={filters.policy_type}
            onChange={(e) => handleFilterChange("policy_type", e.target.value)}
          >
            <option value="">All</option>
            <option value="health">Health</option>
            <option value="car">Car</option>
            <option value="life">Life</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <select
            className="h-10 px-3 border rounded-md bg-background"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Input
            placeholder="Search by city..."
            className="h-10"
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter" && cityInput === "") {
                setFilters((prev) => ({ ...prev, city: "" }));
              }
              if (e.key === "Enter" && cityInput !== "") {
                handleFilterChange("city", cityInput);
              }
            }}
          />
        </div>
      </div>

      <Table>
        <TableCaption>List of all policies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Policy Type</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.customer_id?.name || "-"}</TableCell>
              <TableCell>{p.customer_id?.city || "-"}</TableCell>
              <TableCell>{p.policy_type}</TableCell>
              <TableCell>{p.premium_amount}</TableCell>
              <TableCell>{p.start_date.toISOString().split("T")[0]}</TableCell>
              <TableCell>{p.end_date.toISOString().split("T")[0]}</TableCell>
              <TableCell className="capitalize">{p.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center pt-6 w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
