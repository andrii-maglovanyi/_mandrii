"use client";

import { useRouter } from "next/navigation";

import { Button, Column, Row } from "@/components";
import { useLanguage } from "@/hooks";
import { useNotifications } from "@/hooks/useNotifications";

import { type FormData, PlaceForm } from "./Form";

export const AddLocation = () => {
  const { showError, showSuccess } = useNotifications();
  const { dict } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, index) => body.append(`${key}[${index}]`, v));
      } else {
        body.append(key, value as string);
      }
    });

    try {
      const response = await fetch("/api/locations/add", {
        body,
        method: "POST",
      });
      const result = await response.json();

      showSuccess(dict["Great! Location submitted successfully!"]);

      router.push("/account");
      return result;
    } catch (error) {
      console.error(error);
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

export default AddLocation;
