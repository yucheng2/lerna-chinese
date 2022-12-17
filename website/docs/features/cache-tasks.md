---
id: cache-tasks
title: 缓存任务结果
type: recipe
---

# 缓存任务结果

> 当涉及到运行任务，缓存等，Lerna和Nx可以互换使用。当我们说“Lerna可以缓存构建”时，我们的意思是Lerna使用了可以缓存构建的Nx。

一遍又一遍地重新构建和重新测试相同的代码成本很高。Lerna使用计算缓存来避免两次重新构建相同的代码。

## 起步

Lerna via Nx拥有最复杂和经过实战考验的计算缓存系统。它知道您将要运行的任务之前何时已经执行过，因此它可以使用缓存来恢复运行该任务的结果。

:::tip

如果你没有 `nx.json`, 运行 `npx lerna add-caching`.

:::

要为 `build`和`test`启用缓存，请编辑 `nx.json`中的`cacheableOperations`属性,来包含`build`和 `test`任务:

```json title="nx.json"
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test"]
      }
    }
  }
}
```

:::info

注意，`cacheableOperations`需要没有副作用，这意味着给定相同的输入，它们应该总是产生相同的输出。例如，无法缓存命中后端API的端到端测试运行，因为后端可能会影响测试运行的结果。

:::

现在，运行以下命令两次。第二次操作将立即执行:

```bash
lerna run build --scope=header
```

```bash title="Terminal Output"
> lerna run build --scope=header

> header:build  [existing outputs match the cache, left as is]

> header@0.0.0 build
> rimraf dist && rollup --config


src/index.tsx → dist...
created dist in 858ms

 —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  Lerna (powered by Nx)   Successfully ran target test for project header (4ms)

   Nx read the output from the cache instead of running the command for 1 out of 1 tasks.
```

## 从缓存中回复

当Lerna确定某个任务的输入没有改变时，它会重新创建该任务的输出，就像它实际在您的机器上运行一样——但是速度要快得多。缓存任务的输出包括终端输出和在为该任务定义的`output`目录中创建的文件。

你可以通过删除`header:build`任务输出到的 `dist`文件夹来测试，然后再次运行`lerna run build --scope=header`。缓存的任务将立即重放，正确的文件将出现在`dist`文件夹中。

```treeview
header/
└── dist/  <-- this folder gets recreated
```

如果您的任务在不同的位置创建输出工件，您可以[更改缓存的输出文件夹](https://nx.dev/reference/project-configuration#outputs)。您还可以自定义如果[更改了哪些输入](https://nx.dev/more-concepts/customizing-inputs)将使缓存失效。

## 高级高速缓存

要更深入地了解缓存实现，并为您的repo微调缓存，请阅读[如何缓存工作](../concepts/how-caching-works)。

## 本地计算缓存

默认情况下，Lerna(通过Nx)使用本地计算缓存。Nx仅将缓存值存储一周，之后将删除它们。要清除缓存，请运行`nx reset`, nx将在下次尝试访问缓存时创建一个新的缓存。
