import { useState } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"

interface Language {
  code: string
  name: string
  flag: string
  promptFile: string
}

interface LanguageSwitchProps {
  languages: Language[]
  currentLanguage: string
  onLanguageChange: (languageCode: string) => void
}

export function LanguageSwitch({ languages, currentLanguage, onLanguageChange }: LanguageSwitchProps) {
  const [open, setOpen] = useState(false)

  const current = languages.find(lang => lang.code === currentLanguage)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {current ? (
              <>
                <span className="text-lg">{current.flag}</span>
                {current.name}
              </>
            ) : (
              "Select language..."
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.code}
                  onSelect={(value) => {
                    onLanguageChange(value)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{language.flag}</span>
                    {language.name}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentLanguage === language.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}