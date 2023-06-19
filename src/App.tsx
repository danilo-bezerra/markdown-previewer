import { useState, useEffect } from "react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSave,
  AiOutlineFileText,
  AiOutlineDownload,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import MarkdownPreview from "@uiw/react-markdown-preview";
import Button from "./components/Buttons/Button";
import IconButton from "./components/Buttons/IconButton";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [filename, setFilename] = useState("markdown");
  const [showMarkdown, setShowMarkdown] = useState(true);

  function handleSave() {
    localStorage.setItem("markdown", markdown);
  }

  function handleDownload() {
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

  useEffect(() => {
    const localMarkdown = localStorage.getItem("markdown");
    if (localMarkdown) {
      setMarkdown(localMarkdown);
    }
  }, []);

  return (
    <div className="bg-zinc-800 h-screen max-h-screen dark:text-zinc-100">
      <header className="flex justify-between items-center  gap-4 p-4 h-20 bg-[#2b2d31]">
        <div className="flex gap-2 items-center">
          <AiOutlineFileText size={20} />
          <label className="flex flex-col ">
            <span className="text-sm">filename</span>
            <input
              className="bg-transparent border-b border-b-zinc-400 hover:border-b-blue-600 outline-none w-32 md:w-auto"
              type="text"
              value={filename}
              onChange={({ target }) => setFilename(target.value)}
            />
          </label>
        </div>

        <div className="flex gap-3">
          <IconButton icon={BsTrash} onClick={() => setMarkdown("")} />

          <IconButton
            icon={AiOutlineDownload}
            iconSize={24}
            onClick={handleDownload}
          />

          <Button icon={AiOutlineSave} onClick={handleSave}>
            <span className="hidden md:block">Save</span>
          </Button>
        </div>
      </header>
      <main className="h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]   ">
        <section
          className={`relative grid  h-full bg-[#151619] ${
            showMarkdown ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div
            className={` overflow-y-hidden md:border-r border-r-gray-400 bg-[#151619] ${
              showMarkdown
                ? "fixed  z-20 top-20 left-0 right-0 bottom-0 md:z-auto md:top-auto  md:block md:relative md:bg-transparent"
                : "hidden relative"
            }`}
          >
            <header className="sticky top-0 p-4 flex justify-between items-center text-sm dark:bg-[#1d1f22] dark:text-gray-400 font-thin">
              MARKDOWN
              <button
                onClick={() => setShowMarkdown((v) => !v)}
                className={`md:hidden`}
              >
                {showMarkdown ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </header>
            <textarea
              value={markdown}
              onChange={({ target }) => setMarkdown(target.value)}
              className="p-4 resize-none h-[calc(100%-52px)]  w-full bg-transparent outline-none no-scrollbar"
              spellCheck={false}
            ></textarea>
          </div>
          <div
            className={`relative   overflow-y-scroll no-scrollbar 
            ${showMarkdown ? "" : ""}
          `}
          >
            <header className="sticky top-0 flex items-center justify-between p-4 text-sm dark:bg-[#1d1f22] dark:text-gray-400 font-thin">
              PREVIEW
              <button
                onClick={() => setShowMarkdown((v) => !v)}
                className="z-30"
              >
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
