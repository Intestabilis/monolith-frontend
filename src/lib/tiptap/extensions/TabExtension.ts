import { Extension } from "@tiptap/react";

export const TabExtension = Extension.create({
  name: "tabExtension",
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.insertContent("\t");
        return true;
      },
    };
  },
});
