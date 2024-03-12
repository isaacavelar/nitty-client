import { useEffect, useState } from "react"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import { Search } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function SearchHeader() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(open => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);
    
    const click = () => {
        setOpen(true)
    }


  return (
        <div>
            <Button onClick={click} className="h-8 bg-background text-sm font-normal text-muted-foreground shadow-none mr-1" variant="outline">
                <Search className="w-4 h-4"/>
                Buscar na plataforma...
                <p className="text-sm text-muted-foreground">
                    {" "}
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-5">
                        <span className="text-x5">⌘</span>k
                    </kbd>
                </p>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                    <FaceIcon className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                    <RocketIcon className="mr-2 h-4 w-4" />
                    <span>Launch</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>
                    <PersonIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                    <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                    <span>Mail</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                    <GearIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}