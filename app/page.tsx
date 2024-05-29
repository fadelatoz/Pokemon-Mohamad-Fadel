"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";
import MainPage from "./mainpage/page";
import ThemeSwitch from "@components/themeSwitch";




export default function Home() {

  return (
    <>
      <ThemeSwitch />
      <MainPage />
    </>

  )
}