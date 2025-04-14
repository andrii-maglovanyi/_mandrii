import type { Meta, StoryObj } from "@storybook/react";

import { Icon, svgImportKeys } from "./Icon";

const meta: Meta<typeof Icon> = {
  argTypes: {
    connotation: {
      control: { type: "select" },
      options: ["primary", "success", "alert", "cta"],
    },
    customSize: {
      control: { type: "number" },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    type: {
      control: { type: "select" },
      options: svgImportKeys,
    },
  },
  args: {
    connotation: "primary",
    size: "medium",
    type: "heart-line",
  },
  component: Icon,
  tags: ["autodocs"],
  title: "Components/Icon",
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    type: "heart-line",
  },
};

export const WithCustomSize: Story = {
  args: {
    customSize: 40,
    type: "rocket-solid",
  },
};

export const AllIcons: Story = {
  args: {
    connotation: "primary",
    size: "medium",
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {svgImportKeys.map((icon) => (
        <div key={icon} style={{ textAlign: "center", width: 80 }}>
          <Icon {...args} type={icon} />
          <div style={{ fontSize: 10, marginTop: 4 }}>{icon}</div>
        </div>
      ))}
    </div>
  ),
};
