---
id: lerna-and-nx
title: Lerna 和 Nx
type: explainer
---

# Lerna 和 Nx


Nrwl(开源构建系统Nx背后的公司)接管了[Lerna的管理工作](https://dev.to/nrwl/lerna-is-dead-long-live-lerna-3jal)。[Nx](https://nx.dev)是由前Google人员开发的构建系统，它利用了谷歌内部工具使用的许多技术。Lerna v5是这个新管理下的第一个版本，它更新了过时的包，并开始对存储库本身进行一些清理。从v5.1+开始，Lerna提供了集成Nx的新可能性，并将大量任务调度工作推迟到Nx。

下面是每个工具所提供功能的高级概述。请注意，所有现有的Lerna命令都将继续发挥作用。添加Nx或Nx Cloud只是改进了您已经在做的事情。

## Lerna

### 特性

1. [Version](./features/version-and-publish) - 自动增加包的版本，生成更新日志信息，创建Github版本等。
2. [Publish](./features/version-and-publish) - 自动创建标记并将包发布到包注册中心，例如npm

### 成本

免费开源

### 设置

- `npm install lerna`
- `npx lerna init`

---

## Nx

### 特性

1. [只运行受代码更改影响的任务](./features/run-tasks)
2. [首先运行必备任务](./features/run-tasks)
3. [本地缓存任务结果](./features/cache-tasks)
4. [可视化项目图](./features/project-graph)
5. [Nx Console](./features/editor-integrations#nx-console-for-vscode) - Visual Studio Code plugin

### 成本

免费开源

### 设置

- `npx lerna add-caching`
- 继续像往常一样使用Lerna

:::note
当Lerna使用Nx运行任务并检测到Nx目标配置时，它将遵从Nx来检测任务依赖关系。`lerna run`的一些选项将与旧版本的lerna表现不同。更多细节请参见[使用Lerna(由Nx支持)来运行任务](docs/lerna6-obsolete-options.md)。
:::

---

## Nx Cloud

### 特性

1. [跨组织共享缓存的任务结果](./features/cache-tasks#distributed-computation-caching)
2. 高效地跨代理机器[分布式任务执行](./features/distribute-tasks)

### 成本

免费用于开源项目

对于闭源存储库，每月前500个计算小时是免费的。大多数存储库都不会超过这个限制。之后每计算小时$1。

### 设置

- `npx nx connect-to-nx-cloud`
- `nx generate @nrwl/workspace:ci-workflow` (或手动设置CI)
- 继续像往常一样使用Lerna
