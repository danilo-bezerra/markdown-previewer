import { useContext } from "react";
import { IMarkdown } from "../../models/models";

import { AiOutlineFileText } from "react-icons/ai";
import { MarkdownContext } from "../../contexts/markdownContext";

type Props = {
  markdown: IMarkdown;
  selected?: boolean;
};

export default function SidebarItem({ markdown, selected }: Props) {
  const { selectMarkdown } = useContext(MarkdownContext);

  return (
    <li
      className={`flex gap-2 items-center text-sm p-3 rounded-md dark:hover:bg-blue-500/20 cursor-pointer
        ${selected ? "bg-blue-500/20 " : ""}
    `}
      onClick={() => selectMarkdown(markdown)}
    >
      <AiOutlineFileText size={20} />
      <span>{markdown.filename}</span>
    </li>
  );
}
