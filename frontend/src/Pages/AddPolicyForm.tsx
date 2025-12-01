import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
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
// import { useNavigate } from "react-router-dom";
import { CustomerCombobox } from "@/components/CustomerComboBox";

const AddPolicyForm = () => {
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_email: "",
    policy_type: "",
    premium_amount: "",
    start_date: "",
    end_date: "",
    status: "active",
  });
  const [allFilled, setAllFilled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [customers, setCustomers] = useState<Array<{id:number, name:string, email:string}>>([]);
  // Placeholder customer list (replace with API later)
  useEffect(() => {
    // Fetch customers from API
    fetch("http://localhost:3000/api/customers/getAllCustomers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleChange = (field: string, value: string) => {
    setAllFilled(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.customer_email ||
      !formData.policy_type ||
      !formData.premium_amount ||
      !formData.start_date ||
      !formData.end_date
    ) {
      setError("All fields are required");
      setAllFilled(false);
      return;
    }
    if (formData.start_date > formData.end_date) {
        setError("Start date cannot be after end date");
      setAllFilled(false);
      return;
    }
    if(formData.premium_amount && Number(formData.premium_amount) <= 0){
        setError("Premium amount must be a positive number");
        setAllFilled(false);
        return;
    }
    if(formData.policy_type.trim().toLowerCase()!=="health" && formData.policy_type.trim().toLowerCase()!=="life" && formData.policy_type.trim().toLowerCase()!=="car"){
        setError("Policy type must be one of: health, life, car");
        setAllFilled(false);
        return;
    }
    setError(null);
    const res = await fetch("http://localhost:3000/api/policies/createPolicy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "An error occurred");
      setAllFilled(false);
      return;
    }
    setFormData({
      customer_email: "",
      policy_type: "",
      premium_amount: "",
      start_date: "",
      end_date: "",
      status: "active",
    });

    setAllFilled(true);
    setSubmitted(true);
    // navigate("/policies");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 p-8">
      <div className="max-w-2xl mx-auto">
        {submitted && (
          <Alert className="mb-4 border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Policy created successfully!
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg border-muted/40">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Add New Policy</CardTitle>
            <CardDescription>Create a policy for a customer</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Customer Selection */}
              <div className="space-y-2">
                <Label htmlFor="customer" className="text-sm font-medium">
                  Select Customer <span className="text-destructive">*</span>
                </Label>

                <CustomerCombobox
                  customers={customers}
                  value={formData.customer_email}
                  onChange={(val) => handleChange("customer_email", val)}
                />
              </div>

              {/* Policy Type */}
              <div className="space-y-2">
                <Label htmlFor="policyType" className="text-sm font-medium">
                  Policy Type <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="policyType"
                  placeholder="Health, Life, Car..."
                  value={formData.policy_type}
                  onChange={(e) => handleChange("policy_type", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Premium Amount */}
              <div className="space-y-2">
                <Label htmlFor="premium" className="text-sm font-medium">
                  Premium Amount <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="premium"
                  type="number"
                  placeholder="5000"
                  value={formData.premium_amount}
                  onChange={(e) =>
                    handleChange("premium_amount", e.target.value)
                  }
                  className="h-10"
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange("start_date", e.target.value)}
                  className="h-10"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium">
                  End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleChange("end_date", e.target.value)}
                  className="h-10"
                />
              </div>
              {!allFilled && (
                <p className="text-sm text-destructive text-red-600">{error}</p>
              )}
              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-10 bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md hover:shadow-primary/50 "
                >
                  Create Policy
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Fields marked with <span className="text-destructive">*</span> are
              required
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddPolicyForm;
