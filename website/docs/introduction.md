---
id: introduction
title: Introduction
type: explainer
---

# 介绍

Lerna是TypeScript/JavaScript的原始[monorepo](https://monorepo.tools)工具。它已经存在了很多年，被成千上万的项目使用，包括React和Jest。

它解决了JavaScript的三个最大问题:

- Lerna在repo中链接不同的项目，因此它们可以相互导入，而无需向NPM发布任何内容。
- Lerna对任意数量的项目运行一个命令，它以最有效的方式、正确的顺序执行该命令，并有可能将该命令分布到多台机器上。
- Lerna管理你的发布过程，从版本管理到发布再到NPM，它提供了各种选项来确保任何工作流都可以被容纳。

Nrwl(开源构建系统Nx背后的公司)接管了[Lerna的管理工作](https://dev.to/nrwl/lerna-is-dead-long-live-lerna-3jal)。[Nx](https://nx.dev)是由前Google人员开发的构建系统，它利用了谷歌内部工具使用的许多技术。Lerna v5是这个新管理下的第一个版本，它更新了过时的包，并开始对存储库本身进行一些清理。从v6+开始，Lerna将任务调度工作委托给Nx的战斗测试，行业领先的任务运行器，这意味着`lerna run`可以免费获得缓存和命令分发的好处!

## 为什么是Lerna?

- **超级快!**Lerna速度很快，甚至比大多数可比的解决方案都快([请参阅此基准测试](https://github.com/vsavkin/large-monorepo)以了解更多信息)。为什么?在底层，[Lerna v6+使用Nx运行任务](https://twitter.com/i/status/1529493314621145090)。在这里了解[有关运行任务](./features/run-tasks.md)的更多信息。
- **Computation Caching** - Lerna knows when the task you are about to run has been executed in the past. Instead of running it, Lerna will restore the files and replay the terminal output instantly. Plus, this cache can be shared with your co-workers and CI. When using Lerna, your whole organization will never have to build or test the same thing twice. [Read more &raquo;](./features/cache-tasks.md)
- **Configuration-Free Distributed Task Execution** Lerna can distribute any command across multiple machines without any configuration, while preserving the dev ergonomics of running it on a single machine. In other words, scaling your monorepo with Lerna is as simple as enabling a boolean flag. See the examples of how enabling DTE can make you CI 20 times faster. [Read more &raquo;](./features/distribute-tasks.md)
- **Beautiful Terminal Output** Monorepos can have hundreds or thousands of projects. Printing everything on every command makes it hard to see what fails and why. Thankfully, Lerna does a much better job.
- **Powerful Graph Visualizer** Lerna comes with a powerful interactive visualizer simplifying the understanding of your workspaces. [Read more &raquo;](/docs/getting-started#visualizing-workspace)
- **Publishing to NPM** Lerna is the ultimate tool for publishing multiple packages to npm. Whether the packages have independent versions or not, Lerna has you covered. [Read more &raquo;](./features/version-and-publish.md)
- **Easy to Adopt** Even with all these capabilities, Lerna is very easy to adopt. It requires close-to-zero configurations. [Want to see how?](/docs/getting-started)
