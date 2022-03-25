import Link from "next/link";
import { BsFolder2, BsFileEarmark } from "react-icons/bs";

export default function Breadcrumb({ path, index, item }) {
  let arrPath = [];
  if (path) {
    path.forEach((item, i) => {
      if (i <= index) {
        arrPath.push(item);
      }
    });
  }
  const linkPath = "/" + arrPath.join("/");
  return (
    <li>
      <Link href={linkPath}>
        <a>
          <div className="flex gap-1 items-center">
            <BsFolder2 />
            <span>{item}</span>
          </div>
        </a>
      </Link>
    </li>
  );
}
