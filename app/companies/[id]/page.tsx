import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Users, Briefcase, DollarSign, Award } from "lucide-react";
import {
  Company,
  CompanyValue,
  CompanyManager,
  CompanyTechnology,
} from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Company Details | Interview Prep Tracker",
  description: "View detailed company information",
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

export default async function CompanyPage({
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-muted-foreground">{company.description}</p>
        </div>
        <form action={`/companies/${company.id}/edit`}>
          <Button>Edit Company</Button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>
                  Revenue: {company.financials.revenue || "Not available"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  Employees: {company.financials.employees || "Not available"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>
                  Founded: {company.financials.founded || "Not available"}
                </span>
              </div>
              {company.financials.headquarters && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>HQ: {company.financials.headquarters}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {company.values.map((value: CompanyValue, index: number) => (
                  <Badge key={index} variant="secondary">
                    {value.title}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{company.culture}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Managers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {company.managers.map((manager: CompanyManager) => (
                <div
                  key={manager.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{manager.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {manager.role}
                    </p>
                  </div>
                  {manager.linkedin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(manager.linkedin, "_blank")}
                    >
                      View LinkedIn
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(
                company.technologies.reduce(
                  (acc: Record<string, string[]>, tech: CompanyTechnology) => {
                    if (!acc[tech.category]) acc[tech.category] = [];
                    acc[tech.category].push(tech.name);
                    return acc;
                  },
                  {} as Record<string, string[]>
                )
              ).map(([category, techs]) => {
                const techsArray = techs as string[];
                return (
                  <div key={category}>
                    <h4 className="mb-2 text-sm font-medium capitalize">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techsArray.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.interviewProcess.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {company.benefits.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {company.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{company.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
