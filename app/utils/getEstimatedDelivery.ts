export const getEstimatedDelivery = () => {
  const today = new Date();
  const minDays = new Date(today);
  minDays.setDate(today.getDate() + 4); // 4 days later
  const maxDays = new Date(today);
  maxDays.setDate(today.getDate() + 7); // 7 days later

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return `${minDays.toLocaleDateString("en-US", options)} - ${maxDays.toLocaleDateString("en-US", options)}`;
};