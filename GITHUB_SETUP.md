# GitHub 上传指南

本指南将帮助您将项目上传到 GitHub。

## 📋 上传前检查清单

### ✅ 1. 检查敏感信息

确保以下内容不包含敏感信息：
- [ ] API 密钥
- [ ] 数据库连接字符串
- [ ] 个人访问令牌
- [ ] 服务器地址和端口
- [ ] 用户名和密码

### ✅ 2. 检查 .gitignore

已更新 `.gitignore` 文件，确保以下内容不会被提交：
- `node_modules/`
- `build/`
- `.env*` 文件
- IDE 配置文件（`.idea/`, `.vscode/`）
- 系统文件（`.DS_Store`）

## 🚀 上传步骤

### 方法一：使用 GitHub CLI（推荐）

如果您已安装 GitHub CLI：

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Initial commit: 跨境电商管理系统"

# 4. 在 GitHub 上创建仓库（会自动设置远程）
gh repo create ecommerce-system --public --source=. --remote=origin --push
```

### 方法二：使用 Git 命令行

#### 步骤 1: 在 GitHub 上创建新仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `ecommerce-system`（或您喜欢的名称）
   - **Description**: `企业级跨境电商管理系统`
   - **Visibility**: 选择 Public（公开）或 Private（私有）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

#### 步骤 2: 在本地初始化并推送

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Initial commit: 跨境电商管理系统"

# 4. 添加远程仓库（将 YOUR_USERNAME 替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-system.git

# 5. 重命名主分支为 main（如果当前是 master）
git branch -M main

# 6. 推送到 GitHub
git push -u origin main
```

### 方法三：使用 GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开 GitHub Desktop
3. 点击 "File" -> "Add Local Repository"
4. 选择项目目录
5. 点击 "Publish repository"
6. 填写仓库信息并发布

## 🔐 使用 SSH 密钥（可选但推荐）

如果您想使用 SSH 而不是 HTTPS：

```bash
# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 将公钥添加到 GitHub
# 复制 ~/.ssh/id_ed25519.pub 的内容
# 在 GitHub -> Settings -> SSH and GPG keys -> New SSH key 中添加

# 3. 使用 SSH URL 添加远程仓库
git remote set-url origin git@github.com:YOUR_USERNAME/ecommerce-system.git
```

## 📝 后续维护

### 更新代码到 GitHub

```bash
# 1. 查看更改
git status

# 2. 添加更改的文件
git add .

# 3. 提交更改
git commit -m "描述您的更改"

# 4. 推送到 GitHub
git push
```

### 创建分支

```bash
# 创建并切换到新分支
git checkout -b feature/新功能名称

# 推送新分支到 GitHub
git push -u origin feature/新功能名称
```

## ⚠️ 注意事项

1. **私有仓库**: 如果项目包含敏感信息，建议创建私有仓库
2. **许可证**: 考虑添加 LICENSE 文件（MIT、Apache 2.0 等）
3. **贡献指南**: 可以添加 CONTRIBUTING.md 文件
4. **问题模板**: 可以在 GitHub 仓库设置中添加 issue 和 PR 模板

## 🎉 完成！

上传成功后，您的仓库地址将是：
```
https://github.com/YOUR_USERNAME/ecommerce-system
```

您可以在 README.md 中添加徽章（badges）来展示项目状态。
