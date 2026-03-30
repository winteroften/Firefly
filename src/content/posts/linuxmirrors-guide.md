---
title: LinuxMirrors 一键换源脚本完全指南
description: 告别手动编辑源文件，一行命令搞定 Linux 系统换源与 Docker 安装
published: 2026-03-30
updated: 2026-03-30
tags:
  - linux
  - docker
  - 运维
  - 一键脚本
  - 换源
category: 运维工具
image: api
---

# LinuxMirrors 一键换源脚本完全指南

> 一行命令，10 秒完成换源。专为国内用户打造的开源运维神器。

---

## 写在前面

如果你是 Linux 用户，一定遇到过这样的烦恼：

- 新装的系统 `apt install` 慢得要死
- Docker 拉镜像超时、失败
- 手动换源要编辑一堆配置文件，改错了还不好恢复
- 不同发行版的源文件格式还不一样...

**LinuxMirrors** 就是为了解决这些痛点而生的开源项目。

---

## 项目简介

**LinuxMirrors** 是一个 GNU/Linux 更换系统软件源脚本及 Docker 安装与换源脚本的合集。

官网：[https://linuxmirrors.cn](https://linuxmirrors.cn)

GitHub：[https://github.com/SuperManito/LinuxMirrors](https://github.com/SuperManito/LinuxMirrors)

### 核心特点

| 特性 | 说明 |
|------|------|
| **零技术门槛** | 只需要一行命令就能直接运行，无需安装任何依赖 |
| **系统支持广泛** | 已适配 26+ 操作系统，精准识别系统类型 |
| **多元软件源适配** | 专为中国用户打造，提供国内教育网和海外镜像站 |
| **快速高效** | 最快仅需 10 秒即可完成软件源的更换 |
| **高度可定制** | 支持丰富的命令选项，满足各种高级需求 |
| **开源免费** | MIT 开源许可协议，完全免费使用 |

---

## 一、Linux 系统一键换源

### 支持的操作系统
还在不断更新中......
| 操作系统 | 适配版本 |
|---------|---------|
| Debian | 8～13 |
| Ubuntu / 优麒麟 / Kubuntu 等 | 14～25 |
| Kali Linux | all |
| Linux Mint | 17～22 / LMDE 2～7 |
| Deepin（深度） | all |
| Zorin OS | all |
| Armbian | all |
| Proxmox VE | all |
| Raspberry Pi OS | all |
| Red Hat Enterprise Linux | 7～10 |
| Fedora | 30～43 |
| CentOS | 7～8 / Stream 8～10 |
| Rocky Linux | 8～10 |
| AlmaLinux | 8～10 |
| Oracle Linux | 8～10 |
| openEuler（开源欧拉） | 20～25 |
| OpenCloudOS（鸥栖） | 8.6～9 / Stream 23 |
| openKylin（开放麒麟） | all |
| Anolis OS（龙蜥） | 8 / 23 |
| openSUSE | Leap 15 ~ 16 / Tumbleweed |
| Arch Linux | all |
| Manjaro | all |
| EndeavourOS | all |
| Alpine Linux | v3 / edge |
| Gentoo | all |
| NixOS | 19～25 |

### 使用方法

#### 1. 中国大陆用户（推荐）

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh)
```

#### 2. 境外及海外地区

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh) --abroad
```

#### 3. 中国大陆教育网

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh) --edu
```

### 其他脚本地址

如果官网地址无法访问，可以使用以下备用地址：

```bash
# GitHub（实时同步，无延迟）
bash <(curl -sSL https://raw.githubusercontent.com/SuperManito/LinuxMirrors/main/ChangeMirrors.sh)

# Gitee 码云（国内推荐）
bash <(curl -sSL https://gitee.com/SuperManito/LinuxMirrors/raw/main/ChangeMirrors.sh)

# GitCode（同步存在1小时延迟）
bash <(curl -sSL https://raw.gitcode.com/SuperManito/LinuxMirrors/raw/main/ChangeMirrors.sh)

# jsDelivr CDN
bash <(curl -sSL https://cdn.jsdelivr.net/gh/SuperManito/LinuxMirrors@main/ChangeMirrors.sh)

# 腾讯云 EO CDN
bash <(curl -sSL https://edgeone.linuxmirrors.cn/main.sh)
```

### 常见问题

#### 没有安装 curl？

根据你的系统选择对应的安装命令：

```bash
# Debian 系 / openKylin
apt-get install -y curl

# RedHat 系 / openEuler / OpenCloudOS / Anolis OS
dnf install -y curl || yum install -y curl

# openSUSE
zypper install curl

# Arch Linux / Manjaro
pacman -S curl

# Alpine Linux
apk --no-cache add -f curl bash ncurses

# Gentoo
emerge --ask curl

# NixOS
nix-env -iA nixos.curl
```

如果 curl 安装不上（系统源失效），可以用 Python 下载：

```bash
python3 -c "import urllib.request; urllib.request.urlretrieve('https://linuxmirrors.cn/main.sh', 'main.sh')"
bash main.sh
```

#### 还原已备份的软件源

脚本会自动备份原有软件源配置文件，备份路径为原文件加 `.bak` 后缀。

**Debian 系：**

```bash
cp -rf /etc/apt/sources.list.bak /etc/apt/sources.list
apt-get update
```

**RedHat 系：**

```bash
cp -rf /etc/yum.repos.d.bak /etc/yum.repos.d
yum makecache
```

**Arch Linux / Manjaro：**

```bash
cp -rf /etc/pacman.d/mirrorlist.bak /etc/pacman.d/mirrorlist
pacman -Sy
```

---

## 二、Docker 一键安装与换源

### 功能特性

- 集成安装 **Docker Engine** 和 **Docker Compose**
- 支持选择或更换软件源（Docker 软件仓库）
- 支持更换镜像仓库（镜像加速器）
- 支持安装指定版本、重装等功能
- 支持 ARM 架构
- 完全替代官方安装脚本 `get.docker.com`
- 支持国产衍生操作系统（Kylin Server、Huawei Cloud EulerOS、TencentOS Server、Alibaba Cloud Linux 等）

### 使用方法

#### 1. 安装 Docker 并换源

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

#### 2. 仅更换镜像加速器（Docker 已安装）

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --only-registry
```

### 内置的国内镜像仓库源

| 站点名称 | 地址 | 说明 |
|---------|------|------|
| 毫秒镜像 | `docker.1ms.run` | 企业镜像站，CDN智能分发速度极快，推荐使用 |
| Docker Proxy | `dockerproxy.net` | 由 ghproxy 创建，可用性高 |
| DaoCloud 道客 | `docker.m.daocloud.io` | 老牌企业镜像站，可用性高且速度快 |
| 1Panel 镜像 | `docker.1panel.live` | 企业产品自用镜像 |

### 阿里云镜像加速器

阿里云提供各区域的镜像加速器（需要登录阿里云控制台获取专属加速地址）：

| 区域 | 地址 |
|------|------|
| 杭州 | `registry.cn-hangzhou.aliyuncs.com` |
| 上海 | `registry.cn-shanghai.aliyuncs.com` |
| 北京 | `registry.cn-beijing.aliyuncs.com` |
| 深圳 | `registry.cn-shenzhen.aliyuncs.com` |
| 香港 | `registry.cn-hongkong.aliyuncs.com` |
| 新加坡 | `registry.ap-southeast-1.aliyuncs.com` |
| 日本-东京 | `registry.ap-northeast-1.aliyuncs.com` |
| ... | 更多区域请参考阿里云文档 |

### 命令选项（高级用法）

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --help
```

| 选项 | 含义 | 值 |
|------|------|-----|
| `--source` | 指定 Docker CE 软件源地址 | 域名或IP |
| `--source-registry` | 指定 Docker 镜像仓库地址 | 域名或IP |
| `--designated-version` | 指定 Docker Engine 安装版本 | 版本号 |
| `--protocol` | 指定 Docker CE 软件源的 Web 协议 | http 或 https |
| `--install-latest` | 是否安装最新版本的 Docker Engine | true 或 false |
| `--close-firewall` | 是否关闭防火墙 | true 或 false |
| `--only-registry` | 仅更换镜像加速器 | - |

### 示例

```bash
# 安装 Docker 并使用阿里云镜像加速器
bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --source-registry registry.cn-hangzhou.aliyuncs.com

# 安装指定版本的 Docker
bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --designated-version 24.0.7

# 仅更换镜像加速器为毫秒镜像
bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --only-registry --source-registry docker.1ms.run
```

---

## 三、最佳实践

### 软件源选择建议

如果你不了解这些镜像站，建议：

- **阿里云**：兼容性高、可用性强
- **中国科学技术大学**：速度快

**不要陷入测速焦虑**，内置的软件源一般不会有太大的差异。

### 使用流程

1. **新装系统**：先运行换源脚本，再安装软件
2. **安装 Docker**：直接运行 Docker 脚本，自动处理依赖
3. **遇到问题**：脚本会自动备份原有配置，可以随时还原

### 注意事项

- **需要 ROOT 权限**：请使用 `sudo -i` 或 `su root` 切换到 root 账户
- **不要通过 sudo 直接运行**：例如 `sudo bash <(curl...)` 是错误的方式
- **Docker Compose 命令变化**：Docker Compose V2 已集成到 Docker CLI，使用 `docker compose` 替代 `docker-compose`

---

## 四、项目生态

LinuxMirrors 已被广泛使用：

- **1Panel**：现代化的 Linux 服务器运维管理面板
- **宝塔面板**：流行的服务器管理软件

经过数年的技术沉淀与生产环境检验，广受社区好评，深得开发者喜爱。

---

## 总结

| 脚本 | 用途 | 命令 |
|------|------|------|
| Linux 换源 | 更换系统软件源 | `bash <(curl -sSL https://linuxmirrors.cn/main.sh)` |
| Docker 安装 | 安装 Docker 并换源 | `bash <(curl -sSL https://linuxmirrors.cn/docker.sh)` |
| Docker 换源 | 仅更换镜像加速器 | `bash <(curl -sSL https://linuxmirrors.cn/docker.sh) --only-registry` |

**让换源变得简单，让运维更加高效。** 🚀

---

## 相关链接

- 官网：[https://linuxmirrors.cn](https://linuxmirrors.cn)
- GitHub：[https://github.com/SuperManito/LinuxMirrors](https://github.com/SuperManito/LinuxMirrors)
- Gitee：[https://gitee.com/SuperManito/LinuxMirrors](https://gitee.com/SuperManito/LinuxMirrors)
- 问题反馈：[GitHub Issues](https://github.com/SuperManito/LinuxMirrors/issues)
