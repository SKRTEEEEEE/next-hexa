import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Awaited<{locale: string }>;
}) {
  const locale = (await params).locale
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});
 
  return (
    <html suppressHydrationWarning className="scroll-pt-[3.5rem]" lang={locale}>
      <body className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <NextIntlClientProvider  messages={messages}>
          <Toaster/>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


// import {NextIntlClientProvider} from 'next-intl';
// import {getMessages} from 'next-intl/server';
// import {notFound} from 'next/navigation';
// import {routing} from '@/i18n/routing';
// import { cn } from '@/lib/utils';
// import { Inter as FontSans } from "next/font/google";
// import { Toaster } from '@/components/ui/toaster';

// const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

// export default async function LocaleLayout({
//   children,
//   params
// }: {
//   children: React.ReactNode;
//   params: Awaited<{locale: string }>;
// }) {
//   const locale = (await params).locale
//   // Ensure that the incoming `locale` is valid
//   if (!routing.locales.includes(locale as any)) {
//     notFound();
//   }

//   // Providing all messages to the client
//   // side is the easiest way to get started
//   const messages = await getMessages({locale});
 
//   return (
//     <>
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//             document.documentElement.lang = "${locale}";
//           `,
//         }}
//       />
//       <NextIntlClientProvider messages={messages}>
//         <Toaster />
//         {children}
//       </NextIntlClientProvider>
//     </>
//   );
// }