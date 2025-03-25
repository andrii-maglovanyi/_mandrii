"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import {
  Button,
  Card,
  Column,
  H2,
  Icon,
  ImageCarousel,
  Input,
  LinearProgress,
  Phrase,
  Row,
  Select,
  Textarea,
} from "@/components";
import { Dictionary } from "@/dictionaries";
import { useLanguage } from "@/hooks";
import { NameValueObject, Ukrainian_Location_Categories_Enum } from "@/types";
import {
  capitalize,
  formatPhoneNumber,
  isEmail,
  isObjectEmpty,
  isPhoneNumber,
} from "@/utils";
import { isWebsite } from "@/utils/website";

export interface FormData {
  address: string;
  category: string;
  descriptionEn: string;
  descriptionUk: string;
  emails: string[];
  images: File[];
  name: string;
  phoneNumbers: string[];
  website: string;
}

interface PlaceFormProps {
  onSubmit(data: FormData): Promise<unknown>;
}

const INITIAL_FORM_DATA = {
  address: "",
  category: "",
  descriptionEn: "",
  descriptionUk: "",
  emails: [""],
  images: [],
  name: "",
  phoneNumbers: [""],
  website: "",
};

export const PlaceForm = ({ onSubmit }: PlaceFormProps) => {
  const { dict } = useLanguage();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isBusy, setIsBusy] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<Record<string, string | undefined>>({
    category: "",
  });

  const categoryOptions: Array<NameValueObject<string>> = Object.values(
    Ukrainian_Location_Categories_Enum
  ).reduce(
    (options, category) => [
      ...options,
      {
        name: capitalize(
          dict[
            category
              .toLowerCase()
              .replaceAll("_", " ") as unknown as keyof Dictionary
          ]
        ),
        value: category.toUpperCase(),
      },
    ],
    [] as Array<NameValueObject<string>>
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;

    if (["name", "address"].includes(name)) {
      if (value.trim()) {
        updateError(name);
      } else {
        updateError(name, "This field is required");
      }
    }

    if (name === "website") {
      if (!value || isWebsite(value)) {
        updateError(name);
      } else {
        updateError(name, "Website is invalid");
      }
    }

    if (name === "phone-number" && index !== null) {
      if (!value || isPhoneNumber(value)) {
        const updatedPhones = [...formData.phoneNumbers];
        updatedPhones[index] = value;
        setFormData({ ...formData, phoneNumbers: updatedPhones });
        updateError(name);
      } else {
        updateError(name, "Phone number is invalid");
      }
    } else if (name === "email" && index !== null) {
      if (!value || isEmail(value)) {
        const updatedEmails = [...formData.emails];
        updatedEmails[index] = value;
        setFormData({ ...formData, emails: updatedEmails });
        updateError(name);
      } else {
        updateError(name, "Email is invalid");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const updateError = (name: string, errorMessage?: keyof Dictionary) => {
    setError((error) => {
      if (errorMessage) {
        return {
          ...error,
          [name]: dict[errorMessage],
        };
      } else {
        const { [name]: fieldName, ...rest } = error;
        console.info(`Field ${fieldName} corrected`);
        return rest;
      }
    });
  };

  const handleValueChange = (name: string, value: string) => {
    if (name === "category") {
      if (value.trim()) {
        updateError("category");
      } else {
        updateError("category", "Please choose a category");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const addEmail = () => {
    setFormData({ ...formData, emails: [...formData.emails, ""] });
  };

  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
  };

  const removeEmail = (index: number) => {
    const updatedEmails = formData.emails.filter((_, i) => i !== index);
    setFormData({ ...formData, emails: updatedEmails });
  };

  const removePhoneNumber = (index: number) => {
    const updatedPhones = formData.phoneNumbers.filter((_, i) => i !== index);
    setFormData({ ...formData, phoneNumbers: updatedPhones });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length > 7) {
      updateError("images", "No more than 7 files please");
      setFormData({ ...formData, images: [] });
      setImagePreviews([]);
    } else {
      updateError("images");
      setFormData({ ...formData, images: files });
      setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsBusy(true);

    const result = await onSubmit(formData);

    if (result) {
      setImagePreviews([]);
      setFormData(INITIAL_FORM_DATA);
    }

    setIsBusy(false);
  };

  return (
    <Card>
      <Row className="items-center">
        <Icon type="pin-line" className="mr-2" />
        <H2>{dict["Submit place details"]}</H2>
      </Row>
      <form onSubmit={handleSubmit}>
        <Column className="grow pt-2">
          <Input
            type="text"
            name="name"
            label={`${dict["Name"]} (${dict["required"]})`}
            placeholder="Пузата хата"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-sm border p-2"
            required
          />
          <Phrase className="text-alert-500 h-6 text-end">{error.name}</Phrase>
        </Column>
        <Column className="grow pt-1">
          <Input
            type="text"
            name="address"
            label={`${dict["Address"]} (${dict["required"]})`}
            placeholder="10 Oxford St, London W1D 1AW"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full rounded-sm border p-2"
            required
          />
          <Phrase className="text-alert-500 h-6 text-end">
            {error.address}
          </Phrase>
        </Column>
        <Column className="grow pt-1">
          <Select
            name="category"
            items={categoryOptions}
            emptyOption
            emptyOptionValue=" "
            emptyOptionLabel="-"
            required
            defaultValue={formData.category}
            label={`${dict["Category"]} (${dict["required"]})`}
            onChange={({ value }) => {
              handleValueChange("category", value);
            }}
          />
          <Phrase className="text-alert-500 h-6 text-end">
            {error.category}
          </Phrase>
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
            className="w-full rounded-sm border p-2"
          />
          <Phrase className="text-alert-500 h-6 text-end">
            {error.website}
          </Phrase>
        </Column>

        <Column className="grow pt-2 pb-1">
          <label className="block font-semibold">{dict["Email"]}</label>
          {formData.emails.map((email, index) => (
            <Row key={index} className="mb-2 justify-center">
              <Column className="grow">
                <Input
                  name="email"
                  placeholder="varenyk@puzatahata.co.uk"
                  value={email}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full rounded-sm border p-2"
                />
              </Column>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeEmail(index)}
                  className="text-alert-500 mt-0.5 ml-2"
                >
                  {dict["Remove"]}
                </Button>
              )}
            </Row>
          ))}
          <Row className="justify-between">
            <Phrase className="text-alert-500 h-6 text-end">
              {error.email}
            </Phrase>
            <Button type="button" onClick={addEmail}>
              + {dict["Add email"]}
            </Button>
          </Row>
        </Column>

        <Column className="grow pb-1">
          <label className="block font-semibold">{`${dict["Phone number"]} (${dict["with country code: +44, +380..."]})`}</label>
          {formData.phoneNumbers.map((phone, index) => (
            <Row key={index} className="mb-2 justify-center">
              <Column className="grow">
                <Input
                  name="phone-number"
                  placeholder="+44 20 7946 0123"
                  value={formatPhoneNumber(phone)}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full rounded-sm border p-2"
                />
              </Column>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removePhoneNumber(index)}
                  className="text-alert-500 mt-0.5 ml-2"
                >
                  {dict["Remove"]}
                </Button>
              )}
            </Row>
          ))}
          <Row className="justify-between">
            <Phrase className="text-alert-500 h-6 text-end">
              {error["phone-number"]}
            </Phrase>
            <Button type="button" onClick={addPhoneNumber}>
              + {dict["Add phone number"]}
            </Button>
          </Row>
        </Column>
        <Column className="grow pb-2">
          <label className="block font-semibold">{`${dict["Upload images"]} (${dict["max 7 images"]})`}</label>
          <input
            type="file"
            multiple
            disabled={isBusy}
            onChange={handleImageChange}
            className="w-full rounded-sm border p-2"
          />
          <Phrase className="text-alert-500 h-6 text-end">
            {error.images}
          </Phrase>
          {imagePreviews.length ? (
            <Column
              className={`
                relative my-4 h-96 w-full justify-center overflow-hidden
                rounded-lg
              `}
            >
              <ImageCarousel images={imagePreviews} />
            </Column>
          ) : null}

          <Row className="h-8 pt-4">
            {isBusy && <LinearProgress indeterminate />}
          </Row>
        </Column>
        <Row className="items-center justify-between">
          <Phrase>
            {
              dict[
                "The request may take up to a minute to process. Thank you for your patience!"
              ]
            }
          </Phrase>
          <Button
            layout="filled"
            disabled={
              !(formData.name && formData.address) ||
              isBusy ||
              !isObjectEmpty(error)
            }
            type="submit"
          >
            {dict[isBusy ? "Please wait..." : "Submit place"]}
          </Button>
        </Row>
      </form>
    </Card>
  );
};
