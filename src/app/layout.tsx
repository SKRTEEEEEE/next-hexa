import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    children
  )
}
// import "./globals.css";
// import { cn } from '@/lib/utils';
// import { Inter as FontSans } from "next/font/google";

// const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html suppressHydrationWarning className="scroll-pt-[3.5rem]" lang="en">
//       <body
//         className={cn(
//           "min-h-dvh bg-background font-sans antialiased",
//           fontSans.variable
//         )}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
