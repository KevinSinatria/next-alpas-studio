import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const gambar = [
  {
    id: 1,
    path: '/ourkustom/custom2.png'
  },
  {
    id: 2,
    path: '/ourkustom/custom1.png'
  },
  {
    id: 3,
    path: '/ourkustom/custom3.png'
  },
]

export function CarouselKustom() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {gambar.map((gambar, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Image src={gambar.path} alt={`gambar ${gambar.id}`} width={500} height={500} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
