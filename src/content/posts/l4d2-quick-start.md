---
title: "L4D2 服务器快速部署 - 小白版"
description: "5分钟快速上手，一键部署 L4D2 服务器，包含换源脚本"
published: 2026-03-26
updated: 2026-03-26
tags: ["l4d2", "游戏服务器", "docker", "快速部署", "小白教程"]
category: "游戏服务器"
---

# L4D2 服务器快速部署 - 小白版

> 最简单的 L4D2 服务器部署教程，5 分钟快速上手！

---

## 🚀 快速开始（推荐 Docker）

### 第一步：安装 Docker

**Windows 用户：**
1. 下载 [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. 双击安装，一路下一步
3. 重启电脑

**Linux 用户（Ubuntu/Debian）：**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 第二步：创建配置文件

创建一个文件夹，比如 `D:\L4D2`（Windows）或 `~/l4d2`（Linux）

在文件夹里新建文件 `docker-compose.yaml`，复制以下内容：

```yaml
version: '3.8'

volumes:
  l4d2-data:
  l4d2-plugins:

networks:
  l4d2-network:

services:
  l4d2:
    image: laoyutang/l4d2-pure:latest
    container_name: l4d2
    restart: unless-stopped
    ports:
      - "27015:27015"
      - "27015:27015/udp"
    volumes:
      - l4d2-data:/l4d2/left4dead2
    networks:
      - l4d2-network
    environment:
      - L4D2_TICK=100
      - L4D2_PORT=27015
      - L4D2_RCON_PASSWORD=123456  # ⚠️ 改成你的密码

  l4d2-manager:
    image: laoyutang/l4d2-manager-next:latest
    container_name: l4d2-manager
    restart: unless-stopped
    ports:
      - "27020:27020"
    volumes:
      - l4d2-data:/left4dead2
      - l4d2-plugins:/plugins
      - /proc:/host/proc:ro
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - l4d2-network
    environment:
      - L4D2_MANAGER_PASSWORD=admin123  # ⚠️ 改成你的密码
      - L4D2_RCON_URL=l4d2:27015
      - L4D2_RCON_PASSWORD=123456
      - L4D2_GAME_PATH=/left4dead2
      - L4D2_RESTART_BY_RCON=true
    depends_on:
      - l4d2
```

### 第三步：启动服务

**Windows：**
1. 在文件夹空白处按 `Shift + 右键`
2. 选择"在此处打开 PowerShell"
3. 输入：`docker-compose up -d`
4. 等待 2-3 分钟

**Linux：**
```bash
cd ~/l4d2
docker-compose up -d
```

### 第四步：访问管理后台

打开浏览器，访问：
```
http://localhost:27020
```

输入密码：`admin123`（你在配置文件中设置的密码）

✅ **完成！** 服务器已启动

---

## 🌍 一键换源脚本

如果下载镜像很慢，使用这个脚本快速换源。

### Linux 用户

**方案 A：使用阿里云源（推荐）**

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "registry-mirrors": [
    "https://registry.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
echo "✅ Docker 源已切换"
```

**方案 B：使用清华源**

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
echo "✅ Docker 源已切换"
```

### Windows 用户

1. 右键点击 Docker Desktop 图标 → Settings
2. 找到 Docker Engine
3. 在 JSON 中添加：

```json
{
  "registry-mirrors": [
    "https://registry.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

4. 点击 Apply & Restart

---

## 📝 常用操作

### 查看服务状态

```bash
docker-compose ps
```

### 查看日志

```bash
# 查看游戏服务器日志
docker logs -f l4d2

# 查看管理器日志
docker logs -f l4d2-manager

# 按 Ctrl+C 退出
```

### 重启服务

```bash
docker-compose restart
```

### 停止服务

```bash
docker-compose down
```

### 启动服务

```bash
docker-compose up -d
```

---

## 🎮 管理后台使用

### 登录

1. 打开 `http://localhost:27020`
2. 输入密码登录

### 上传地图

1. 点击"地图管理"
2. 拖拽地图文件（.vpk 或 .zip）
3. 等待上传完成

### 切换地图

1. 在地图列表中选择地图
2. 点击"切换"按钮
3. 服务器自动切换

### 查看玩家

1. 点击"玩家列表"
2. 查看在线玩家信息

### 发送指令

1. 点击"RCON 控制台"
2. 输入游戏指令
3. 点击发送

---

## ⚙️ 修改配置

### 修改服务器名称

编辑 `docker-compose.yaml`，在 `l4d2` 服务的 `environment` 中添加：

```yaml
environment:
  - L4D2_TICK=100
  - L4D2_PORT=27015
  - L4D2_RCON_PASSWORD=123456
  - L4D2_HOSTNAME=My L4D2 Server  # 添加这行
```

然后重启：
```bash
docker-compose restart
```

### 修改难度

在管理后台的地图管理中直接修改，或在 RCON 控制台输入：

```
z_difficulty 2
```

难度值：1=简单, 2=普通, 3=困难, 4=专家

### 修改最大玩家数

在 RCON 控制台输入：

```
sv_maxplayers 8
```

---

## 🆘 常见问题

### Q：无法访问管理后台

**检查清单：**
1. 确认 Docker 容器正在运行：`docker-compose ps`
2. 确认防火墙没有阻止 27020 端口
3. 确认密码输入正确
4. 查看日志：`docker logs l4d2-manager`

### Q：地图上传失败

**解决方案：**
1. 确认地图文件格式正确（.vpk 或 .zip）
2. 确认文件大小不超过 500MB
3. 重新上传或查看日志

### Q：无法连接到游戏服务器

**检查清单：**
1. 确认游戏服务器正在运行：`docker logs l4d2`
2. 确认防火墙开放了 27015 端口
3. 确认 RCON 密码正确

### Q：下载镜像很慢

**解决方案：**
1. 使用上面的"一键换源脚本"
2. 或者手动修改 Docker 源（见上文）

### Q：容器一直重启

**解决方案：**
1. 查看日志：`docker logs l4d2`
2. 检查配置文件是否有错误
3. 确认端口没有被占用

---

## 🔧 进阶操作

### 备份数据

```bash
# 备份游戏数据
docker exec l4d2 tar -czf /l4d2/backup.tar.gz /l4d2/left4dead2

# 复制到本地
docker cp l4d2:/l4d2/backup.tar.gz ./backup.tar.gz
```

### 更新镜像

```bash
# 拉取最新镜像
docker pull laoyutang/l4d2-pure:latest
docker pull laoyutang/l4d2-manager-next:latest

# 重启容器
docker-compose down
docker-compose up -d
```

### 查看容器资源占用

```bash
docker stats
```

---

## 📊 配置参数速查表

| 参数 | 说明 | 示例 |
|------|------|------|
| `L4D2_TICK` | 服务器精度 | 30/60/100 |
| `L4D2_PORT` | 游戏端口 | 27015 |
| `L4D2_RCON_PASSWORD` | 游戏服务器密码 | 123456 |
| `L4D2_MANAGER_PASSWORD` | 管理后台密码 | admin123 |
| `L4D2_RESTART_BY_RCON` | 允许 RCON 重启 | true/false |

---

## 🎯 下一步

- 📖 [官方项目](https://github.com/LaoYutang/l4d2-server-next)
- 🔌 [插件商店](https://github.com/LaoYutang/l4d2-plugins-store)
- 🎮 [L4D2 指令大全](https://developer.valvesoftware.com/wiki/Left_4_Dead_2_Dedicated_Server)

---

**就这么简单！** 🎉

*本文由 QClaw 自动生成*
