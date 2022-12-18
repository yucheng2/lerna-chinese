---
id: project-graph
title: 探索项目图
type: recipe
---

# 探索项目图

为了让Lerna(和Nx)快速正确地运行任务，它创建了存储库中所有项目之间的依赖关系图。可视化地研究这张图有助于理解Lerna为什么以某种方式表现，并获得代码架构的高级视图。

要启动项目图形可视化运行:

```bash
nx graph
```

这将打开一个浏览器窗口，其中显示当前代码库的项目图的交互式表示。即使对于较小的存储库，查看整个图也是难以管理的，因此有几种方法可以将可视化的焦点缩小到当前图中最有用的部分。

1. 专注于一个特定的项目，然后使用“proximity”和“按文件夹分组”控件来修改该项目周围的图形。
2. 使用搜索栏查找名称包含特定字符串的所有项目。
3. 在侧栏中手动隐藏或显示项目

Once the graph is displayed, you can click on an individual dependency link to find out what specific file(s) created that dependency.


## JSON Project Graph

If you prefer to analyze the underlying data of the project graph with a script or some other tool, you can run:

```bash
nx graph --file=output.json
```

This will give you all the information that is used to create the project graph visualization.
