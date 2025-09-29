import { MenuIcon } from "lucide-react";
import Button from "./atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./atoms/dropdown-menu";
import NavLink from "./atoms/navlink";
import BackButton from "./molecules/back-button";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground flex w-full items-center justify-between py-4 px-8 border-b border-neutral-100">
      <div className="flex items-center gap-4">
        <BackButton />
        <span className="font-bold text-2xl tracking-wide">Terê Verde</span>
      </div>

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
