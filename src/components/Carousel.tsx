"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Template = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
  deks?: string;
};

export function CarouselTemplate() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*");

      if (error) {
        console.error("Gagal fetch template:", error.message);
      } else {
        setTemplates(data || []);
      }
    };

    fetchTemplates();
  }, [supabase]);

  const url =
    "https://bmgeuqxyshumafaxsauc.supabase.co/storage/v1/object/public/";
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {templates.map((template) => (
          <CarouselItem key={template.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    src={url + template.image_url.trim()}
                    alt={template.title}
                    width={500}
                    height={500}
                    unoptimized
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
