import { sendGAEvent } from "@next/third-parties/google";

type GAEvent = {
  action: "button_click" | "add_to_cart" | "search";
  category: "ecommerce" | "engagement";
  label: string;
  value?: number;
};

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: GAEvent): void => {
  sendGAEvent("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
