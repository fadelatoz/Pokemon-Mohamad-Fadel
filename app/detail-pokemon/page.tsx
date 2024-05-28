"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import ReactJson from "react-json-view"

const getDetailPokemon = async ({ id }: { id: number }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data
}

const DetailPokemon = () => {

  const urlParams = new URLSearchParams(window?.location?.search);
  const id = urlParams.get('id');

  const { data: detailPokemon, error, status } =
    useQuery({
      queryKey: ["get-detail-pokemon", { id }],
      queryFn: () => getDetailPokemon({ id }),
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnMount: false,
      staleTime: 1000 * 30,
    });


  return (
    <div className="">
      <div className="text-center justify-center">
        <span className="text-black text-lg">Detail Pokemon <span className="font-bold text-xl">{detailPokemon?.name}</span></span>
      </div>

      <div className="max-h-[700px] overflow-y-auto mt-10">
          <ReactJson 
            name={null}
            indentWidth={2}
            theme={'ocean'}
            enableClipboard = {false}
            displayDataTypes={false}
            shouldCollapse = {false}
            
            collapseStringsAfterLength = {20}
            collapsed={1} 
            src={detailPokemon} />
        </div>
      <div className="border-solid"></div>
    </div>
  )
}

export default DetailPokemon
