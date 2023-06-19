import { useState } from "react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSave,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import MarkdownPreview from "@uiw/react-markdown-preview";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [filename, setFilename] = useState("markdown");
  const [showMarkdown, setShowMarkdown] = useState(true);

  function handleSave() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(markdown)
    );
    element.setAttribute("download", filename || "markdown.md");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <div className="bg-zinc-800 h-screen max-h-screen dark:text-zinc-100">
      <header className="flex  gap-4 p-4 h-20 bg-[#2b2d31]">
        <div className="flex gap-2 items-center">
          <AiOutlineFileText size={20} />
          <label className="flex flex-col ">
            <span className="text-sm">filename</span>
            <input
              className="bg-transparent border-b border-b-zinc-400 hover:border-b-blue-600 outline-none"
              type="text"
              value={filename}
              onChange={({ target }) => setFilename(target.value)}
            />
          </label>
        </div>

        <button
          className="hover:bg-blue-900 flex items-center gap-2 text-left px-6 h-10 rounded-md bg-blue-600"
          onClick={handleSave}
        >
          <AiOutlineSave size={20} />
          <span>Save</span>
        </button>

        <button
          className="hover:bg-zinc-900 flex items-center justify-center w-10 h-10 rounded-full"
          onClick={() => setMarkdown("")}
        >
          <BsTrash className="text-zinc-400" size={20} />
        </button>
      </header>
      <main className="h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]   ">
        <section
          className={`relative grid   h-full ${
            showMarkdown ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div
            className={`relative  overflow-y-hidden border-r border-r-gray-400 ${
              showMarkdown ? "" : " hidden"
            }`}
          >
            <header className="sticky top-0 p-4  text-sm dark:bg-[#1d1f22] dark:text-gray-400 font-thin">
              MARKDOWN
            </header>
            <textarea
              value={markdown}
              onChange={({ target }) => setMarkdown(target.value)}
              className="p-4 resize-none h-[calc(100%-52px)]  w-full bg-transparent outline-none no-scrollbar"
              spellCheck={false}
            ></textarea>
          </div>
          <div className="relative   overflow-y-scroll no-scrollbar">
            <header className="sticky top-0 flex items-center justify-between p-4 text-sm dark:bg-[#1d1f22] dark:text-gray-400 font-thin">
              PREVIEW
              <button onClick={() => setShowMarkdown((v) => !v)}>
                {showMarkdown ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </header>
            <MarkdownPreview
              source={markdown}
              className="bg-transparent  p-4"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
