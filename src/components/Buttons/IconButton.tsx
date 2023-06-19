import { DetailedHTMLProps } from "react";
import { IconType } from "react-icons";

type Props = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: IconType;
  iconSize?: number;
};

export default function IconButton({
  icon: Icon,
  iconSize = 20,
  ...props
}: Props) {
  return (
    <button
      className="hover:bg-zinc-900 flex items-center justify-center w-10 h-10 rounded-full"
      {...props}
    >
      <Icon className="text-zinc-400" size={iconSize} />
    </button>
  );
}
