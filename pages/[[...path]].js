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
import { bytesToSize, jsonToQueryString } from "../utils/string";

export default function Home({ data }) {
  const router = useRouter();
  const path = router.query.path || [];
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(data.list);
  const [layout, setLayout] = useState("list");
  useEffect(() => {
    themeChange(false);
  }, []);
  useEffect(() => {
    if (data.list) setFiles(data.list);
  }, [data.list]);
  useEffect(() => {
    if (data.file) setFile(data.file);
  }, [data.file]);
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
            {path.length > 0 && <Breadcrumb name={path[0]} />}
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
      {path.length === 3 ? (
        file && (
          <div className="flex justify-center py-12 mx-8 mb-4 lg:mx-24 lg:mb-12 bg-neutral text-neutral-content rounded-bl rounded-br shadow-2xl">
            <a
              href={"/api/v1/drive/get/download/" + jsonToQueryString(file)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary space-x-2"
            >
              <div className="badge badge-secondary">
                {bytesToSize(file.size)}
              </div>
              <span>Download</span>
            </a>
          </div>
        )
      ) : (
        <div
          className={`${
            layout === "list" ? "flex flex-col" : "grid grid-cols-4"
          } mx-8 mb-4 lg:mx-24 lg:mb-12 bg-neutral text-neutral-content rounded-bl rounded-br shadow-2xl`}
        >
          {files.map((file) => (
            <ListFile key={file.id} file={file} layout={layout} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const { origin } = absoluteUrl(req);
  const { path } = query;
  if (path) {
    if (path.length === 3) {
      if (path[2] === "view") {
        const res = await fetch(origin + "/api/v1/drive/get/info/" + path[1]);
        const file = await res.json();
        console.log(file);
        return {
          props: { data: { file } },
        };
      }
    }
    const res = await fetch(origin + "/api/v1/drive/list/" + path[1]);
    const list = await res.json();
    return {
      props: { data: { list } },
    };
  } else {
    const res = await fetch(origin + "/api/v1/drive/list/");
    const list = await res.json();
    return {
      props: { data: { list } },
    };
  }
}
