"use client";

import {
  Button,
  Card,
  Column,
  H2,
  Icon,
  ImageCarousel,
  Input,
  LinearProgress,
  Row,
  Select,
  Textarea,
} from "@/components";
import { CATEGORIES } from "@/constants";
import { Dictionary } from "@/dictionaries";
import { useLanguage } from "@/hooks";
import { NameValueObject } from "@/types";

import { useState, ChangeEvent, FormEvent } from "react";

export interface FormData {
  name: string;
  address: string;
  descriptionEn: string;
  descriptionUk: string;
  website: string;
  category: string;
  email: string;
  phoneNumbers: string[];
  images: File[];
}

interface PlaceFormProps {
  onSubmit(data: FormData): Promise<void>;
}

const INITIAL_FORM_DATA = {
  name: "",
  address: "",
  descriptionEn: "",
  descriptionUk: "",
  website: "",
  email: "",
  category: "",
  phoneNumbers: [""],
  images: [],
};

export const PlaceForm = ({ onSubmit }: PlaceFormProps) => {
  const { dict } = useLanguage();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isBusy, setIsBusy] = useState(false);

  const categoryOptions: Array<NameValueObject<string>> = CATEGORIES.reduce(
    (options, category) => [
      ...options,
      {
        name: dict[category as keyof Dictionary],
        value: category,
      },
    ],
    [] as Array<NameValueObject<string>>
  );

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedPhones = [...formData.phoneNumbers];
      updatedPhones[index] = value;
      setFormData({ ...formData, phoneNumbers: updatedPhones });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleValueChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
  };

  const removePhoneNumber = (index: number) => {
    const updatedPhones = formData.phoneNumbers.filter((_, i) => i !== index);
    setFormData({ ...formData, phoneNumbers: updatedPhones });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsBusy(true);

    if (!formData.name || !formData.address || !formData.category) {
      setError(dict["Name and address are required."]);
      return;
    }

    setError("");
    await onSubmit(formData);

    setImagePreviews([]);
    setFormData(INITIAL_FORM_DATA);
    setIsBusy(false);
  };

  return (
    <Card>
      <Row className="items-center">
        <Icon type="pin-line" className="mr-2" />
        <H2>{dict["Submit place details"]}</H2>
      </Row>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Column className="grow py-2">
          <Input
            type="text"
            name="name"
            label={dict["Name (required)"]}
            placeholder="Пузата хата"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </Column>
        <Column className="grow py-2">
          <Input
            type="text"
            name="address"
            label={dict["Address (required)"]}
            placeholder="10 Oxford St, London W1D 1AW"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </Column>
        <Column className="grow py-2">
          <Select
            name="category"
            items={categoryOptions}
            emptyOption
            emptyOptionLabel="-"
            defaultValue={formData.category}
            label={dict["Category"]}
            onChange={({ value }) => handleValueChange("category", value)}
          />
        </Column>
        <Column className="grow py-2">
          <Textarea
            name="descriptionUk"
            label={dict["Description (🇺🇦 Ukrainian)"]}
            placeholder="Лазанья з куркою та грибами там неперевершена!!!!! Руки цілувати б тій/тому, хто це приготував."
            value={formData.descriptionUk}
            onInput={handleInputChange}
          />
        </Column>
        <Column className="grow py-2">
          <Textarea
            label={dict["Description (🇬🇧 English)"]}
            name="descriptionEn"
            placeholder={
              "The lasagna with chicken and mushrooms there is incredible!!!!! You should kiss the hands of the one who made it."
            }
            value={formData.descriptionEn}
            onInput={handleInputChange}
          />
        </Column>
        <Column className="grow py-2">
          <Input
            type="url"
            name="website"
            label={dict["Website"]}
            placeholder="https://puzatahata.co.uk"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </Column>
        <Column className="grow py-2">
          <Input
            type="email"
            name="email"
            label={dict["Email"]}
            placeholder="varenyk@puzatahata.co.uk"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </Column>
        <Column className="grow py-2">
          <label className="block font-semibold">{dict["Phone numbers"]}</label>
          {formData.phoneNumbers.map((phone, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="tel"
                placeholder="+44 20 7946 0123"
                value={phone}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full p-2 border rounded"
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removePhoneNumber(index)}
                  className="text-alert-500"
                >
                  {dict["Remove"]}
                </Button>
              )}
            </div>
          ))}
          <Row className="justify-end">
            <Button type="button" onClick={addPhoneNumber}>
              + {dict["Add phone number"]}
            </Button>
          </Row>
        </Column>
        <Column className="grow py-2">
          <label className="block font-semibold">{dict["Upload images"]}</label>
          <input
            type="file"
            multiple
            disabled={isBusy}
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imagePreviews.length ? (
            <Column className="relative w-full h-96 justify-center rounded-lg my-4 overflow-hidden">
              <ImageCarousel images={imagePreviews} />
            </Column>
          ) : null}

          <Row className="h-8 pt-4">
            {isBusy && <LinearProgress indeterminate />}
          </Row>
        </Column>
        <Row className="justify-end">
          <Button
            layout="filled"
            disabled={!(formData.name && formData.address) || isBusy}
            type="submit"
          >
            {dict["Submit place"]}
          </Button>
        </Row>
      </form>
    </Card>
  );
};
