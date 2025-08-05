// app/not-found.js
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Text over the GIF */}
      <div className="absolute top-10 z-10 text-center px-4">
        <h1 className="text-black text-3xl font-bold mb-4 drop-shadow-lg">
          The frontend requested this page. <br />
          The backend said, “bro I didn’t even build that API”
        </h1>
        <p className="text-black text-lg drop-shadow-md">
          Maybe it ran away, maybe it never existed, maybe it just ghosted you like your ex.<br />
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
        src="/images/Animated 404 Page not found/bg.gif"
        alt="Funny 404"
        width={1000}
        height={1000}
        priority
        className="mx-auto"
      />
    </div>
  );
}
