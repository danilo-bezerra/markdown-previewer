import { useContext } from "react";
import useSidebar from "../../hooks/useSidebar";
import { MarkdownContext } from "../../contexts/markdownContext";
import Button from "../Buttons/Button";

import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../Buttons/IconButton";
import MarkdownItem from "./MarkdownItem";

export default function Sidebar() {
  const {
    markdownList,
    createMarkdown,
    selected: selectedMarkdown,
  } = useContext(MarkdownContext);
  const { isOpen, onClose } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 w-screen md:w-80 h-screen p-6  z-40 transition-all bg-[#1d1f22]
      ${isOpen ? " left-0" : "-left-[100vw] md:-left-80"}
      `}
    >
      <div className="flex justify-end mb-6">
        <IconButton className="" icon={AiOutlineClose} onClick={onClose} />
      </div>
      <Button onClick={createMarkdown} fullWidth>
        Novo Markdown
      </Button>

      <h2 className=" text-sm mt-6 font-semibold ">Salvos:</h2>
      <ul className="my-2  h-[60vh] max-h-[60vh] overflow-y-scroll">
        {markdownList.map((m) => (
          <MarkdownItem
            key={m.id}
            markdown={m}
            selected={selectedMarkdown?.id == m.id}
          />
        ))}
      </ul>
    </aside>
  );
}
