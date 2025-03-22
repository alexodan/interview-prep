import type { Metadata } from "next";
import { Building2, Users, Briefcase, DollarSign, Award, ExternalLink } from "lucide-react";
import { Company, CompanyValue, CompanyTechnology } from "./types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Companies | Interview Prep Tracker",
  description:
    "Research and track company information for your job applications",
};

const getCompanies = async () => {
  try {
    const { promises: fs } = require("fs");
    const path = require("path");
    const filePath = path.join(
      process.cwd(),
      "app/companies/data/companies.json"
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.companies;
  } catch (error) {
    console.error("Error reading companies:", error);
    return [];
  }
};

export default async function CompaniesPage() {
  const companies: Company[] = await getCompanies();

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-muted-foreground">
            Research and track company information for your job applications
          </p>
        </div>
        <form action="/companies/new">
          <Button>
            <Building2 className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </form>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company: Company) => (
          <Card
            key={company.id}
            className="flex flex-col h-full overflow-hidden"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{company.name}</CardTitle>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {company.description}
                  </CardDescription>
                </div>
                {company.logo && (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-12 w-12 rounded-lg object-contain"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <Tabs defaultValue="overview" className="flex flex-col h-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                  <TabsTrigger value="tech">Tech</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="overview"
                  className="h-full overflow-auto space-y-4 p-1"
                >
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Revenue: {company.financials.revenue || "Not available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Employees:{" "}
                        {company.financials.employees || "Not available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Founded: {company.financials.founded || "Not available"}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="culture"
                  className="h-full overflow-auto space-y-4 p-1"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {company.values.map(
                        (value: CompanyValue, index: number) => (
                          <Badge key={index} variant="secondary">
                            {value.title}
                          </Badge>
                        )
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {company.culture}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tech" className="h-full overflow-auto p-1">
                  <div className="grid gap-2">
                    {Object.entries(
                      company.technologies.reduce(
                        (
                          acc: Record<string, string[]>,
                          tech: CompanyTechnology
                        ) => {
                          if (!acc[tech.category]) acc[tech.category] = [];
                          acc[tech.category].push(tech.name);
                          return acc;
                        },
                        {} as Record<string, string[]>
                      )
                    ).map(([category, techs]: [string, string[]]) => (
                      <div key={category}>
                        <h4 className="mb-2 text-sm font-medium capitalize">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value="process"
                  className="h-full overflow-auto p-1"
                >
                  <div className="space-y-4">
                    {company.interviewProcess.map(
                      (step: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 mb-2 last:mb-0"
                        >
                          <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm">
                            {index + 1}
                          </div>
                          <p className="text-sm break-words flex-1">{step}</p>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <form action={`/companies/${company.id}`}>
                  <Button variant="outline">View Details</Button>
                </form>
                <form action={`/companies/${company.id}/edit`}>
                  <Button variant="outline">Edit Company</Button>
                </form>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
