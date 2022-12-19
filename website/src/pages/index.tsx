import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HeroLerna from "@site/src/components/hero-lerna";
import ProjectsUsingLerna from "@site/src/components/projects-using-lerna";
import PublishWithLerna from "@site/src/components/publish-with-lerna";
import PoweredByNx from "@site/src/components/powered-by-nx";
import AboutLerna from "@site/src/components/about-lerna";
import Link from '@docusaurus/Link';


export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="文档"
      description="Lerna是一个快速的现代构建系统，用于管理和发布来自同一个存储库的多个JavaScriptTypeScript包。"
    >
      <main>
        <HeroLerna />
        <ProjectsUsingLerna />
        <PoweredByNx />
        <PublishWithLerna />
        <AboutLerna />
      </main>
    </Layout>
  );
}
