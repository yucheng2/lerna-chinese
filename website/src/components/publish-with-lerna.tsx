import clsx from "clsx";
import React from "react";
import styles from "./publish-with-lerna.module.css";

export default function PublishWithLerna(): JSX.Element {
  return (
    <section className="padding-vert--xl container">
      <div className={clsx("row row--no-gutters shadow--md", styles.item)}>
        <div className={clsx("col col--6", styles.item__inner)}>
          <div>
            <h1 className="margin-bottom--md">发布包的终极工具</h1>
            <p className="margin-bottom--md">
              Lerna是将多个包发布到npm的终极工具。无论软件包是否有独立版本，Lerna都能满足您的需求。
            </p>
            <a className="button button--secondary" href="/docs/features/version-and-publish">
              发布包
            </a>
          </div>
        </div>
        <div
          className="col col--6"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/images/background/parcel.avif')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        ></div>
      </div>
    </section>
  );
}
