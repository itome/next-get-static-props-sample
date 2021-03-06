import Link from "next/link";

// README
// json response time in Chrome network inspector should be near to serverTaskTime
// but it acutualy shows serverTaskTime + renderingTaskTime.

export default function SomeDynamicPage(props) {
  const start = Date.now();
  // Simulate heavy rendering
  while (true) {
    if (Date.now() > start + 500) {
      break;
    }
  }

  const random = Math.floor(Math.random() * 1000);
  const renderingTaskTime = Date.now() - start;
  return (
    <div>
      <p>Server task takes: {props.serverTaskTime}</p>
      <p>Rendering task takes: {renderingTaskTime}</p>
      <Link href="/[wait]" as={random.toString()}>
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
      unstable_revalidate: 60,
      serverTaskTime: context.params.wait,
    },
  };
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
