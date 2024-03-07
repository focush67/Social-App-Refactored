import Story from "@/components/story-components/story-component";
import { getAllStories, hasLikedThisStory } from "@/services/story-service";
import React from "react";

const StorySidebar = async () => {
  const stories = await getAllStories();
  if (!stories || stories.length === 0) {
    return null;
  }

  const likedStati = await Promise.all(
    stories.map(async (story) => await hasLikedThisStory(story.id))
  );
  const formattedStories = stories.map((story, index) => ({
    ...story,
    status: likedStati[index],
  }));
  return (
    <div className="mt-2 fixed top-0 left-0 z-[100] flex justify-start overflow-x-auto">
      <Story stories={formattedStories} />
    </div>
  );
};

export default StorySidebar;
