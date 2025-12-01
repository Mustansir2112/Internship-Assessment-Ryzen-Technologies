import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const AddCustomerForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [allFilled, setAllFilled] = useState(true);
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.city) {
      setError("All fields are required");
      setAllFilled(false);
      return;
    }
    setAllFilled(true);
    const res = await fetch("http://localhost:3000/api/customers/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.message || "Failed to create customer. Please try again.");
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
    });
    setSubmitted(false);
    toast.success("Customer created successfully!");
  };

  const handleChange = (field: string, value: string) => {
    setAllFilled(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 p-8">
      <div className="max-w-2xl mx-auto">
        {submitted && (
          <Alert className="mb-4 border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Customer created successfully!
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg border-muted/40">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Add New Customer
            </CardTitle>
            <CardDescription>Enter customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Name Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-10"
                />
              </div>
              {!allFilled && (
                <p className="text-sm text-destructive text-red-600">{error}</p>
              )}
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-10 bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md hover:shadow-primary/50 "
                >
                  Create Customer
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              All fields marked with <span className="text-destructive">*</span>{" "}
              are required
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddCustomerForm;
