"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";




export default function Home() {
 
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registration successful with scope: ', registration.scope);
        }).catch(error => {
          console.log('Service Worker registration failed: ', error);
        });
    }
  }, []);

  useEffect (() => {
    redirect('/mainpage')
  },[])

  return (

    null

  )
}