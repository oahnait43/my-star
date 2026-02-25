# my-star ✨

一个部署在 **Cloudflare Pages + Functions + KV** 的轻量互动网页：
访问者会在星空中看到一颗由自身网络信息“映射”出的专属星星，并可浏览其他访客留下的星光记录。

## 版本

当前版本：`1.1.0`

## 功能特性

- 根据访问者 IP 生成稳定的星星属性（颜色、符号、尺寸、闪烁节奏、发光强度与位置）
- 支持首次访问与回访识别（本地 `localStorage`）
- 前端动态展示星空、流星引导动画与星星详情弹层
- 使用 Cloudflare KV 持久化访客星星数据
- 提供简单 API：
  - `GET /api/stars`：获取星星列表
  - `POST /api/stars`：新增一颗星星

## 技术栈

- HTML / CSS / Vanilla JavaScript
- Cloudflare Pages Functions
- Cloudflare KV
- Wrangler

## 项目结构

```text
.
├── index.html                # 前端页面与主要交互逻辑
├── style.css                 # 页面样式
├── functions/
│   └── api/
│       └── stars.js          # 星星读写 API（KV）
├── wrangler.toml             # Cloudflare 配置（KV 绑定等）
├── package.json
└── README.md
```

## 本地开发

### 1) 安装依赖

```bash
npm install
```

### 2) 启动本地开发环境

```bash
npx wrangler pages dev .
```

默认会在本地启动 Pages + Functions 调试服务。

## 部署到 GitHub 与 Cloudflare

### 1) 提交并推送到 GitHub

```bash
git add .
git commit -m "chore: release v1.1.0"
git push origin <your-branch>
```

### 2) 在 Cloudflare Pages 关联 GitHub 仓库

1. 进入 Cloudflare Dashboard → Pages → Create a project
2. 选择本仓库并授权
3. Build command 留空（静态站点 + Functions）
4. Build output directory 设置为 `.`
5. 在项目设置中添加 KV 绑定 `STARS_KV`（与 `wrangler.toml` 一致）

完成后每次推送到主分支即可自动部署。

## 环境变量与配置

请确认 `wrangler.toml` 中 KV 配置有效：

- `binding = "STARS_KV"`
- `id = "<your-kv-namespace-id>"`

示例文件中使用的 `id` 仅作当前环境配置，迁移项目时请替换为你自己的 KV Namespace ID。

## 后续可改进方向

- 增加去重策略，避免同一访客重复写入
- 增加分页/采样渲染，优化海量星星场景性能
- 增加管理员清理脚本与基础风控
- 将第三方 IP 服务改为可配置项，提升稳定性

## License

ISC
