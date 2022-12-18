---
id: configuration
title: 配置
type: reference
---

# 配置

Lerna的配置被分成两个文件:`lerna.json` 和 `nx.json`.

# Lerna.json

### useWorkspaces & packages

自从Lerna创建以来，所有主要的包管理器(npm、yarn和pnpm)都添加了在相同的repo和dedupe节点模块中交叉链接包的功能。如果你想让Lerna把这个过程委托给你使用的包管理器，在`lerna.json`中设置 `useWorkspaces: true`.

```json title="lerna.json"
{
  "useWorkspaces": true
}
```
如果没有将 `useWorkspaces`设置为`true`，则需要设置`packages`属性，该属性将告诉Lerna在哪里查找`package.json`文件。

```json title="lerna.json"
{
  "packages": ["packages/*"]
}
```

### version

Lerna有两种发布包的模式:`fixed` 和 `independent`。当使用`fixed`模式时，所有的包都将使用相同的版本发布。最后出版的版本记录在 `lerna.json`, 格式如下:

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

在[API文档](/docs/api-reference/commands)中找到可用的选项。

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

Nx中的所有东西都是可定制的，包括运行npm脚本。大多数情况下，您将使用默认的运行程序或`@nrwl/nx-cloud`运行程序。

### cacheableOperations

The `cacheableOperations` array defines the list of npm scripts/operations that are cached by Nx. In most repos all
non-long running tasks (i.e., not `serve`) should be cacheable.
`cacheableOperations`数组定义了Nx缓存的npm脚本/操作列表。在大多数repos中，所有非长时间运行的任务(i.e., not `serve`)都应该是可缓存的。

## Target Defaults

Targets是npm脚本名称。您可以在`targetDefaults`部分的repo中添加与每个项目的构建脚本相关的元数据。

### dependsOn

目标可以依赖于其他目标。一个常见的场景是在构建项目之前必须首先构建项目的依赖项。`dependsOn`属性可用于定义单个目标的依赖关系。

`"dependsOn": [ "prebuild", "^build"]` 告诉Nx每个`build`脚本都需要同一项目的`prebuild`脚本和所有依赖项的`build`脚本首先运行。

### inputs & namedInputs

`inputs`数组告诉Nx考虑什么来确定某个脚本的特定调用是否应该是缓存命中。有三种类型的输入:

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
通常相同的glob会出现在很多地方(例如，prod fileset将排除所有项目的规范文件)。因为保持它们同步很容易出错，所以我们建议定义命名输入，这样就可以在所有这些地方引用它们。

#### 使用 ^

Examples:

- `inputs: ["^prod"]`
- same as `inputs: [{input: "prod", projects: "dependencies"}]`

Similar to `dependsOn`, the "^" symbols means "dependencies". This is a very important idea, so let's illustrate it with
an example.

```
"test": {
  "inputs": [ "default", "^prod" ]
}
```

The configuration above means that the test target depends on all source files of a given project and only prod
sources (non-test sources) of its dependencies. In other words, it treats test sources as private. If your `remixapp`
project depends on the `header` library, changing the `header` tests will not have any effect on the `remixapp` test
target.

### outputs

`"outputs": ["{projectRoot}/dist"]` tells Nx where the build script is going to create file artifacts. The provided
value is actually the default, so we can omit it in this case. `"outputs": []` tells Nx that the test target doesn't
create any artifacts on disk. You can list as many outputs as you many. You can also use globs or individual files as
outputs.

This configuration is usually not needed. Nx comes with reasonable defaults which implement the configuration above.

## Project-Specific Configuration

For a lot of workspaces, where projects are similar, `nx.json` will contain the whole Nx configuration. Sometimes, it's
useful to have a project-specific configuration, which is placed in the project's `package.json` file.

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

Note, the `namedInputs` and `targetDefaults` defined in `nx.json` are simply defaults. If you take that configuration
and copy it into every project's `package.json` file, the results will be the same.

In other words, every project has a set of named inputs, and it's defined as: `{...namedInputsFromNxJson, ...namedInputsFromProjectsPackageJson}`. Every target/script's `dependsOn` is defined
as `dependsOnFromProjectsPackageJson || dependsOnFromNxJson`. The same applies to `inputs` and `outputs`.

### inputs & namedInputs

Defining `inputs` for a given target would replace the set of inputs for that target name defined in `nx.json`.
Using pseudocode `inputs = packageJson.targets.build.inputs || nxJson.targetDefaults.build.inputs`.

You can also define and redefine named inputs. This enables one key use case, where your `nx.json` can define things
like this (which applies to every project):

```
"test": {
  "inputs": [
    "default",
    "^prod"
  ]
}
```

And projects can define their prod fileset, without having to redefine the inputs for the `test` target.

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

In this case Nx will use the right `prod` input for each project.

### dependsOn

Defining `dependsOn` for a given target would replace `dependsOn` for that target name defined in `nx.json`.
Using pseudocode `dependsOn = packageJson.targets.build.dependsOn || nxJson.targetDefaults.build.dependsOn`.

### outputs

Defining `outputs` for a given target would replace `outputs` for that target name defined in `nx.json`.
Using pseudocode `outputs = packageJson.targets.build.outputs || nxJson.targetDefaults.build.outputs`.

### implicitDependencies

The `"implicitDependencies": ["projecta", "!projectb"]` line tells Nx that the parent project depends on `projecta` even
though there is no dependency in its `package.json`. Nx will treat such a dependency in the same way it treats explicit
dependencies. It also tells Nx that even though there is an explicit dependency on `projectb`, it should be ignored.
