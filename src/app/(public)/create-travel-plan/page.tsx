import TravelPlan from "./travelPlan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Buddey | Create Travel Plan",
  description: "Travel Buddey | Create Travel Plan",
};

const page = () => {
  return (
    <TravelPlan />
  );
};

export default page;