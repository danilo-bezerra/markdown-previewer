import React, { DetailedHTMLProps } from "react";

import { IconType } from "react-icons";

const variants = {
  default: "hover:bg-blue-800 bg-blue-600",
  outline: "border border-blue-100 text-blue-100",
};

type Props = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: keyof typeof variants;
  label: string;
  icon?: IconType;
  fullWidth?: boolean;
};

export default function Button({
  variant = "default",
  icon: Icon,
  label,
  fullWidth,
  ...props
}: Props) {
  return (
    <button
      className={`
        flex items-center gap-2 h-10 px-6 rounded-md transition-colors
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
    `}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
}
