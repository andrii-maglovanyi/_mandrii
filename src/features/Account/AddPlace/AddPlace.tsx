"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { PlaceForm, type FormData } from "./Form";
import slugify from "slugify";
import { useLanguage } from "@/hooks";
import { Button, Column, Row } from "@/components";
import { useRouter } from "next/navigation";

export const AddPlace = () => {
  const { showSuccess, showError } = useNotifications();
  const { dict } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const slug = slugify(formData.name, { lower: true, strict: true });

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, index) => body.append(`${key}[${index}]`, v));
      } else {
        body.append(key, value as string);
      }
    });

    body.append("slug", slug);

    try {
      const response = await fetch("/api/places/add", { method: "POST", body });
      const result = await response.json();

      showSuccess(dict["Great! Location submitted successfully!"]);

      return result;
    } catch (error) {
      showError(dict["Oops! Something went wrong. Please try again."]);
    }
  };

  return (
    <Column>
      <Row className="mb-4 justify-end">
        <Button
          icon="arrow-left-line"
          onClick={() => router.push("/account")}
          layout="outlined"
        >
          {dict["Back"]}
        </Button>
      </Row>
      <PlaceForm onSubmit={handleSubmit} />
    </Column>
  );
};

export default AddPlace;
