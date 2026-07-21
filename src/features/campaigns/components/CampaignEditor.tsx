import { getCampaignEditorConfig } from "../../../lib/tiptap/editorConfigs";
import { useCampaignContent } from "../hooks/useCampaignContent";
import { useUpdateCampaignContent } from "../hooks/useUpdateCampaignContent";
import DocumentEditor from "../../../components/editor/DocumentEditor";

import { type JSONContent } from "@tiptap/react";
import { useMemo } from "react";
import Loader from "../../../components/ui/Loader";

interface CampaignEditorProps {
  campaignId: string;
  isMaster: boolean;
}

export default function CampaignEditor({
  campaignId,
  isMaster,
}: CampaignEditorProps) {
  const {
    campaignContent,
    isPending: isFetching,
    error,
  } = useCampaignContent(campaignId);

  const extensions = useMemo(
    () => getCampaignEditorConfig(campaignId),
    [campaignId],
  );

  const { updateContent, isPending } = useUpdateCampaignContent();

  if (isFetching) {
    return (
      <Loader
        variant="d20"
        size="lg"
        className="w-full min-h-125 bg-surface"
        text="Завантаження вмісту..."
      />
    );
  }

  // CHANGE to proper error alert REVIEW !campaignContent there
  if (error || !campaignContent) {
    return <div>ERROR</div>;
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
