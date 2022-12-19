---
id: legacy-package-management
title: 遗留包管理
type: recipe
---

# 遗留包管理

## 背景

Lerna是JavaScript生态系统中最早的monorepo/workspace工具。当它在2015/2016年创建时，生态系统看起来完全不同，并且没有内置的功能来处理单个存储库(“工作区”)中的多个包。lerna bootstrap、lerna add和lerna link等命令都是lerna项目的关键部分，因为没有其他选项。

然而，现在我们发现自己已经到了2022年底，事实是——多年来——我们所了解和喜爱的包管理器(“npm”、“yarn”和“pnpm”)都完全支持将工作区作为一流用例的概念。

他们有经过实战测试的实现，包括添加、删除和链接本地包，以及以自然的方式将它们与第三方依赖项结合起来。

这就是为什么Daniel在过去几年担任Lerna的主要维护者期间，一直鼓励人们重新考虑在Lerna中使用遗留包管理命令的原因，而是利用他们所选择的包管理器来做它最擅长的事情。

我们早就知道这种情况，但作为项目的新管理者，我们不想在没有花时间近距离熟悉现实情况的情况下就直接开始删除功能。现在我们已经积极维护这个项目半年了，我们完全同意Daniel和其他人的观点，即lerna中的遗留包管理命令需要退役。

通过删除这些在包管理器中有更好的替代方案的遗留部件，我们和lerna社区的其他成员将可以将精力集中在lerna独特的有价值的事情上(例如，但不限于，版本控制和发布)，并使它们达到最好的状态!

因此，从版本7开始，我们将不再默认地将遗留的包管理命令(例如lerna bootstrap、lerna add和lerna link)与lerna一起发布，而是将它们作为一个单独的包(名称待定)的附加组件提供。

这个新包可以被认为只是处于维护模式——对于遗留的包管理问题(如lerna bootstrap, lerna add和lerna link)，我们不会考虑新的功能，我们只会考虑合并关键补丁和安全更新。

:::info

同样的内容在[Lerna v7 discussion](https://github.com/lerna/lerna/discussions/3410)的讨论中有涉及，如果您有任何具体的问题，请加入我们，并提供尽可能多的信息!

:::

## 遗留的 Bootstrap 命令

Lerna遗留的bootstrap命令链接了repo中的不同项目，因此它们可以相互导入，而无需向NPM发布任何内容。为了展示Lerna是如何做到这一点的，我们将以[这个仓库](https://github.com/lerna/getting-started-example)为例。

该repo包含三个包或项目:

- `header` (React组件库)
- `footer` (React组件库)
- `remixapp` (使用Remix框架编写的应用程序，它同时依赖于`header` 和 `footer`)

Remix应用程序导入 `header` 和 `footer` 库如下:

```typescript jsx title="packages/remixapp/app/routes/index.tsx"
import { Header } from "header";
import { Footer } from "footer";

export default function Index() {
  return (
    <>
      <Header />
      <div>Content!</div>
      <Footer />
    </>
  );
}
```
这取决于他们的`package.json` 格式如下:

```json title="packages/remixapp/package.json"
{
  "dependencies": {
    "@remix-run/node": "^1.5.1",
    "@remix-run/react": "^1.5.1",
    "@remix-run/serve": "^1.5.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "header": "*",
    "footer": "*"
  }
}
```

为了让`header` 和 `footer`在`remixapp`中可用，运行:

```bash
lerna bootstrap --use-workspaces
```

这将安装这3个项目所需的所有依赖项，并链接`header` 和 `footer`项目，以便`remixapp`可以像npm包一样引用它们。`--use-workspaces` 告诉Lerna将包链接过程委托给包管理器。(npm, yarn和pnpm都支持这个特性。)

You can also set `useWorkspaces` as the default behavior in the `lerna.json` file:
你也可以将`useWorkspaces`设置为`lerna.json`文件中的默认行为:

```json title="lerna.json"
{
    ...
    "useWorkspaces": true
}
```

## 其他引导方法

这种方法应该适用于大多数人，但您可以如果有需要的话，可以使用 [替代遗留引导方法](../concepts/alternate-bootstrapping-methods).
