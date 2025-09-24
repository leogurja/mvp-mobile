import { MenuIcon } from "lucide-react";
import Button from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NavLink from "./ui/navlink";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between py-4 px-8 bg-white border-b border-neutral-100">
      <span className="font-bold text-2xl tracking-wide">Terê Verde</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Abrir menu">
            <MenuIcon className="size-7" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white shadow-md rounded-lg">
          <NavLink href="/trilhas">Trilhas</NavLink>
          <NavLink href="/cachoeiras">Cachoeiras</NavLink>
          <NavLink href="/eventos">Eventos</NavLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
