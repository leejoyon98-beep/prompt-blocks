import { Suspense } from "react";
import { BlockPackEditor } from "@/components/packs/BlockPackEditor";

export default function NewPackPage() {
  return (
    <Suspense fallback={<div className="px-6 py-20 text-center text-[13px] text-muted">불러오는 중...</div>}>
      <BlockPackEditor isNew />
    </Suspense>
  );
}
