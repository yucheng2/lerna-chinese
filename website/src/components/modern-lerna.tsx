import clsx from "clsx";
import React from "react";
import styles from "./about-lerna.module.css";

export default function ModernLerna(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row margin-bottom--xl", styles.hero)}>
        <div className="col col--6">
          <div>
            <h1 className={clsx("margin-bottom--lg", styles.hero__title)}>
              What is <br/> Modern Lerna?
            </h1>
            <p className={clsx("margin-bottom--md", styles.hero__text)}>
              Lerna现在比以前更快，更可靠，更强大。“新Lerna”具有现代功能，如本地和远程缓存支持，任务管道，改进的终端输出，更漂亮和NPM,Yarn,PNPM工作区支持，并结合了社区已经喜爱的功能:内置版本控制和发布工作流。
            </p>
          </div>
        </div>
        <div className="col col--6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/1oxFYphTS4Y"
            title=" Modern Lerna Walkthrough "
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
