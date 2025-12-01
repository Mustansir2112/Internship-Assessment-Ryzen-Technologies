import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Customer = {
  id: number;
  name: string;
  email: string;
};

interface CustomerComboboxProps {
  customers: Customer[];
  value: string;
  onChange: (value: string) => void;
}

export function CustomerCombobox({
  customers,
  value,
  onChange,
}: CustomerComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedCustomer = customers.find((c) => c.email === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between bg-white border text-foreground"
        >
          {selectedCustomer
            ? `${selectedCustomer.name} (${selectedCustomer.email})`
            : "Select Customer"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] p-0 bg-white border shadow-md rounded-md">
        <Command>
          <CommandInput
            placeholder="Search customer..."
            className="px-3 py-2"
          />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {customers.map((c) => (
                <CommandItem
                  key={c.email}
                  value={c.email}
                  onSelect={() => {
                    onChange(c.email); // RETURN EMAIL
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      c.email === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {c.name} ({c.email})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
