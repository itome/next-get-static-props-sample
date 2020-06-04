import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/[wait]" as="500">
          <a>Go to dynamic route</a>
        </Link>
      </li>
    </ul>
  );
}
