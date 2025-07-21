"use client";
import { useQueryUserFeed } from "@/hooks/useQueryUserFeed";
import MoodiUserProfile from "./MoodiUserProfile";
import dynamic from "next/dynamic";
import { UserApiServiceImplementation } from "@/lib/api/user/user.api.service";

const MoodiFeedList: React.FC = () => {
  const UserApiService = new UserApiServiceImplementation();
  const { data: userFeed, isLoading, error } = useQueryUserFeed(UserApiService);

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-6 overflow-hidden w-[400px]">
        <p className="text-red-500">Error loading user feed</p>
      </div>
    );
  }

  if (!userFeed || userFeed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-6 overflow-hidden w-[400px]">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-6 overflow-hidden w-[400px]">
      {userFeed.map((user, index) => (
        <MoodiUserProfile
          key={user.id}
          id={user.id}
          name={user.username}
          mood={user.myMoodi?.emoji || ""}
          describe_my_mood={user.myMoodi?.name || ""}
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