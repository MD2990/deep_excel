import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Excel Analyzer",
  description: "Analyze your excel files with ease , Created by Majid Ahmed",
  url: "https://deep-excel.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
