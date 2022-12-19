---
id: configuration
title: 配置
type: reference
---

# 配置

Lerna 的配置被分成两个文件:`lerna.json` 和 `nx.json`.

# Lerna.json

### useWorkspaces & packages

自从 Lerna 创建以来，所有主要的包管理器(npm、yarn 和 pnpm)都添加了在相同的 repo 和 dedupe 节点模块中交叉链接包的功能。如果你想让 Lerna 把这个过程委托给你使用的包管理器，在`lerna.json`中设置 `useWorkspaces: true`.

```json title="lerna.json"
{
  "useWorkspaces": true
}
```

如果没有将 `useWorkspaces`设置为`true`，则需要设置`packages`属性，该属性将告诉 Lerna 在哪里查找`package.json`文件。

```json title="lerna.json"
{
  "packages": ["packages/*"]
}
```

### version

Lerna 有两种发布包的模式:`fixed` 和 `independent`。当使用`fixed`模式时，所有的包都将使用相同的版本发布。最后出版的版本记录在 `lerna.json`, 格式如下:

```json title="lerna.json"
{
  "version": "1.2.0"
}
```

当使用 `independent`模式时，每个包都是单独的版本，并且 `lerna.json`将如下所示:

```json title="lerna.json"
{
  "version": "independent"
}
```

### commands

`lerna.json`文件也可以编码命令选项，如下所示:

```json
{
  "command": {
    "version": {
      "allowBranch": "main",
      "conventionalCommits": true
    }
  }
}
```

在[API 文档](/docs/api-reference/commands)中找到可用的选项。

# Nx.json

> NOTE:“{projectRoot}”和“{workspaceRoot}”是任务运行器支持的特殊语法，当命令运行时，它们将在内部适当地插入。因此，您不应该将“{projectRoot}”或“{workspaceRoot}”替换为固定路径，因为这会降低配置的灵活性。

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
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "prod": ["!{projectRoot}/**/*.spec.tsx"]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["prebuild", "^build"],
      "inputs": ["prod", "^prod"],
      "outputs": ["{projectRoot}/dist"]
    },
    "test": {
      "inputs": ["default", "^prod", "{workspaceRoot}/jest.config.ts"]
    }
  }
}
```

## taskRunnerOptions

### runner

Nx 中的所有东西都是可定制的，包括运行 npm 脚本。大多数情况下，您将使用默认的运行程序或`@nrwl/nx-cloud`运行程序。

### cacheableOperations

`cacheableOperations`数组定义了 Nx 缓存的 npm 脚本/操作列表。在大多数 repos 中，所有非长时间运行的任务(比如不是`serve`)都应该是可缓存的。

## Target Defaults

Targets 是 npm 脚本名称。您可以在`targetDefaults`部分的 repo 中添加与每个项目的构建脚本相关的元数据。

### dependsOn

目标可以依赖于其他 target。一个常见的场景是在构建项目之前必须首先构建项目的依赖项。`dependsOn`属性可用于定义单个目标的依赖关系。

`"dependsOn": [ "prebuild", "^build"]` 告诉 Nx 每个`build`脚本都需要同一项目的`prebuild`脚本和所有依赖项的`build`脚本首先运行。

### inputs & namedInputs

The `inputs` array tells Nx what to consider to determine whether a particular invocation of a script should be a cache
hit or not. There are three types of inputs:
(`inputs`数组告诉 Nx 考虑什么来确定某个脚本的特定调用是否应该是缓存命中。有三种类型的输入:)

_Filesets_

Examples:

- `{projectRoot}/**.*.ts`
- same as `{fileset: "{projectRoot}/**/*.ts"}`
- `{workspaceRoot}/jest.config.ts`
- same as `{fileset: "{workspaceRoot}/jest.config.ts}`

_Runtime Inputs_

Examples:

- `{runtime: "node -v"}`

节点的结果值是散列的，因此它永远不会显示

_Env Variables_

Examples:

- `{env: "MY_ENV_VAR"}`

节点的结果值是散列的，因此它永远不会显示。

_Named Inputs_

Examples:

- `inputs: ["prod"]`
- same as `inputs: [{input: "prod", projects: "self"}]`

Often the same glob will appear in many places (e.g., prod fileset will exclude spec files for all projects).. Because
keeping them in sync is error-prone, we recommend defining named inputs, which you can then reference in all of those
places.
(通常相同的 glob 会出现在很多地方(例如，prod fileset 将排除所有项目的规范文件)。因为保持它们同步很容易出错，所以我们建议定义命名输入，这样就可以在所有这些地方引用它们。)

