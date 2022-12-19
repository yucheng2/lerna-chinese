---
id: distribute-tasks
title: 分布式任务执行
type: recipe
---

# 分布式任务执行(DTE)

Lerna通过[缓存](/docs/features/cache-tasks)和`--since` 标志加快了平均CI时间。但这两种特征都无助于解决最坏的情况。当repo的核心部分被修改，并且每个任务都需要在CI中运行时，提高性能的唯一方法是添加更多的代理作业并有效地并行这些任务。

并行化任务最明显的方法是按类型拆分任务:在一个作业上运行所有测试，在另一个作业上运行所有构建，在第三个作业上运行所有lint任务。这种策略被称为“分箱”。如果一些测试任务将构建任务作为先决条件，这可能会变得很困难，但假设您找到了某种处理方法，典型的设置可能如下图所示。在这里，测试任务被延迟，直到所有必要的构建构件就绪，但是构建和lint任务可以立即开始。

![CI using binning](../images/dte/binning.svg)

分箱方法的问题是，您最终会在一个或多个作业上有一些空闲时间。Nx的分布式任务执行根据任务的平均运行时间将每个任务分配给代理作业，从而尽可能地减少空闲时间。Nx还保证任务以正确的顺序执行，并使用分布式缓存来确保以前任务的构建工件出现在每个需要它们的代理作业上。

当你设置Nx的分布式任务执行时，你的任务图看起来更像这样:

![CI using DTE](../images/dte/3agents.svg)

不仅CI完成得更快，而且调试体验就像在一个作业上运行所有CI一样。这是因为Nx使用分布式缓存在主作业上重新创建所有日志并构建工件。

在[详细的指南，以提高您的最坏情况CI时间](https://nx.dev/concepts/dte)找到更多信息.

## 开始

为了分配你的任务执行，你需要(1)连接到Nx Cloud和(2)在CI工作流中启用DTE。这些步骤中的每一个都可以用一个命令启用:

```shell title="1. Connect to Nx Cloud"
nx connect-to-nx-cloud
```

```shell title="2. Enable DTE in CI"
nx generate @nrwl/workspace:ci-workflow --ci=github
```

The `--ci` flag can be `github`, `circleci` or `azure`. For more details on setting up DTE, read [this guide](https://nx.dev/nx-cloud/set-up/set-up-dte).
`--ci`标志可以是 `github`, `circleci` 或 `azure`。有关设置DTE的详细信息，请阅读[本指南](https://nx.dev/nx-cloud/set-up/set-up-dte)。

## CI执行流程

分布式任务执行可以在任何CI提供程序上工作。您负责在CI系统中启动作业。然后Nx Cloud协调这些工作一起工作的方式。您需要在CI系统中创建两种不同类型的作业。

1. 一个控制将要执行的内容的主要作业
2. 实际执行任务的多个代理作业

主要的作业执行流如下所示:

```yaml
# 协调代理运行任务
- npx nx-cloud start-ci-run
# 在这里运行您想要的任何命令
- lerna run lint --since=main & lerna run test --since=main & lerna run build --since=main
# Stop any run away agents
- npx nx-cloud stop-all-agents
```

代理作业执行流程非常简单:

```yaml
# Wait for tasks to execute
- npx nx-cloud start-agent
```

如果您没有使用任何发行版，那么主要工作看起来或多或少是相同的。你唯一需要做的就是在开始时调用`npx nx-cloud start-ci-run`，并可选地在结束时调用`npx nx-cloud stop-all-agents`。

代理作业运行长时间运行的`start-agent`进程，该进程执行与给定CI运行相关的所有任务。你需要做的唯一一件事就是调用`npx nx-cloud start-agent`。此进程将一直运行，直到Nx Cloud通知它终止。

> 请注意，主作业和代理作业具有相同的环境和相同的源代码，这一点很重要。他们几乎同时开始。并且，一旦主作业完成，所有代理都将停止。

同样重要的是要注意，Nx Cloud代理不是机器，而是在机器上运行的长时间运行的进程。也就是说，Nx Cloud并不管理你的代理——你需要在CI配置中做这件事(查看下面的CI示例)。

Nx Cloud是一个编配器。主任务告诉Nx Cloud你想要运行什么，Nx Cloud会将这些任务分布到各个代理上。Nx Cloud会自动将文件从一个代理移动到另一个代理，从代理移动到主作业。

最终的结果是，当说`lerna run build --since=main`在主作业上完成时，所有在代理上创建的文件构件都被复制到主作业上，就好像主作业已经在本地构建了所有东西一样

## 并行运行

`--concurrency`被传播到代理。例如， `npx lerna run build --since=main --concurrency=3 --dte`告诉Nx Cloud在每个代理上并行运行最多3个构建目标。因此，如果您有10个代理，您将在所有代理上并行运行多达30个构建。

您还希望并行运行尽可能多的命令。例如,

```yaml
- lerna run lint --since=main 
- lerna run test --since=main 
- lerna run build --since=main
```

不如

```yaml
- lerna run lint --since=main & lerna run test --since=main & lerna run build --since=main
```

后者将同时调度所有三个命令，因此如果代理找不到任何要构建的命令，它将开始运行tests and lints。其结果是更好的代理利用率和更短的CI时间。

## CI/CD 例子

下面的示例展示了如何使用Nx和Nx Cloud(使用分布式任务执行和分布式缓存)来设置CI。

每个组织以不同的方式管理其CI/CD管道，因此示例不包括CI/CD特定于组织的方面(例如，部署)。他们主要关注正确配置Nx。

有关如何在CI中配置它们的更多信息，请阅读指南。

- [Overview](https://nx.dev/recipes/ci/ci-setup#distributed-ci-with-nx-cloud)
- [Azure Pipelines](https://nx.dev/recipes/ci/monorepo-ci-azure#distributed-ci-with-nx-cloud)
- [Circle CI](https://nx.dev/recipes/ci/monorepo-ci-circle-ci#distributed-ci-with-nx-cloud)
- [GitHub Actions](https://nx.dev/recipes/ci/monorepo-ci-github-actions#distributed-ci-with-nx-cloud)
- [Jenkins](https://nx.dev/recipes/ci/monorepo-ci-jenkins#distributed-ci-with-nx-cloud)

注意，只能分发可缓存的操作，因为它们必须在主作业上重播.

## 相关存储库和示例

- [Nx:关于如何通过一个小的配置更改使您的CI快16倍](https://github.com/vsavkin/interstellar)
- [“Lerna &分布式任务执行”示例](https://github.com/vsavkin/lerna-dte)
