---
id: run-tasks
title: 运行任务
type: explainer
---

# 运行任务

Monorepos可以有数百甚至数千个项目，所以能够对所有(或部分)项目运行npm脚本是Lerna这样的工具的一个关键特性。

## 定义

- **Command -** 开发人员输入终端的任何内容 (e.g., `lerna run build --scope=header --concurrency=5`).
- **Target -** NPM脚本的名称 (e.g., `build`)
- **Task -** NPM脚本的调用 (e.g., `header:build`).

## 示例库

> 示例是基于[这个存储库](https://github.com/lerna/getting-started-example)的，因此可以随意克隆它并继续进行。

## 运行一切

每个项目都定义了`test` 和 `build`脚本。

运行: 

```bash
npx lerna run build
```

This will build the projects in the right order: `footer` and `header` and then `remixapp`.
这将以正确的顺序构建项目:`footer` 和 `header`, 然后是 `remixapp`。

```bash title="Terminal Output"
    ✔  header:build (501ms)
    ✔  footer:build (503ms)
    ✔  remixapp:build (670ms)

 —————————————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for 3 projects (1s)

```

请注意，Lerna并不关心每个构建脚本做什么。`build`这个名字也**不是**特别的:它只是npm脚本的名字。

## 运行单个任务

在开发过程中，您很少运行所有的构建或所有的测试。相反，您经常只针对您正在更改的项目运行事情。例如，你可以像这样运行`header`测试:

```bash
npx lerna run test --scope=header
```

## 运行受PR影响的任务

你也可以对PR中受影响的所有项目执行如下命令:

```bash
npx lerna run test --since=origin/main
```

[这里](../api-reference/commands)了解更多.

## 控制任务的运行方式

要对执行的订单任务进行更多控制，请编辑[任务管道配置](../concepts/task-pipeline-configuration)。

若要加快任务执行速度，请了解如何[缓存任务结果](./cache-tasks)和[分发任务执行](./distribute-tasks)

## 自动加载.env文件

默认情况下，由Nx驱动的现代任务运行器会自动为你加载`.env`文件。如果您出于任何原因想要禁用此行为，您可以将`--load-env-files` 设置为`false`。

有关默认加载的`.env`文件的详细信息，请参阅: https://nx.dev/recipes/environment-variables/define-environment-variables