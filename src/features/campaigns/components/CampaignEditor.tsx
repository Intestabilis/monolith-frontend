import { getCampaignEditorConfig } from "../../../lib/tiptap/editorConfigs";
import { useCampaignContent } from "../hooks/useCampaignContent"; // Твій новий хук
import { useUpdateCampaignContent } from "../hooks/useUpdateCampaignContent";
import DocumentEditor from "../../../components/editor/DocumentEditor";

import { type JSONContent } from "@tiptap/react";
import { useMemo } from "react";

interface CampaignEditorProps {
  campaignId: string;
  isMaster: boolean;
}

export default function CampaignEditor({
  campaignId,
  isMaster,
}: CampaignEditorProps) {
  const { campaignContent, isPending: isFetching } =
    useCampaignContent(campaignId);

  const extensions = useMemo(
    () => getCampaignEditorConfig(campaignId),
    [campaignId],
  );

  const { updateContent, isPending } = useUpdateCampaignContent();

  // CHANGE to proper loader
  if (isFetching || !campaignContent) {
    return (
      <div className="flex w-full min-h-125  border-dashed items-center justify-center border-2 border-border-strong bg-surface">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <span className="text-4xl text-text-muted">📜</span>
          <p className="font-mono text-sm uppercase tracking-widest text-text-muted">
            Завантаження...
          </p>
        </div>
      </div>
    );
  }

  const initialContent = campaignContent.data.content || {
    type: "doc",
    content: [{ type: "paragraph" }],
  };
  function handleSave(content: JSONContent, onSuccessCallback: () => void) {
    updateContent(
      { id: campaignId, content },
      {
        onSuccess: () => {
          // reset from DocumentEditor
          onSuccessCallback();
        },
      },
    );
  }

  return (
    <DocumentEditor
      initialContent={initialContent}
      extensions={extensions}
      isEditable={isMaster}
      isSaving={isPending}
      onSave={handleSave}
      className="w-full"
      editorClassName="min-h-125 p-4 md:p-6"
    />
  );
}
