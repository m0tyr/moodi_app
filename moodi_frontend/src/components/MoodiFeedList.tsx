"use client";
import MoodiUserProfile from "./MoodiUserProfile";
import dynamic from "next/dynamic";

const MoodiFeedList: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-6 overflow-hidden w-[400px]">
      {[
        { id: 1, name: "Alice", mood: "", describe_my_mood: "Feeling great!" },
        { id: 2, name: "Bob", mood: "", describe_my_mood: "Just okay." },
        { id: 3, name: "Charlie", mood: "", describe_my_mood: "Not so good." },
        {
          id: 4,
          name: "Diana",
          mood: "",
          describe_my_mood: "Absolutely amazing!",
        },
        { id: 5, name: "Eve", mood: "", describe_my_mood: "Could be better." },
      ].map((profile, index) => (
        <MoodiUserProfile
          key={profile.id}
          id={profile.id}
          name={profile.name}
          mood={profile.mood}
          describe_my_mood={profile.describe_my_mood}
          index={index}
        />
      ))}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MoodiFeedList), {
  ssr: true,
  loading: () => (
    <div className="flex flex-col items-center justify-center gap-4 mt-6 overflow-hidden w-[400px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <circle cx="4" cy="12" r="3" fill="currentColor">
            <animate
              id="svgSpinners3DotsFade0"
              fill="freeze"
              attributeName="opacity"
              begin="0;svgSpinners3DotsFade1.end-0.25s"
              dur="0.75s"
              values="1;.2"
            />
          </circle>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
            <animate
              fill="freeze"
              attributeName="opacity"
              begin="svgSpinners3DotsFade0.begin+0.15s"
              dur="0.75s"
              values="1;.2"
            />
          </circle>
          <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
            <animate
              id="svgSpinners3DotsFade1"
              fill="freeze"
              attributeName="opacity"
              begin="svgSpinners3DotsFade0.begin+0.3s"
              dur="0.75s"
              values="1;.2"
            />
          </circle>
        </svg>
    </div>
  ),
});