#### 使用 ^

Examples:

- `inputs: ["^prod"]`
- same as `inputs: [{input: "prod", projects: "dependencies"}]`

与`dependsOn`类似，“^”符号表示“依赖项”。这是一个非常重要的想法，所以让我们用一个例子来说明它。

```
"test": {
  "inputs": [ "default", "^prod" ]
}
```

上面的配置意味着 test target 依赖于给定项目的所有源文件，并且只依赖于其依赖关系的 prod 源(非测试源)。换句话说，它将测试源视为私有的。如果 `remixapp` 项目依赖于`header`库，则更改`header`测试不会对 `remixapp` 的 test target 产生任何影响。

### outputs

`"outputs": ["{projectRoot}/dist"]` 告诉 Nx `build` 脚本将在哪里创建文件工件。所提供的值实际上是默认值，因此在本例中可以省略它。`"outputs": []`告诉 Nx 的 test target 没有在磁盘上创建任何工件。您可以列出尽可能多的输出。您还可以使用 glob 或单个文件作为输出。

通常不需要这种配置。Nx 提供了实现上述配置的合理默认值。

## 具体项目的配置

对于许多项目类似的工作空间，`nx.json` 将包含整个 Nx 配置。有时，有一个特定于项目的配置是有用的，它被放在项目的`package.json`文件中.

```json title="package.json"
{
  "name": "parent",
  "scripts": {
    "build": "...",
    "test": "..."
  },
  "dependencies": {...},
  "nx": {
    "namedInputs": {
      "prod": [
        "!{projectRoot}/**/*.test.tsx",
        "{workspaceRoot}/configs/webpack.conf.js"
      ]
    },
    "targets": {
      "build": {
        "dependsOn": [
          "^build"
        ],
        "inputs": [
          "prod",
          "^prod"
        ],
        "outputs": [
          "{workspaceRoot}/dist/parent"
        ]
      }
    }
    "implicitDependencies": ["projecta", "!projectb"]
  }
}
```

注意，在`nx.json`中定义的`namedInputs`和 `targetDefaults`只是默认值。如果您将该配置复制到每个项目的`package.json` 文件，结果将是相同的。

换句话说，每个项目都有一组命名的输入，它被定义为: `{...namedInputsFromNxJson, ...namedInputsFromProjectsPackageJson}`. 每一个 target/script 的 `dependsOn` 被定义为 `dependsOnFromProjectsPackageJson || dependsOnFromNxJson`. 同样适用于 `inputs` 和 `outputs`.

### inputs & namedInputs

为一个给定的 target 定义 `inputs`将取代在 `nx.json` 中定义的 target 名称的输入集。伪代码表示为 `inputs = packageJson.targets.build.inputs || nxJson.targetDefaults.build.inputs`

You can also define and redefine named inputs. This enables one key use case, where your `nx.json` can define things
like this (which applies to every project):
(还可以定义和重新定义命名输入。这将启用一个关键用例，其中您的`nx.json` 可以定义如下内容(适用于每个项目):)

```
"test": {
  "inputs": [
    "default",
    "^prod"
  ]
}
```

项目可以定义它们的 prod fileset，而不必重新定义`test` target 的 inputs。

```json title="package.json"
{
  "name": "parent",
  "scripts": {
    "build": "...",
    "test": "..."
  },
  "dependencies": {...},
  "nx": {
    "namedInputs": {
      "prod": [
        "!{projectRoot}/**/*.test.js",
        "{workspacRoot}/jest.config.js"
      ]
    }
  }
}
```

在这种情况下，Nx 将为每个项目使用正确的`prod` input。

### dependsOn

为一个给定的目标定义`dependsOn`将取代在`nx.json`中定义的 target 名称的`dependsOn`。伪代码是 `dependsOn = packageJson.targets.build.dependsOn || nxJson.targetDefaults.build.dependsOn`.

### outputs

为给定的 target 定义`outputs`将取代在`nx.json`中定义的 target 名称的`outputs`。伪代码是 `outputs = packageJson.targets.build.outputs || nxJson.targetDefaults.build.outputs`.

### implicitDependencies

`"implicitDependencies": ["projecta", "!projectb"]`告诉 Nx 父项目依赖于`projecta`，即使在它的`package.json`中没有依赖项。Nx 将以与显式依赖相同的方式处理此类依赖。它还告诉 Nx，即使对`projectb`有显式依赖，也应该忽略它。
