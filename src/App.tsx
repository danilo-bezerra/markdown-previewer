import { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import MarkdownPreview from "@uiw/react-markdown-preview";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [showMarkdown, setShowMarkdown] = useState(true);

  return (
    <div className="bg-zinc-800 h-screen max-h-screen dark:text-zinc-100">
      <header className="h-20 bg-[#2b2d31]"></header>
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
