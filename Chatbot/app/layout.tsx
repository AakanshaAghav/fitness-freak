import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fitness Tracker - Your Personal Health Companion",
  description:
    "AI Fitness Tracker is an intelligent web app that connects with your smartwatch to monitor your exercise routines, chat with an AI fitness coach, and calculate calories for a healthier lifestyle.",
};

const latoFont = Lato({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${latoFont.className}`}>
        {children}
      </body>
    </html>
  );
}
