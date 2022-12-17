---
id: getting-started
title: 开始
type: tutorial
---

# 开始

<iframe width="560" height="315" src="https://www.youtube.com/embed/1oxFYphTS4Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>

您可以为现有的monorepos增量地采用Lerna，或者通过运行以下命令创建一个新的Lerna工作空间:

```bash
npx lerna init
```

所有Lerna功能都将以相同的方式工作。

本教程将向您介绍Lerna的特性。要开始学习本教程，请克隆[此存储库](https://github.com/lerna/getting-started-example)。 `main`分支包含最终的设置。如果你想follow，请checkout`prelerna`分支。

```bash
git clone https://github.com/lerna/getting-started-example.git
cd getting-started-example
git checkout prelerna
npm install
```

该仓库包含三个包或项目:

- `header` (React组件库)
- `footer` (React组件库)
- `remixapp` (一个使用Remix框架编写的应用程序，它依赖于 `header` 和 `footer`)

```
packages/
    header/
        src/
            ...
        package.json
        rollup.config.json
        jest.config.js

    footer/
        src/
            ...
        package.json
        rollup.config.json
        jest.config.js

    remixapp/
        app/
            ...
        public/
        package.json
        remix.config.js

package.json
```

## 添加 Lerna

使用如下命令去添加Lerna。

```bash
npx lerna@latest init
```

这将

- 添加`lerna` 到根 `package.json`
- 生成 `lerna.json`
- 配置 npm/yarn/pnpm 的workspace

```json title="package.json"
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "lerna": "6.0.1"
  }
}
```

使Lerna 5.1+如此强大的是它与[Nx](https://nx.dev)集成后的任务委托和其他特性。

## 包依赖管理


当运行 `lerna init`时，lerna将工作空间配置为使用NPM/YARN/PNPM的workspaces，这是本地引用包的内置解决方案。在本教程中，我们将利用[NPM的workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)。
:::info

 Lerna在历史上有自己的依赖管理解决方案: `lerna bootstrap`. 这是必需的，因为在Lerna首次发布时，还没有可用的本地解决方案。如今，现代的包管理器都带有内置的 workspaces 解决方案，因此强烈建议使用这种解决方案。 `lerna bootstrap` 和其他相关命令将在Lerna v7中正式弃用. 参考 https://github.com/lerna/lerna/discussions/3410
:::

您可以在根目录的`package.json`中看到这一配置: `workspaces` 通过在`lerna.json`中将`useWorkspaces`设置为`true`来实现

```json title="package.json"
{
  "name": "root",
  ...
  "workspaces": [
    "packages/*"
  ],
  ...
}
```

为了了解它是如何工作的，让我们来检查一下`remixapp`的`package.json`文件。
```json title="packages/remixapp/package.json"
{
  ...
  "dependencies": {
    ...
    "header": "*",
    "footer": "*"
  }
}
```

 告诉Lerna链接`header`和`footer`的内容，就像它们已经发布到注册表一样。确保运行:

```bash
npm install
```

现在工作区中的所有项目都可以通过本地包链接正确地相互引用。

## 可视化工作空间

由于Lerna是由Nx提供支持的，您可以使用它的功能来打开workspace project graph的交互式可视化。

要打开可视化，运行:

```bash
npx nx graph
```

![Project Graph](./images/getting-started/project-graph.png)

## 构建所有项目

要构建所有项目，运行

```bash
npx lerna run build
```

这将以正确的顺序构建三个项目: `header` 和 `footer` 将首先被build (并且以并行的方式), 然后 `remixapp` 被build. 顺序很重要，因为`remixapp`使用来自`header`和`footer`的构建产物。

```
    ✔  header:build (501ms)
    ✔  footer:build (503ms)
    ✔  remixapp:build (670ms)

 —————————————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for 3 projects (1s)

```

## 测试所有项目

现在，让我们进行测试。

```bash
npx lerna run test
```

你应该看到以下输出:

```
    ✔  footer:test (1s)
    ✔  header:test (1s)
    ✔  remixapp:test (236ms)

—————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target test for 3 projects (1s)
```

注意，`lerna`也会按照拓扑顺序运行三个`test`npm脚本。尽管我们在构建时必须这样做，但在测试中并不需要这样做(它会使命令变慢)。我们可以通过配置缓存来改变这种行为.

## 缓存

现在运行任何命令都将执行所有的任务，即使没有任何变化。我们可以通过添加一些配置来修复它.

首先，让我们运行

```bash
npx lerna add-caching
```

为了正确配置工作空间，将会遇到一系列问题:

```bash
? Which scripts need to be run in order? (e.g. before building a project, dependent projects must be built.)
 (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◉ build
 ◯ test
 ◯ dev
 ◯ start
```

```bash
? Which scripts are cacheable? (Produce the same output given the same input, e.g. build, test and lint usually are, serve and start are not.)
 (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ◉ build
❯◉ test
 ◯ dev
 ◯ start
```

```bash
? Does the "build" script create any outputs? If not, leave blank, otherwise provide a path relative to a project root (e.g. dist, lib, build,
coverage)
 dist
? Does the "test" script create any outputs? If not, leave blank, otherwise provide a path relative to a project root (e.g. dist, lib, build,
coverage)
```

在你的工作空间的根目录将生成`nx.json`:

```json title="nx.json"
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist"]
    }
  }
}
```

该配置缓存`build` 和 `test`任务，并强制`build`以拓扑顺序运行(但`test`不会)。另外，每个项目的`dist`文件夹默认被缓存为`build`输出。

现在，让我们对`header`项目运行两次测试。第二次操作将立即执行:

```bash
npx lerna run test --scope=header
```

```
> lerna run test --scope=header

> header:test  [existing outputs match the cache, left as is]

> header@0.1.0 test
> jest

PASS  src/Header.spec.tsx
✓ renders header (12 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.439 s, estimated 1 s
Ran all test suites.

—————————————————————————————————————————————————————————————————

>  Lerna (powered by Nx)   Successfully ran target test for project header (4ms)

   Nx read the output from the cache instead of running the command for 1 out of 1 tasks.
```

Lerna能够识别出已经对相同的相关代码和环境执行了相同的命令。结果，Lerna没有运行命令，而是恢复终端输出日志。

缓存不仅可以恢复终端输出日志，还可以恢复可能产生的产物。`build`所有项目，然后删除remix的生成产物并再次运行`build`命令。

```bash
npx lerna run build
rm -rf packages/remixapp/public/build
```

您将看到所有文件从缓存中恢复，命令立即执行。

```
    ✔  header:build  [existing outputs match the cache, left as is]
    ✔  footer:build  [existing outputs match the cache, left as is]
    ✔  remixapp:build  [local cache]

 ——————————————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for 3 projects (19ms)

    Nx read the output from the cache instead of running the command for 3 out of 3 tasks.
```

Lerna自动识别大多数常见的输出目录(例如`dist`, `build`，…)，并在缓存中捕获它们的内容。正如我们所看到的，我们还可以通过在`nx.json` 中全局定义它来定制输出目录(参见后面的例子)，或者在每个项目相应的package.json中。

例如，我们可以通过在`package.json`中配置`remixapp`特定的输出路径来微调`remixapp`的配置:

```json title="packages/remixapp/package.json"
{
  "name": "remixapp",
  ...
  "dependencies": {...},
  "devDependencies": {...},
  "nx": {
    "targets": {
      "build": {
        "outputs": ["{projectRoot}/build", "{projectRoot}/public/build"]
      }
    }
  }
}
```

:::note

`{projectRoot}`是任务运行程序支持的一种特殊语法，当命令运行时，它将在内部适当地插入。因此，您不应该将"{projectRoot}"替换为固定路径，因为这会使您的配置不那么灵活。
:::

Lerna还支持[分布式缓存](./features/cache-tasks.md)和[无配置的分布式任务](./features/distribute-tasks.md)执行。

## 目标依赖关系(又名任务管道)

我们已经取得了很大的进展，但还有一个问题需要解决。下面在`nx.json`中的配置是不完整的:

```json title="nx.json"
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

这确保`build`依赖关系在任何`build`命令之前运行，但我们还需要记住在运行`lerna run dev --scope=remixapp`之前构建`header`和`footer`。我们可以通过在`nx.json`中定义目标之间的依赖关系(也称为任务管道)来解决这个问题:

```json title="nx.json"
{
  ...
  "targetDefaults": {
    "build": {
      "dependsOn": [
        "^build"
      ]
    },
    "dev": {
      "dependsOn": [
        "^build"
      ]
    }
  }
}
```

有了这个变化:

- `npx lerna run build`将以正确的顺序运行build target. 
- `npx lerna run dev --scope=remixapp` 将首先运行`header`和`footer`的build target，然后运行`remixapp`的dev target。
  target for `remixapp`.
- `npx lerna run test` 将并行运行所有三个test target。

如果你想知道运行`lerna run dev --scope=remixapp` 是否会很慢(因为你必须一直重建所有的依赖关系)，答案是“否”。依赖关系只有在发生变化时才会重新构建。否则，它们的dist文件夹将保持原样。

## 发布

最后，让我们谈谈Lerna的第三个关键特性:发布到npm。Lerna已经内置了一个`publish`命令。要发布包的 `header` 和 `footer`，我们所需要做的就是运行:

```bash
npx lerna publish --no-private
```

这个将

- 确定包的当前版本
- 检测自上次发布以来哪些包已经更改，然后相应地在`package.json` 中更新其版本
- 创建已更改`package.json`文件的提交，标记提交和推送标签, 提交到远程
- 将包发布到NPM

在[相应的文档页面](./features/version-and-publish.md)中阅读更多关于发布和版本控制过程的信息。
