import {
  ClockIcon,
  CogIcon,
  CubeTransparentIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShareIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import styles from "./about-lerna.module.css";

interface Callout {
  title: string;
  text: string;
  link: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const callouts: Callout[] = [
  {
    title: "Never Rebuilds Same Code Twice",
    text: "Lerna won't run the tasks it executed before, and instead will restore the files and the terminal output from its cache.",
    link: "/docs/features/cache-tasks",
    icon: CogIcon,
  },
  {
    title: "Distributed Cache",
    text: "Computation cache can be shared between developers or CI/CD machines, drastically reducing average CI times.",
    link: "/docs/features/cache-tasks#distributed-computation-caching",
    icon: ShareIcon,
  },
  {
    title: "Target Dependencies",
    text: "Lerna lets you specify how different targets (npm scripts) depend on each other.",
    link: "/docs/features/run-tasks#target-dependencies-aka-task-pipelines",
    icon: RectangleStackIcon,
  },
  {
    title: "Efficient Execution",
    text: "Lerna runs any command in the most efficient way with the max degree of parallelization while respecting the execution order.",
    link: "/docs/features/run-tasks",
    icon: ClockIcon,
  },
  {
    title: "Infinite Scaling with Distributed Execution",
    text: "Lerna can run any command across multiple machines without having to configure anything.",
    link: "/docs/features/distribute-tasks",
    icon: SparklesIcon,
  },
  {
    title: "Powerful Graph Visualizer",
    text: "Lerna comes with a powerful interactive workspace visualizer, helping you understand the architecture of your workspace.",
    link: "/docs/getting-started#visualizing-workspace",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0}
          d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
        />
      </svg>
    ),
  },
  {
    title: "Polished DX",
    text: "Lerna has a powerful dynamic CLI, making sure you only see what is relevant when you run commands against many projects.",
    link: "/docs/getting-started",
    icon: UsersIcon,
  },
  {
    title: "Minimal",
    text: "Lerna requires very little configuration, and doesn’t clutter your files. You still run your npm scripts, just faster.",
    link: "/docs/getting-started",
    icon: CubeTransparentIcon,
  },
  {
    title: "Lerna Does it All",
    text: "Why have separate tools for running tasks, linking packages and publishing them? Lerna does it--less config, less overhead.",
    link: "/docs/getting-started",
    icon: RectangleGroupIcon,
  },
];

function Callout(props: Callout): JSX.Element {
  return (
    <div className={clsx("margin-top--xl card shadow--lw", styles.callout)}>
      <div className="card__header">
        <h3 className={styles.callout__title}>
          <props.icon className={styles.callout__icon} stroke="currentColor" aria-hidden="true" />
          {props.title}
        </h3>
      </div>
      <div className="card__body">
        <p>
          <a href={props.link} className={styles.callout__link}>
            <span className="link--inset" aria-hidden="true"></span>
            {props.text}
          </a>
        </p>
      </div>
      <div className={styles.callout__bottom} />
    </div>
  );
}

export default function AboutLerna(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row margin-bottom--xl", styles.hero)}>
        <div className="col col--8">
          <div>
            <h1 className={clsx("margin-bottom--lg", styles.hero__title)}>为什么是Lerna?</h1>
            <p className={clsx("margin-bottom--md", styles.hero__text)}>
              Monorepos允许您在同一个存储库中开发多个包，这对于提高工作效率非常棒。您可以共享代码，建立明确的所有权，并拥有快速统一的CI。这就是为什么越来越多的团队转向这种开发方式.
            </p>
            <p className={clsx("margin-bottom--md", styles.hero__text)}>
              要想很好地使用monorepos，你需要一个好的monorepos工具，Lerna正是这样一个工具。 Lerna 是{" "}
              <a href="https://github.com/vsavkin/large-monorepo">快的</a>, 广泛使用，并经过实战检验。
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        {callouts.map((c) => (
          <div key={c.title} className="col col--4">
            <Callout title={c.title} text={c.text} link={c.link} icon={c.icon} />
          </div>
        ))}
      </div>
    </section>
  );
}
