"use client";

import { imageUploadHandler } from "@/actions/categories";
import { createProduct } from "@/actions/products";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreateOrUpdateProductValues, validation } from "@/lib/validations";
import { Category, ProductsWithCategoriesResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { ProductTableRow } from "./ProductTableRow";
import { ProductForm } from "./ProductForm";

type ProductProps = {
  categories: Category[];
  products: ProductsWithCategoriesResponse;
};

export const Product = ({ categories, products }: ProductProps) => {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] =
    useState<CreateOrUpdateProductValues | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<CreateOrUpdateProductValues>({
    resolver: zodResolver(validation.createOrUpdateProductSchema),
    defaultValues: {
      title: "",
      category: undefined,
      price: undefined,
      maxQuantity: undefined,
      heroImage: undefined,
      images: [],
      intent: "create",
    },
  });

  const productCreateUpdateHandler = async (
    data: CreateOrUpdateProductValues,
  ) => {
    const {
      category,
      images,
      maxQuantity,
      price,
      title,
      heroImage,
      slug,
      intent = "create",
    } = data;

    const uploadFile = async (file: File) => {
      const uniqueId = uuid();
      const fileName = `product/product-${uniqueId}-${file.name}`;
      const formData = new FormData();
      formData.append("file", file, fileName);
      return imageUploadHandler(formData);
    };

    let heroImageUrl: string | undefined;
    let imageUrls: string[] = [];

    if (heroImage) {
      const imagePromise = Array.from(heroImage).map((file) =>
        uploadFile(file as File),
      );

      try {
        // Pick the first image from the file FieldList
        [heroImageUrl] = await Promise.all(imagePromise); // or
        // const urls = await Promise.all(imagePromise);
        // heroImageUrl = urls[0];
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
        return;
      }
    }

    if (images.length > 0) {
      const imagesPromises = Array.from(images).map((file) => uploadFile(file));

      try {
        imageUrls = (await Promise.all(imagesPromises)) as string[];
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images");
        return;
      }
    }

    switch (intent) {
      case "create": {
        if (heroImageUrl && imageUrls.length > 0) {
          await createProduct({
            category: Number(category),
            images: imageUrls,
            heroImage: heroImageUrl,
            maxQuantity: Number(maxQuantity),
            price: Number(price),
            title,
          });
          form.reset();
          router.refresh();
          setIsProductModalOpen(false);
          toast.success("Product created successfully");
        }
        break;
      }

      default:
        console.error("Invalid intent");
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <Button
            onClick={() => {
              setCurrentProduct(null);
              setIsProductModalOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Max Quantity</TableHead>
              <TableHead>Hero Image</TableHead>
              <TableHead>Product Images</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow
                setIsProductModalOpen={setIsProductModalOpen}
                key={product.id}
                product={product}
                setCurrentProduct={setCurrentProduct}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </TableBody>
        </Table>

        {/* Product Modal */}
        <ProductForm
          form={form}
          onSubmit={productCreateUpdateHandler}
          categories={categories}
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
          defaultValues={currentProduct}
        />
      </div>
    </main>
  );
};
