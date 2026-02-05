import { Suspense } from "react";
import JunhaeEdits from "../components/JunhaeEdits";

export default function Page() {
  return (

    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
        </div>
      }
    >
      <JunhaeEdits />
    </Suspense>
  );
}
