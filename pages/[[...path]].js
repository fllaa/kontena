import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsLayoutWtf, BsList, BsGrid, BsHouse } from "react-icons/bs";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";
import { themeChange } from "theme-change";
import Navbar from "../components/Navbar";
import ListFile from "../components/ListFile";
import Breadcrumb from "../components/Breadcrumb";

export default function Home({ data }) {
  const router = useRouter();
  const path = router.query.path || [];
  const [files, setFiles] = useState(data);
  const [layout, setLayout] = useState("list");
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div>
      <Head>
        <title>Kontena</title>
      </Head>
      <Navbar data={data} setFiles={setFiles} />
      <div className="flex justify-between items-center mx-8 mt-4 lg:mx-24 lg:mt-12 bg-primary text-primary-content rounded-tl rounded-tr shadow-2xl px-4 py-2">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">
                <a>
                  <BsHouse />
                </a>
              </Link>
            </li>
            {path.length > 0 &&
              path.map((item, index) => (
                <Breadcrumb key={index} path={path} index={index} item={item} />
              ))}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost">
            <BsLayoutWtf className="mr-2" />
            Layout
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52"
          >
            <li>
              <a
                onClick={() => setLayout("list")}
                className={
                  layout === "list" ? "bg-primary text-primary-content" : ""
                }
              >
                <BsList />
                List
              </a>
            </li>
            <li>
              <a
                onClick={() => setLayout("grid")}
                className={
                  layout === "grid" ? "bg-primary text-primary-content" : ""
                }
              >
                <BsGrid />
                Grid
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          layout === "list" ? "flex flex-col" : "grid grid-cols-4"
        } mx-8 mb-4 lg:mx-24 lg:mb-12 bg-neutral text-neutral-content rounded-bl rounded-br shadow-2xl`}
      >
        {files.map((file) => (
          <ListFile key={file.id} file={file} layout={layout} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  const res = await fetch(origin + "/api/v1/gdrive");
  const data = await res.json();
  return {
    props: { data },
  };
}
