/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // main: [{ type: "autogenerated", dirName: "." }],

  // But you can create a sidebar manually
  main: [
    "introduction",
    "getting-started",
    "lerna-and-nx",
    {
      type: "category",
      label: "特性",
      items: [
        "features/run-tasks",
        "features/cache-tasks",
        "features/share-your-cache",
        "features/project-graph",
        "features/distribute-tasks",
        "features/version-and-publish",
        "features/editor-integrations",
        "features/legacy-package-management",
      ],
      link: {
        type: "generated-index",
        title: "How To Guides",
        description: "Get Started",
        slug: "/features",
      },
    },
    {
      type: "category",
      label: "概念",
      items: [
        "concepts/task-pipeline-configuration",
        "concepts/how-caching-works",
        "concepts/dte-guide",
        "concepts/alternate-bootstrapping-methods",
        "concepts/hoisting",
      ],
      link: {
        type: "generated-index",
        title: "Concepts",
        description: "Get a higher level understanding of concepts used in Lerna",
        slug: "/concepts",
        keywords: ["caching", "dte", "versioning", "publishing"],
      },
    },
    {
      type: "category",
      label: "Recipes",
      items: ["recipes/using-pnpm-with-lerna"],
    },
    {
      type: "category",
      label: "API参考",
      items: ["api-reference/commands", "api-reference/configuration"],
    },
    "faq",
    "lerna6-obsolete-options",
    "troubleshooting",
  ],
};

module.exports = sidebars;
