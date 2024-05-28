"use client"

import React, { useEffect, useState,lazy } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ReactJson from "react-json-view"
import dynamic from "next/dynamic"

const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false });


const getDetailPokemon = async ({ id }: { id: string }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data
}

const DetailPokemon = () => {
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null)
  const [id, setId] = useState<string | null>(null)

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setUrlParams(params)
      setId(params.get('id'))
    }
  }, [])

  const { data: detailPokemon, error, status } =
    useQuery({
      queryKey: ["get-detail-pokemon", { id }],
      queryFn: () => getDetailPokemon({ id: id as string }),
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnMount: false,
      staleTime: 1000 * 30,
      enabled: !!id,
    });

 

  return (
    <div className="">
      <div className="text-center justify-center">
        <span className="text-black text-lg">Detail Pokemon <span className="font-bold text-xl">{detailPokemon?.name}</span></span>
      </div>

      <div className="max-h-[700px] overflow-y-auto mt-10">
        <DynamicReactJson
          name={null}
          indentWidth={2}
          theme={'ocean'}
          enableClipboard={false}
          displayDataTypes={false}
          shouldCollapse={() => false}
          collapseStringsAfterLength={20}
          collapsed={1}
          src={detailPokemon}
        />
      </div>
      <div className="border-solid"></div>
    </div>
  )
}

export default DetailPokemon
