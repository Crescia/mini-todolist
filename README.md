# Mini-TodoList
一个基于 Vue 3 + TypeScript + Vite + TailwindCSS 开发的现代化待办事项应用，具有优雅的 UI 设计和流畅的交互体验。
## 预览
### 功能特点
- 🎨 优雅的 UI 设计，支持亮色/暗色主题
- 📱 响应式布局，完美适配移动端
- ✨ 流畅的动画效果和交互体验
- 💾 本地数据持久化存储
- 🔍 任务筛选和完成度统计
- ⌨️ 键盘快捷操作支持
## 技术栈
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [TailwindCSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Heroicons](https://heroicons.com/) - SVG 图标库
- [VueUse](https://vueuse.org/) - Vue Composition API 工具集
## 开始使用
### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0
### 安装
```bash
克隆项目
git clone https://github.com/Crescia/mini-todolist.git
进入项目目录
cd vue3-todolist
安装依赖
npm install
```
### 启动
```bash
npm run dev
```
### 构建
```bash
npm run build
```
## 项目结构
```
src/
├── components/ # 组件目录
│ ├── ThemeToggle.vue # 主题切换组件
│ ├── TodoInput.vue # 输入组件
│ ├── TodoItem.vue # 待办项组件
│ └── TodoList.vue # 列表组件
├── stores/ # 状态管理
│ └── todo.ts # Todo Store
├── types/ # 类型定义
│ └── todo.ts # Todo 相关类型
├── App.vue # 根组件
├── main.ts # 入口文件
└── style.css # 全局样式
```
## 核心功能
### 待办事项管理
- ✅ 添加新的待办事项（支持回车快捷键）
- ✅ 标记待办事项为完成/未完成
- ✅ 删除待办事项
- ✅ 实时统计完成进度
### 过滤与分类
- 📋 查看所有待办事项
- 🔄 筛选未完成事项
- ✨ 筛选已完成事项
### 主题系统
- 🌞 亮色主题
- 🌙 暗色主题
- 🔄 自动跟随系统主题
- 🖱️ 一键切换主题
### 数据持久化
- 💾 自动保存到 localStorage
- 🔄 页面刷新数据不丢失
## 开发相关
### 目录结构说明
- `components/`: Vue 组件
- `stores/`: Pinia 状态管理
- `types/`: TypeScript 类型定义
- `style.css`: 全局样式和 Tailwind 配置
### 组件说明
- `ThemeToggle.vue`: 主题切换按钮组件
- `TodoInput.vue`: 待办事项输入组件
- `TodoItem.vue`: 单个待办事项组件
- `TodoList.vue`: 待办事项列表和过滤组件
## 许可证
本项目基于 [MIT](LICENSE) 许可证开源。
## 致谢
- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
