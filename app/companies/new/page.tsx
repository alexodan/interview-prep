import type { Metadata } from "next";
import { CompanyForm } from "../components/company-form";

export const metadata: Metadata = {
  title: "Add Company | Interview Prep Tracker",
  description: "Add a new company to track",
};

export default function NewCompanyPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Add Company</h1>
        <p className="text-muted-foreground">
          Add information about a company you're interested in
        </p>
      </div>

      <CompanyForm />
    </div>
  );
}
