# Lerna中使用pnpm

Lerna可以在 [`pnpm`工作空间](https://pnpm.io/workspaces) 中使用，以获得 [`pnpm`](https://pnpm.io) 和Lerna的全部好处。

当在`pnpm`工作空间中使用时，Lerna将:

- 使用[`pnpm-workspace.yaml`](https://pnpm.io/workspaces)解析包的位置
- 在 `lerna.json` 设置 `useWorkspaces: true` ( 并且在`package.json`忽略 `packages:`).
- 不要使用`bootstrap`, `link`, 和 `add`的命令。您应该直接使用 `pnpm`命令来管理依赖项(https://pnpm.io/cli/install)
- for package dependencies.尊重包依赖关系的[工作空间协议](https://pnpm.io/workspaces#workspace-protocol-workspace)。
  - 在`lerna version`期间，依赖项将正常更新，但将保留 `workspace:`前缀(如果它存在)。
  - If a [workspace alias](https://pnpm.io/workspaces#referencing-workspace-packages-through-aliases) is used, then `lerna version` will not bump the version of the dependency, since aliases don't specify a version number to bump. (如果使用了[工作区别名](https://pnpm.io/workspaces#referencing-workspace-packages-through-aliases)，那么 `lerna version`将不会碰撞依赖项的版本，因为别名没有指定要碰撞的版本号)

## Getting Started

To set up pnpm with Lerna:

1. If not installed already, install `pnpm`: https://pnpm.io/installation.
2. Remove the `node_modules/` folder in the root, if it exists. If not already using workspaces, run `lerna clean` to remove the `node_modules/` folder in all packages.
3. Set `"npmClient": "pnpm"` and `"useWorkspaces": true` in `lerna.json`.
4. Create a `pnpm-workspace.yaml` file in the root of your project.
   If you are already using npm or yarn workspaces, move the "workspaces" property from `package.json` to `pnpm-workspace.yaml`. If you were not already using workspaces, move the "packages" property from `lerna.json` to `pnpm-workspace.yaml`. For example:

   ```json title="package.json"
   {
     "workspaces": ["packages/*"]
   }
   ```

   and

   ```json title="lerna.json"
   {
     "packages": ["packages/*"]
   }
   ```

   become:

   ```yaml title="pnpm-workspace.yaml"
   packages:
     - "packages/*"
   ```

5. (optional) Run `pnpm import` to generate a `pnpm-lock.yaml` file from an existing lockfile. See https://pnpm.io/cli/import for supported lockfile sources.
6. Run `pnpm install`.
