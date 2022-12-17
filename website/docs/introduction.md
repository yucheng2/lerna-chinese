---
id: introduction
title: 介绍
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

- **超级快!** Lerna速度很快，甚至比大多数可比的解决方案都快([请参阅此基准测试](https://github.com/vsavkin/large-monorepo)以了解更多信息)。为什么?在底层，[Lerna v6+使用Nx运行任务](https://twitter.com/i/status/1529493314621145090)。在这里了解[有关运行任务](./features/run-tasks.md)的更多信息。
- **计算缓存** Lerna知道您将要运行的任务在过去什么时候被执行过。Lerna不会运行它，而是会立即恢复哪些文件并重新在终端输出。另外，这个缓存可以与您的同事和CI共享。当使用Lerna时，您的整个组织将永远不必构建或测试相同的东西两次。[Read more &raquo;](./features/cache-tasks.md)
- **免配置分布式任务执行** Lerna可以在不需要任何配置的情况下将任何命令分布到多台机器上，同时保留在一台机器上运行命令的开发人体工程学。换句话说，使用Lerna扩展monorepo就像启用布尔标志一样简单。查看启用DTE如何使CI速度提高20倍的示例。 [Read more &raquo;](./features/distribute-tasks.md)

- **漂亮的终端输出** Monorepos可以有成百上千个项目。在每个命令上打印所有内容使得很难看到哪个失败和原因。值得庆幸的是，Lerna做得更好。
- **功能强大的图形可视化工具** Lerna提供了一个强大的交互式可视化工具，简化了对workspaces的理解。[Read more &raquo;](/docs/getting-started#visualizing-workspace)
- **发布到NPM** Lerna是将多个包发布到npm的终极工具。不管这些软件包是否有独立的版本，Lerna都会帮助你. [Read more &raquo;](./features/version-and-publish.md)
- **容易使用** 即使拥有所有这些功能，Lerna也非常容易使用。它需要接近零的配置. [Want to see how?](/docs/getting-started)
