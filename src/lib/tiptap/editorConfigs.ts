import StarterKit from "@tiptap/starter-kit";
import { type Extensions } from "@tiptap/react";
import FileHandler from "@tiptap/extension-file-handler";
import TextAlign from "@tiptap/extension-text-align";

import Heading from "@tiptap/extension-heading";
import { LineHeight, TextStyle } from "@tiptap/extension-text-style";
import { ImageUploader } from "./extensions/ImageUploader";
import { ResizableImage } from "./extensions/ResizableImage";
import { TabExtension } from "./extensions/TabExtension";

const baseExtensions: Extensions = [
  StarterKit.configure({
    heading: false,
    dropcursor: {
      color: "var(--color-primary)",
    },
  }),
  TabExtension,
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export const getCampaignEditorConfig = (campaignId: string): Extensions => [
  ...baseExtensions,
  Heading.configure({ levels: [1, 2, 3] }),
  ResizableImage,
  ImageUploader.configure({
    campaignId: campaignId,
  }),
  LineHeight.configure({
    types: ["textStyle"],
  }),
  FileHandler.configure({
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    onDrop: (editor, files, pos) => {
      files.forEach((file) => {
        editor.chain().focus().setTextSelection(pos).uploadImage(file).run();
      });
    },

    onPaste: (editor, files) => {
      files.forEach((file) => {
        editor.chain().focus().uploadImage(file).run();
      });
    },
  }),
];

export const questEditorConfig = [...baseExtensions];
