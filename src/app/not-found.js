// app/not-found.js
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative  bg-white flex justify-center items-center min-h-screen">
      
      <div className="absolute top-10 z-10 text-center px-4 mb-10">
        {/* <h1 className="text-black text-3xl font-bold mb-4 ">
          The frontend requested this page. <br />
          The backend said, “bro I didn’t even build that API”
        </h1> */}
         <h1 className="text-black text-3xl font-bold mb-4 ">
          Page Not Found
        </h1>
        <p className="text-black text-lg ">
          Maybe it ran away, maybe it never existed, maybe it just ghosted you.<br />
          <Link
            href="/"
            className="text-[#2c8c91] font-bold underline"
          >
            Go Home
          </Link>
        </p>
      </div>

      {/* Background GIF */}
      <Image
        src="/images/Animated 404 Page Not Found/bg.gif"
        alt="Funny 404"
        width={800}
        height={800}
        priority
        className="mx-auto mt-8"
      />
    </div>
  );
}
