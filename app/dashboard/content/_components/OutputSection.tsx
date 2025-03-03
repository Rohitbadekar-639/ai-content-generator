import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PROPS {
  aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {
  const editorRef: any = useRef(null);
  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className="border bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-medium text-lg">Your Result: </h2>
        <Button onClick={() => navigator.clipboard.writeText(aiOutput)}>
          <Copy />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        height="430px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
}

export default OutputSection;
