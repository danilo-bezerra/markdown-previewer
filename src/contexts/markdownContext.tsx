import { ReactNode, createContext, useState, useEffect } from "react";

import { IMarkdown } from "../models/models";

type MarkdownContextProps = {
  markdownList: IMarkdown[];
  selected: IMarkdown | null;
  createMarkdown: () => void;
  selectMarkdown: (markdown: IMarkdown) => void;

  updateMarkdown: (markdown: IMarkdown) => void;
  deleteMarkdown: (markdown: IMarkdown) => void;
};

export const MarkdownContext = createContext<MarkdownContextProps>({
  markdownList: [],
  selected: null,
  createMarkdown: () => {
    return;
  },
  selectMarkdown: () => {
    return;
  },
  updateMarkdown: () => {
    return;
  },
  deleteMarkdown: () => {
    return;
  },
});

type MarkdownContextProviderProps = {
  children: ReactNode;
};

export function MarkdownContextProvider({
  children,
}: MarkdownContextProviderProps) {
  const [markdownList, setMarkdownList] = useState<IMarkdown[]>([]);
  const [selected, setSelected] = useState<IMarkdown | null>(null);

  function createMarkdown() {
    const newMarkdown: IMarkdown = {
      id: crypto.randomUUID(),
      filename: `document-${Math.floor(Math.random() * 9999)}`,
      markdown: "",
    };
    const list = [newMarkdown, ...markdownList];
    setMarkdownList(list);
    selectMarkdown(newMarkdown);
    saveMarkdownList(list);
  }

  function selectMarkdown(markdown: IMarkdown) {
    setSelected(markdown);
  }

  function saveMarkdownList(list: IMarkdown[]) {
    localStorage.setItem("markdownList", JSON.stringify(list));
  }

  function updateMarkdown(markdown: IMarkdown) {
    const newList = markdownList.map((m) =>
      m.id === markdown.id ? markdown : m
    );
    setMarkdownList(newList);
    saveMarkdownList(newList);
  }

  function deleteMarkdown(markdown: IMarkdown) {
    const newList = markdownList.filter((m) => m.id != markdown.id);
    setMarkdownList(newList);
    setSelected(newList[0]);
    saveMarkdownList(newList);
  }

  useEffect(() => {
    const localMarkdownList = localStorage.getItem("markdownList");
    if (localMarkdownList) {
      const list = JSON.parse(localMarkdownList);
      setMarkdownList(list);
      setSelected(list[0] || null);
    } else {
      createMarkdown();
    }
  }, []);

  return (
    <MarkdownContext.Provider
      value={{
        markdownList,
        selected,
        createMarkdown,
        selectMarkdown,
        updateMarkdown,
        deleteMarkdown,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
}
