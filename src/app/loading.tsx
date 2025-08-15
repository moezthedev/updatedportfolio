import Spinner from "@/components/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" color="indigo" />
    </div>
  );
}
