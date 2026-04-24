import { Metadata } from 'next';
import ExploreAdventures from './trips';

export const metadata: Metadata = {
  title: "Travel Buddey | All trips",
  description: "Travel Buddey | All trips",
};

const page = () => {
    return (
      <ExploreAdventures />
    );
};

export default page;