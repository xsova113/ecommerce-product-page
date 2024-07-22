import { PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import CartBox from "./CartBox";

// ${
//     cartOpen ? "z-50 translate-y-0" : "-translate-y-[500%] opacity-0"
//   }

export default function CartDropDownMenu({ children }: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div
          className={`absolute -right-[200%] top-[85px] z-50 hidden rounded-2xl border border-white bg-zinc-500/90 shadow-2xl backdrop-blur duration-500 ease-in-out sm:-right-[130px] sm:top-14 sm:block 
          `}
        >
          <CartBox />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
