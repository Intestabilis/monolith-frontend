import { Extension } from "@tiptap/react";
import { uploadEditorImage } from "../../../api/apiUpload";
import toast from "react-hot-toast";

// adding custom command to declaration
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUploader: {
      uploadImage: (file: File) => ReturnType;
    };
  }
}

export const ImageUploader = Extension.create<{ campaignId: string | null }>({
  name: "imageUploader",

  // campaign id as an option (de-facto mandatory parameter)
  addOptions() {
    return {
      campaignId: null,
    };
  },

  addCommands() {
    return {
      uploadImage:
        (file: File) =>
        ({ tr, dispatch, editor }) => {
          const campaignId = this.options.campaignId;

          if (!campaignId) {
            console.error("ImageUploader: campaignId is missing");
            return false;
          }

          // creating local blob for placeholder and well pasting it as a placeholder
          const localUrl = URL.createObjectURL(file);
          if (dispatch) {
            const imageNode = editor.schema.nodes.image.create({
              src: localUrl,
            });
            tr.replaceSelectionWith(imageNode);
          }

          // async (after uploading image to backend and getting url) searching for image with local blob url
          // basically this transaction - tiptap json tree
          uploadEditorImage(file, campaignId)
            .then((url) => {
              editor.commands.command(({ tr: asyncTr }) => {
                asyncTr.doc.descendants((node, pos) => {
                  if (
                    node.type.name === "image" &&
                    node.attrs.src === localUrl
                  ) {
                    // changing blob url to the real one
                    asyncTr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      src: url,
                    });
                  }
                });
                return true;
              });

              // REVIEW
              // this is not tiptap json tree but actual DOM that user sees in the moment
              // similar logic to image aligning dom manipulation - we do it manually to update actual view immediately and not only after saving changes in tiptap
              // fix to immediately find blob and change url to the real one
              setTimeout(() => {
                const imgDom = document.querySelector(`img[src="${localUrl}"]`);
                if (imgDom) {
                  imgDom.setAttribute("src", url);
                }
              }, 0);
            })
            .catch((err) => {
              // REVIEW how to remove "Error" word from, well, error (don't want to sort it out now)
              toast.error(`Помилка при завантаженні зображення: ${err}`);
              // finding deleting blob image from tiptap tree
              editor.commands.command(({ tr: errorTr }) => {
                errorTr.doc.descendants((node, pos) => {
                  if (
                    node.type.name === "image" &&
                    node.attrs.src === localUrl
                  ) {
                    errorTr.delete(pos, pos + node.nodeSize);
                  }
                });
                return true;
              });
            })
            .finally(() => {
              // clearing memory and blob url
              URL.revokeObjectURL(localUrl);
            });

          return true;
        },
    };
  },
});
