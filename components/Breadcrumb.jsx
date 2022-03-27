export default function Breadcrumb({ name }) {
  return (
    <li>
      <a>
        <div className="flex gap-1 items-center">
          <span>{name}</span>
        </div>
      </a>
    </li>
  );
}
