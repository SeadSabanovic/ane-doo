import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <h1 className="text-4xl font-bold">ANE DOO</h1>
      <Button>Deploy Now</Button>
    </main>
  );
}
