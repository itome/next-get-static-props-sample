import Link from "next/link";

export default function SomeDynamicPage(props) {
  const start = Date.now();
  // Simulate heavy rendering
  while (true) {
    if (Date.now() > start + 500) {
      break;
    }
  }

  const random = Math.floor(Math.random() * 1000);
  return (
    <div>
      <p>Server task takes: {props.serverTaskTime}</p>
      <p>Client task takes: {Date.now() - start}</p>
      <Link href="/[id]" as={random.toString()}>
        <a>Go to random dynamic route</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { wait: "500" } }],
    fallback: true,
  };
}
export async function getStaticProps(context) {
  await sleep(parseInt(context.params.wait));

  return {
    props: {
      serverTaskTime: context.params.wait,
    },
  };
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
