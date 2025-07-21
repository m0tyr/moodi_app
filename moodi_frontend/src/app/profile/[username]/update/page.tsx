import MoodiEditProfile from "@/components/MoodiEditProfile";
import MoodiProfile from "@/components/MoodiProfile";
import MoodiProfileRoot from "@/components/MoodiProfileRoot";
import { UserApiServiceImplementation } from "@/lib/api/user/user.api.service";
import { useUserNameStore } from "@/lib/stores/useUserNameStore";

export async function generateMetadata({ params }: { params: { username: string } }) {
  return {
    title: `@${params.username}`,
  };
}

export default async function Page({ params }: { params: { username: string } }) {

    return (
      <>
          <MoodiProfileRoot usernameToCheck={params.username} />
      </>
    );
}
