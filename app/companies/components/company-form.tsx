"use client";

import { useState } from "react";
import {
  Company,
  CompanyValue,
  CompanyManager,
  CompanyTechnology,
} from "../types";
import { saveCompany } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";

const techCategories = [
  "language",
  "framework",
  "database",
  "cloud",
  "tool",
] as const;

const generateId = () => Math.random().toString(36).slice(2);

const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Must be a valid URL"),
  logo: z.string().url("Must be a valid URL").optional(),
  values: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .min(1, "At least one company value is required"),
  managers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      linkedin: z.string().url("Must be a valid LinkedIn URL").optional(),
      email: z.string().email("Must be a valid email").optional(),
    })
  ),
  financials: z.object({
    revenue: z.string().optional(),
    employees: z.string().optional(),
    founded: z.string().optional(),
    headquarters: z.string().optional(),
    stockSymbol: z.string().optional(),
  }),
  technologies: z.array(
    z.object({
      name: z.string(),
      category: z.enum(techCategories),
    })
  ),
  interviewProcess: z.array(z.string()),
  benefits: z.array(z.string()),
  culture: z.string(),
  notes: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  initialData?: Company;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CompanyValue[]>(
    initialData?.values || []
  );
  const [managers, setManagers] = useState<CompanyManager[]>(
    (initialData?.managers || []).map((m) => ({
      ...m,
      id: m.id || generateId(),
    }))
  );
  const [technologies, setTechnologies] = useState<CompanyTechnology[]>(
    initialData?.technologies || []
  );
  const [interviewSteps, setInterviewSteps] = useState<string[]>(
    initialData?.interviewProcess || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits || []
  );

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      website: initialData?.website || "",
      logo: initialData?.logo || "",
      values: initialData?.values || [],
      managers: initialData?.managers || [],
      technologies: initialData?.technologies || [],
      interviewProcess: initialData?.interviewProcess || [],
      benefits: initialData?.benefits || [],
      culture: initialData?.culture || "",
      notes: initialData?.notes || "",
      financials: initialData?.financials || {},
    },
  });

  const addValue = () => {
    setValues([...values, { title: "", description: "" }]);
  };

  const addManager = () => {
    setManagers([...managers, { id: generateId(), name: "", role: "" }]);
  };

  const addTechnology = () => {
    setTechnologies([...technologies, { name: "", category: "language" }]);
  };

  const addInterviewStep = () => {
    setInterviewSteps([...interviewSteps, ""]);
  };

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  return (
    <Form {...form}>
      <form
        action={async (formData: FormData) => {
          // Add hidden fields for complex data types
          formData.append('values', JSON.stringify(values));
          formData.append('managers', JSON.stringify(managers));
          formData.append('technologies', JSON.stringify(technologies));
          formData.append('interviewProcess', JSON.stringify(interviewSteps));
          formData.append('benefits', JSON.stringify(benefits));
          formData.append('financials', JSON.stringify(form.getValues('financials')));
          formData.append('id', initialData?.id || '');

          const result = await saveCompany(formData);
          if (result.success) {
            router.push("/companies");
          }
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormDescription>Optional company logo URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-medium mb-4">Company Values</h3>
          {values.map((_, index) => (
            <div key={index} className="grid gap-4 mb-4">
              <FormField
                control={form.control}
                name={`values.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`values.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addValue}>
            Add Value
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Key Managers</h3>
          {managers.map((_, index) => (
            <div key={index} className="grid gap-4 mb-4">
              <FormField
                control={form.control}
                name={`managers.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`managers.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`managers.${index}.linkedin`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addManager}>
            Add Manager
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Technologies</h3>
          {technologies.map((_, index) => (
            <div key={index} className="grid gap-4 mb-4">
              <FormField
                control={form.control}
                name={`technologies.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technology Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`technologies.${index}.category`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {techCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addTechnology}>
            Add Technology
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Interview Process</h3>
          {interviewSteps.map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`interviewProcess.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addInterviewStep}
            className="mt-4"
          >
            Add Interview Step
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Benefits</h3>
          {benefits.map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`benefits.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addBenefit}
            className="mt-4"
          >
            Add Benefit
          </Button>
        </div>

        <FormField
          control={form.control}
          name="culture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Culture</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Any additional information about the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Company</Button>
        </div>
      </form>
    </Form>
  );
}
