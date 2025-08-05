import Image from "next/image";

export default function TopBar(){
  return (
    <div className="flex shadow-lg backdrop-blur bg-gray-700/50 px-10 py-8 m-5 rounded-full border-3 border-gray-400  dark:border-gray-700  h-15 justify-between mx-50 items-center space-x-10">
      <Image
        src="/alpas_icon_hd.svg"
        alt="logo"
        width={100}
        height={100}
      />
      <div className="bg-white/50 p-2 px-15 m-3 rounded-full text-xl text-shadow-lg font-semibold text-white shadow border-4 border-gray-700/20">
        Selamat Datang Di Dashboard Admin !
      </div>
      <Image
        src="/wonton.png"
        alt="logo"
        width={50}
        height={50}
      />
    </div>
  )
}