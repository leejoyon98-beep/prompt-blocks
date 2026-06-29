import { BlockPackEditor } from "@/components/packs/BlockPackEditor";

export default async function PackEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlockPackEditor packId={id} />;
}
