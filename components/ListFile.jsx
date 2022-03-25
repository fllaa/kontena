import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcFile, FcFolder } from "react-icons/fc";
import { truncate } from "../utils/string";

export default function ListFile({ file, layout }) {
  const [length, setLength] = useState(30);
  const router = useRouter();
  let link = router.asPath + file.name;
  if (router.asPath !== "/") {
    link = router.asPath + "/" + file.name;
  }
  return (
    <Link href={link}>
      <a
        onMouseEnter={() => setLength(150)}
        onMouseLeave={() => setLength(30)}
        className="flex items-center p-4 cursor-pointer hover:bg-neutral-focus gap-2"
      >
        {file.mimeType === "application/vnd.google-apps.folder" ? (
          <FcFolder />
        ) : (
          <FcFile />
        )}
        {truncate(file.name, layout === "list" ? 150 : length)}
      </a>
    </Link>
  );
}
