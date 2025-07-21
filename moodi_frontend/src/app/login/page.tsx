import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex min-h-screen min-w-full flex-1 flex-col justify-center items-center px-6 py-3 w-screen bg-[#101010] basis-full grow shrink overflow-x-hidden overflow-y-auto relative z-0">
        <h1 className="text-lg font-bold tracking-tighter">moodi</h1>

        <LoginForm />
      </div>
    </>
  );
}
