'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Languages } from 'lucide-react';
// import { Button } from '@/components/ui/button';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const localActive = useLocale();
  const route = usePathname();

  const pathname = route.split("/").slice(2).join("/");

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.push(`/${nextLocale}/${pathname}`);
      setOpen(false);
    });
  };

  const languages = [
    { value: 'es', label: 'Español' },
    { value: 'ca', label: 'Català' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button 
          variant="ghost" 
          size="icon"
          aria-label="Seleccionar idioma"
          className="w-10 h-10 rounded-full"
        >
          <Globe className="h-5 w-5" />
        </Button> */}
        <Languages className="transition-all duration-300 hover:text-secondary-ceo" />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandGroup>
            {languages.map(({ value, label }) => (
              <CommandItem
                key={value}
                onSelect={() => onSelectChange(value)}
                className="flex items-center gap-2 px-2 py-1.5"
                disabled={isPending}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/comm/logo-${value}.png`} alt={`${label} flag`} />
                  <AvatarFallback>{value.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{label}</span>
                {value === localActive && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

