"use client"

import React, { useEffect, useState, lazy } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, Space } from 'antd';
import image from "next/image";



const getDetailPokemon = async ({ id, name }: { id: string, name: string }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  let paddex = id.length > 1 ? ('0' + id) : ('00' + id)
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddex}.png`

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  const dataArr = {
    arr: data,
    image: image
  }

  return dataArr
}


const DetailPokemon = () => {
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null)
  const [id, setId] = useState<string | null>(null)

  const { data: detailPokemon, error, status } =
    useQuery({
      queryKey: ["get-detail-pokemon", { id }],
      queryFn: () => getDetailPokemon({ id: id as string, name: name as unknown as string }),
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnMount: false,
      staleTime: 1000 * 30,
      enabled: !!id,
    });


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setUrlParams(params)
      setId(params.get('id'))
    }
  }, [])



  return (
    <div className="">
      <div className="text-center justify-center">
        <span className="text-black text-lg">Detail Pokemon <span className="font-bold text-xl">{detailPokemon?.arr?.name}</span></span>
      </div>

      <div className="justify-center mt-10 p-14">
        <Card className="md:h-[900px] " title={`Detail Pokemon ${detailPokemon?.arr?.name}`}>
          <div className="grid gap-4">
            <div className="flex justify-center">
              <img src={detailPokemon?.image} alt='profileImg' className='rounded-full object-cover md:w-[250px] md: h-[250px] justify-center text-center flex' />
            </div>
            <span className="font-mono text-lg">Pokemon Names:  <span className="text-black font-bold ">{detailPokemon?.arr?.name}</span> </span>
            <span className="font-mono text-lg">Base Happines:  <span className="text-black font-bold">{detailPokemon?.arr?.base_happiness}</span> </span>
            <span className="font-mono text-lg">Capture Rate:  <span className="text-black font-bold">{detailPokemon?.arr?.capture_rate}</span> </span>
            <span className="font-mono text-lg">Egg Groups:  <span className="text-black font-bold">{detailPokemon?.arr?.egg_groups.map((v: any, k: string) => v.name.toString())}</span> </span>
            <span className="font-mono text-lg">Evolves Species: <span className="text-black font-bold">{detailPokemon?.arr?.evolves_from_species?.name}</span> </span>
            <span className="font-mono text-lg">Gender Rate:  <span className="text-black font-bold">{detailPokemon?.arr?.gender_rate}</span> </span>
            <span className="font-mono text-lg">Is Baby:  <span className="text-black font-bold">{detailPokemon?.arr?.is_baby}</span> </span>
            <span className="font-mono text-lg">Is Legendary:  <span className="text-black font-bold">{detailPokemon?.arr?.is_legendary}</span> </span>
            <span className="font-mono text-lg">Is Mythical:  <span className="text-black font-bold">{detailPokemon?.arr?.is_mythical}</span> </span>
            <span className="font-mono text-lg">Names:  <span className="text-black font-bold">{detailPokemon?.arr?.names.map((v : string | any, k : number) => [v.name].toString())}</span> </span>
            <span className="font-mono text-lg">Pokemon Names:  <span className="text-black font-bold">{detailPokemon?.arr?.name}</span> </span>
          </div>
        </Card>

      </div>
      <div className="border-solid"></div>
    </div>
  )
}

export default DetailPokemon
