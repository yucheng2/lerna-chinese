import clsx from "clsx";
import React from "react";
import styles from "./powered-by-nx.module.css";

export default function PoweredByNx(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row row--no-gutters shadow--md", styles.item)}>
        <div
          className="col col--6"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/images/background/rocket.avif')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className={clsx("col col--6", styles.item__inner)}>
          <div>
            <h1 className={clsx("margin-bottom--md", styles.item__title)}>
              最快的构建系统 <span>由Nx提供</span>
            </h1>
            <p className="margin-bottom--md">
              Lerna以最有效的方式，以正确的顺序，并行地对任意数量的项目运行命令，使用高级缓存，并有可能将其分布在多台机器上。
            </p>
            <a className="button button--secondary" href="/docs/features/run-tasks">
              运行的任务
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
