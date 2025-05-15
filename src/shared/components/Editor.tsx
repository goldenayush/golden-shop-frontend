"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Editor.css";

type Props = {
   value: string;
   setValue: (value: string) => void;
};
const Editor = ({ value, setValue }: Props) => {
   return (
      <CKEditor //
         editor={ClassicEditor as any}
         data={value}
         config={{
            simpleUpload: {
               uploadUrl: "/upload",
               headers: {
                  Authorization: "Bearer sds",
               },
            },
            language: "en",
            placeholder: "Start typing your content here...",
            toolbar: {
               items: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "indent",
                  "outdent",
                  "|",
                  "imageUpload",
                  "blockQuote",
                  "insertTable",
                  "mediaEmbed",
                  "undo",
                  "redo",
               ],
               shouldNotGroupWhenFull: true,
            },
            image: {
               toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
            },
            table: {
               contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
            mediaEmbed: {
               previewsInData: true,
            },
            removePlugins: [
               "Title", // Optional: remove unwanted plugins
            ],
         }}
         onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data);
         }}
      />
   );
};

export { Editor };
