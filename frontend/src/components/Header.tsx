import React from "react";
import { Button } from "@/components/ui/button";
export type NavOption =
  | "customers"
  | "policies"
  | "add-customer"
  | "add-policy";

interface HeaderNavProps {
  active?: NavOption;
  onNavigate?: (option: NavOption) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  active = "customers",
  onNavigate,
}) => {
  const navItems = [
    { id: "customers" as NavOption, label: "Customers" },
    { id: "policies" as NavOption, label: "Policies" },
    { id: "add-customer" as NavOption, label: "Add Customer" },
    { id: "add-policy" as NavOption, label: "Add Policy" },
  ];

  const handleClick = (id: NavOption) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <header className="w-full border-b bg-linear-to-b from-background to-muted/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center justify-between h-16"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleClick(item.id)}
                  className={`
                    relative px-5 py-2 h-10 rounded-lg
                    font-medium text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? "text-foreground bg-primary/10 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              );
            })}
          </div>
          <div className="flex items-center space-x-2"></div>
        </nav>
      </div>
    </header>
  );
};
