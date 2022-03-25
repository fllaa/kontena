import { useState } from "react";
import { FcFile, FcFolder } from "react-icons/fc";
import { truncate } from "../utils/string";

export default function ListFile({ file, layout }) {
  const [length, setLength] = useState(30);
  return (
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
  );
}
