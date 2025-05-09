import { Meta } from "@storybook/react";
import { RecordInput } from "@/components";

const meta: Meta<typeof RecordInput> = {
  title: "Components/Workout/RecordInput",
  component: RecordInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "エクササイズの重さとRep数用インプット",
      },
    },
  },
  argTypes: {
    field: {
      description: "inputタグに紐付けたい項目名",
    },
  },
};

export default meta;

export const Weight = {
  args: {
    field: "weight",
  },
};

export const Rep = {
  args: {
    field: "rap",
  },
};
