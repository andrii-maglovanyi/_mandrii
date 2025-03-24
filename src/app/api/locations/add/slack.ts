import Slack from "@slack/bolt";

import { UserSession } from "@/lib";

import { Ukrainian_Locations_Data } from "./location";

const app = new Slack.App({
  signingSecret: process.env.NEXT_PRIVATE_SLACK_SIGNING_SECRET,
  token: process.env.NEXT_PRIVATE_SLACK_BOT_TOKEN,
});

export const sendNotification = async (
  session: UserSession,
  location: Ukrainian_Locations_Data
) => {
  const blocks = [
    {
      text: {
        text: `:pushpin: New location *${location.name}* added:`,
        type: "mrkdwn",
      },
      type: "section",
    },
    {
      type: "divider",
    },
    {
      accessory: {
        alt_text: location.name,
        image_url: location.images
          ? `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${location.images?.[0]}`
          : "",
        type: "image",
      },
      text: {
        text: location.description_uk,
        type: "mrkdwn",
      },
      type: "section",
    },
    {
      accessory: {
        action_id: "button-action",
        text: {
          emoji: true,
          text: "Review",
          type: "plain_text",
        },
        type: "button",
        url: "https://admin.mandrii.com",
      },
      text: {
        text: location.category,
        type: "mrkdwn",
      },
      type: "section",
    },
    {
      type: "divider",
    },
    {
      elements: [
        {
          alt_text: `User ${session.user.id}`,
          image_url: session.user.image,
          type: "image",
        },
        {
          text: `Author: ${session.user.name} (${session.user.email})`,
          type: "mrkdwn",
        },
      ],
      type: "context",
    },
  ];

  await app.client.chat.postMessage({
    blocks,
    channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL!,
    token: process.env.NEXT_PRIVATE_SLACK_BOT_TOKEN,
  });
};
