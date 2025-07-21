import MoodiMyProfile from "@/components/MoodiMyProfile";
import MoodiFeedList from "@/components/MoodiFeedList";

export default function Feed() {
  return (
    <>
      <div className="flex min-h-screen min-w-full flex-1 flex-col items-center px-6 py-3 w-screen bg-[#101010] basis-full grow shrink overflow-x-hidden overflow-y-auto relative z-0">
        <MoodiMyProfile />
        <MoodiFeedList />
      </div>
    </>
  );
}
