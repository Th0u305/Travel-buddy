import { Metadata } from "next";
import AllTrips from "./allTrips";

export const metadata: Metadata = {
  title: "Travel Buddey | All-Trips",
  description: "Travel Buddey | All-Trips",
};

const page = () => {
    return (
        <>
            <AllTrips />
        </>
    );
};

export default page;