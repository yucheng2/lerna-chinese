---
id: share-your-cache
title: 分享你的缓存
type: recipe
---

# 分享你的缓存

Lerna提供的计算缓存可以分布在多台机器上。您可以构建缓存的实现，也可以使用Nx Cloud。Nx Cloud是一款提供快速和零配置分布式缓存实现的应用程序。它对于OSS项目和大多数闭源项目是完全免费的([阅读更多](https://dev.to/nrwl/more-time-saved-for-free-with-nx-cloud-4a2j))。

你可以通过以下命令将你的工作空间连接到Nx Cloud:

```bash
npx nx connect-to-nx-cloud
```

```bash title="Terminal Output"
✔ Enable distributed caching to make your CI faster · Yes

>  NX  Generating @nrwl/nx-cloud:init

UPDATE nx.json

 >  NX   Distributed caching via Nx Cloud has been enabled

   In addition to the caching, Nx Cloud provides config-free distributed execution,
   UI for viewing complex runs and GitHub integration. Learn more at https://nx.app

   Your workspace is currently unclaimed. Run details from unclaimed workspaces can be viewed on cloud.nx.app by anyone
   with the link. Claim your workspace at the following link to restrict access.

   https://cloud.nx.app/orgs/workspace-setup?accessToken=YOURACCESSTOKEN
```

要查看远程缓存的运行情况，运行:

```bash
lerna run build --scope=header && nx reset && lerna run build --scope=header
```

```bash title="Terminal Output"
> lerna run build --scope=header

> header@0.0.0 build
> rimraf dist && rollup --config

src/index.tsx → dist...
created dist in 786ms

 —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for project header (2s)

   See logs and investigate cache misses at https://cloud.nx.app/runs/k0HDHACpL8


 >  NX   Resetting the Nx workspace cache and stopping the Nx Daemon.

   This might take a few minutes.


 >  NX   Daemon Server - Stopped


 >  NX   Successfully reset the Nx workspace.


> lerna run build --scope=header  [remote cache]


> header@0.0.0 build
> rimraf dist && rollup --config


src/index.tsx → dist...
created dist in 786ms

 —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 >  Lerna (powered by Nx)   Successfully ran target build for project header (664ms)

   Nx read the output from the cache instead of running the command for 1 out of 1 tasks.

   Nx Cloud made it possible to reuse header: https://nx.app/runs/P0X6ZGTkqZ
```

## 将您的工作区连接到您的Nx Cloud帐户

在您的工作空间中启用Nx Cloud后，您将看到以下内容:

```shell
>  NX   NOTE  Nx Cloud has been enabled

  Your workspace is currently public. Anybody with code access
  can view the workspace on nx.app.

  You can connect the workspace to your Nx Cloud account at
  https://nx.app/orgs/workspace-setup?accessToken=N2Y3NzcyO...
  (You can do this later.)
```

单击此链接将工作区与您的Nx Cloud帐户关联。如果你没有Nx Cloud帐户，你可以当场创建一个。

在您声明您的工作空间之后，您将能够管理权限、创建访问令牌、设置计费等等。

**您还将看到一个交互式教程，帮助您探索分布式缓存和Nx Cloud用户界面。**

如果您失去了这个链接，您仍然可以将您的工作区连接到Nx Cloud。转到[nx.app](https://nx.app)，创建一个帐户，并使用访问令牌从 `nx.json`连接你的工作空间。

## 跳过云

Similar to how `--skip-nx-cache` will instruct Nx not to use the cache, passing `--no-cloud` will tell Nx not to use Nx
Cloud.
类似于`--skip-nx-cache`将指示Nx不要使用缓存，`--no-cloud`将告诉Nx不要使用Nx Cloud。
