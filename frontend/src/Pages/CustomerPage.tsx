import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
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

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export default function CustomerPage() {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const pageSize = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:3000/api/customers/getAllCustomers"
        );
        const data = await res.json();

        console.log("Fetched customers:", data);

        // data is already an array
        setAllCustomers(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const totalPages = Math.ceil(allCustomers.length / pageSize);

  const customers = allCustomers.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (newPage: number): void => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (loading) {
    return <div className="w-full max-w-5xl mx-auto p-6">Loading...</div>;
  }
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* TABLE */}
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        className="flex justify-center self-start pt-6 w-full"
        style={{
          all: "revert",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "1.5rem",
        }}
      >
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page - 1);
                }}
              />
            </PaginationItem>

            {/* Page Numbers */}
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

            {/* Next */}
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
