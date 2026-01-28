# 跨境电商管理系统

一个企业级的跨境电商自研系统，整合了产品、供应链、预测、库存、采购、费用预算等核心业务能力。

## 📋 项目简介

本项目是一个基于 React 的现代化跨境电商管理平台，旨在为跨境电商企业提供全方位的业务管理解决方案。系统涵盖了从产品管理、供应链采购、物流报关到财务治理、组织权限等完整的业务流程。

## 🛠️ 技术栈

- **前端框架**: React 19.2.3
- **构建工具**: Create React App 5.0.1
- **样式方案**: Tailwind CSS 3.4.1
- **图标库**: Lucide React 0.562.0
- **CSS 处理**: PostCSS + Autoprefixer

## ✨ 核心功能模块

### 1. 产品中心
- **产品主数据管理**: SPU/SKU 管理、产品信息维护、规格管理
- **BOM 管理**: 物料清单管理、成本核算
- **品牌管理**: 品牌信息维护、品牌关联产品管理
- **产品结构分类**: 品牌-类目-系列三级分类体系
- **类目属性模板管理**: 类目属性模板配置、版本管理

### 2. 销售与计划
- 销售目标管理
- 销售达成分析

### 3. 供应链采购管理
- 供应商管理
- 采购流程管理

### 4. 物流与报关
- 物流计划执行
- 报关管理

### 5. 质量管理
- 质量检验流程
- 质量数据管理

### 6. 财务治理
- **店铺与部门归属映射**: 电商店铺与组织部门、成本中心的对应关系维护
- **成本中心**: 成本中心配置与管理
- **分摊规则**: 费用分摊规则设置
- **费用事实**: 费用事实数据管理
- **费用类别**: 预算费用类别管理、金蝶科目映射、经营管理视图

### 7. 财务与经营分析
- 财务报表分析
- 经营数据看板（只读）

### 8. 组织与权限
- **组织架构管理**: 组织架构维护、部门管理

### 9. 审批与任务
- 审批流程管理
- 任务跟踪

### 10. 系统设置
- 系统参数配置（IT专用）

## 📁 项目结构

```
ecommerce-system/
├── src/
│   ├── pages/              # 页面组件
│   │   ├── HomePage.js                    # 首页
│   │   ├── ProductMasterPage.js           # 产品主数据
│   │   ├── BOMManagementPage.js           # BOM管理
│   │   ├── BrandManagementPage.js         # 品牌管理
│   │   ├── ProductStructurePage.js        # 产品结构分类
│   │   ├── CategoryTemplatePage.js        # 类目属性模板
│   │   ├── SkuDetailPage.simple.js       # SKU详情页
│   │   ├── StoreDeptMappingPage.js        # 店铺与部门归属映射
│   │   ├── StoreDeptEditStoreDrawer.js    # 店铺编辑抽屉
│   │   ├── CostCenterPage.js              # 成本中心
│   │   ├── AllocationRulePage.js         # 分摊规则
│   │   ├── ExpenseFactPage.js             # 费用事实
│   │   ├── ExpenseCategoryPage.js          # 费用类别
│   │   ├── ExpenseApprovalListPage.simple.js    # 费用审批列表
│   │   ├── ExpenseApprovalDetailPage.simple.js  # 费用审批详情
│   │   ├── OrganizationManagementPage.js  # 组织架构管理
│   │   └── PlaceholderPage.js             # 占位页面
│   ├── App.js              # 主应用组件
│   ├── index.js            # 入口文件
│   └── index.css           # 全局样式（包含 Tailwind）
├── public/                 # 静态资源
├── tailwind.config.js      # Tailwind 配置
├── postcss.config.js       # PostCSS 配置
└── package.json            # 项目依赖

```

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `build` 目录。

### 运行测试

```bash
npm test
```

## 🔧 开发说明

### 样式开发

项目使用 Tailwind CSS 进行样式开发，所有 Tailwind 工具类都可以直接使用。配置文件位于 `tailwind.config.js`。

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.js` 中导入新组件
3. 在 `navigationConfig` 中添加导航项
4. 在 `renderPage()` 函数中添加路由处理

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 React Hooks 最佳实践
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase（页面组件）或 camelCase（工具函数）

## 📝 功能特性

- ✅ 响应式设计，支持多设备访问
- ✅ 模块化架构，易于扩展和维护
- ✅ 统一的 UI 设计语言
- ✅ 完整的路由导航系统
- ✅ 数据状态管理
- ✅ 表单验证和错误处理

## 🔐 用户权限

系统支持多角色权限管理：
- **系统管理员**: 拥有所有功能权限
- **管理层**: 可访问经营驾驶舱等高级功能
- **IT专用**: 系统设置等 IT 管理功能

## 📄 许可证

本项目为私有项目，仅供内部使用。

## 👥 贡献

本项目为企业内部项目，如有问题或建议，请联系项目维护团队。

## 📞 联系方式

如有技术问题，请联系开发团队。

---

**最后更新**: 2026年1月
