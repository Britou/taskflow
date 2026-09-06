import { LoaderCircle } from "lucide-react";

type PageLoaderProps = {
  message?: string;
};

export function PageLoader({
  message = "Carregando...",
}: PageLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <LoaderCircle
          size={20}
          className="animate-spin text-blue-600"
        />

        <p className="text-sm font-medium text-slate-700">
          {message}
        </p>
      </div>
    </div>
  );
}