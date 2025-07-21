'use client';
import { useUserNameStore } from "@/lib/stores/useUserNameStore";
import MoodiProfile from "./MoodiProfile";
import MoodiEditProfile from "./MoodiEditProfile";

interface MoodiProfileRootProps {
    usernameToCheck: string;
}

const MoodiProfileRoot: React.FC<MoodiProfileRootProps> = ({
    usernameToCheck
}) => {
    const { getConnectedUsername } = useUserNameStore((s) => s.actions);

    const connectedUsername = getConnectedUsername();
    const isMyProfile = connectedUsername === usernameToCheck;

    if (!isMyProfile) {
        return (
            <>
                <div className="flex min-h-screen min-w-full flex-1 flex-col items-center px-6 py-3 w-screen bg-[#101010] basis-full grow shrink overflow-x-hidden overflow-y-auto relative z-0">
                    <MoodiProfile username={usernameToCheck} />
                </div>
            </>
        );
    }
    if (isMyProfile) {
        return (
            <>
                <div className="flex min-h-screen min-w-full flex-1 flex-col items-center px-6 py-3 w-screen bg-[#101010] basis-full grow shrink overflow-x-hidden overflow-y-auto relative z-0">
                    <MoodiEditProfile />
                </div>
            </>
        );
    }
}

export default MoodiProfileRoot;