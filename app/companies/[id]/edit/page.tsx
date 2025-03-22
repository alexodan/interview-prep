import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Company } from "../../types";
import { CompanyForm } from "../../components/company-form";

export const metadata: Metadata = {
  title: "Edit Company | Interview Prep Tracker",
  description: "Edit company information",
};

const getCompany = async (id: string) => {
  try {
    const { promises: fs } = require("fs");
    const path = require("path");
    const filePath = path.join(
      process.cwd(),
      "app/companies/data/companies.json"
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    const company = data.companies.find((c: Company) => c.id === id);
    if (!company) throw new Error("Company not found");
    return company;
  } catch (error) {
    console.error("Error reading company:", error);
    return null;
  }
};

export default async function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const company = await getCompany(params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Edit {company.name}</h1>
        <p className="text-muted-foreground">Update company information</p>
      </div>

      <CompanyForm initialData={company} />
    </div>
  );
}
