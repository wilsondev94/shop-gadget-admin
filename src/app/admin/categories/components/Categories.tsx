"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import {
//   createCategory,
//   deleteCategory,
//   imageUploadHandler,
//   updateCategory,
// } from "@/actions/categories";

import { CategoryTableRow } from "@/components/CategoryTableRow";
import { CreateCategoryValues, validation } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CategoriesWithProductsResponse } from "@/types";
import { CategoryForm } from "./CategoryForm";

type categoriesProps = {
  categories: CategoriesWithProductsResponse;
};

const Categories = ({ categories }: categoriesProps) => {
  const router = useRouter();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategoryValues | null>(null);

  const form = useForm<CreateCategoryValues>({
    resolver: zodResolver(validation.createCategorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const submitCategoryHandler: SubmitHandler<CreateCategoryValues> = async (
    data,
  ) => {
    const { image, name } = data;
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isCreateCategoryModalOpen}
            onOpenChange={() =>
              setIsCreateCategoryModalOpen(!isCreateCategoryModalOpen)
            }
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setCurrentCategory(null);
                  setIsCreateCategoryModalOpen(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <CategoryForm
                form={form}
                onSubmit={submitCategoryHandler}
                defaultValues={currentCategory}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="md:table-cell">Created at</TableHead>
                <TableHead className="md:table-cell">Products</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <CategoryTableRow key={category.id} category={category} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Categories;
