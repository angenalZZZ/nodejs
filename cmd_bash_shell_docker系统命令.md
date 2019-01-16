# **系统命令**

# [**windows-cmd**](https://github.com/Awesome-Windows/awesome-windows-command-line) | [windows-tool](https://github.com/Awesome-Windows/Awesome) | [**linux-bash**](https://wangchujiang.com/linux-command/hot.html) | [shell](https://github.com/fengyuhetao/shell) | [docker](#docker)

~~~
  # 清屏
  > cls
  $ clear
  
  # 文件列表
  > dir [目录] # 默认当前目录
  $ ls  [目录] # 默认当前目录
  
  # 文件删除
  > del /f /s /q [目录|文件]
  > rd /s /q %windir%\temp & md %windir%\temp [删除临时文件]
  $ rm -f -r [目录] [-f 强制]
  
  # 列出网络监听端口
  > netstat -ap tcp | findstr -i "listening" # tcp端口
  $ netstat -ap tcp | grep -i "listening"    # tcp端口
  $ netstat -ap tcp | grep -i "time_wait"    # tcp超时
  
  # 关机
  > sleep 9000; shutdown -s
  > at 03:30:00PM shutdown -s
  > schtasks /create /sc once /tn "auto shutdown my computer" /tr "shutdown -s" /st 15:30
  > at 11:00:00PM /every:M,T,W,TH,F,SA,SU shutdown -s
  > at 11:00:00PM shutdown -r [-r 重启]
  
  # 系统硬件序列号
  wmic memorychip get serialnumber
  wmic diskdrive get serialnumber
  wmic baseboard get serialnumber
  wmic cdrom where drive='G:' get SerialNumber
  # 系统自动登录
  autologon  userName domainName password
  # 修改计算机名
  wmic computersystem where caption='currentname' rename newname
  # 网络WiFi关闭
  netsh interface set interface name="Wireless Network Connection" admin=DISABLED
  # 防火墙开关
  netsh advfirewall set allprofiles[currentprofile publicprofile privateprofile] state on
  netsh advfirewall set allprofiles[currentprofile publicprofile privateprofile] state off
  # 时区
  tzutil /g [获取] /l [列表]
  tzutil /s "China Standard Time" [设置]
  # 打印
  wmic printer get Default,DeviceID,Name,Network                          # 获取打印机设备
  wmic printer get DeviceID,PrinterPaperNames                             # 设备ID,打印纸张
  wmic printer where default='TRUE' get name                              # 获取默认打印机
  wmic printer where name='Microsoft Print to PDF' call setdefaultprinter # 设置默认打印机
  
~~~

# [**docker**](https://docs.docker.com)

> `Dockerfile` : `docker build Image(tag=name+version)` > `push Registry` <br>
  `Registry & Disk` : `Repository` > `Image-Url` | `Image save .tar to-Disk`, `Container export .tar(snapshot)` <br>
  `Docker`     : `pull Image from-Registry` | `load Image .tar from-Disk` <br>
  `Data`       : `docker container run Image` - `--volumes-from Data-Container` - `-v from-Disk:Data-Dir`

> **Command** [参考例子](https://docs.docker.com/samples/)
~~~
  # 构建
  docker build --build-arg NODE_ENV=dev -t test-image # 当前目录下有Dockerfile
  # 运行
  docker run --name test-image-docker -it -p 9999:8888 test-image # 已加载镜像 test-image 时, 用 docker images 查询
  # 网络
  docker network create -d bridge [network-name]    # 创建自定义网络[-d bridge 网络驱动=桥接模式]
  docker network connect [network-name] [container] # 加入自定义网络
~~~

> **Dockerfile** [参考文档](https://docs.docker.com/get-started/)
~~~
  # 基础镜像
  FROM node:10.15.0
  
  # 备注镜像相关信息，通过 docker inspect 查看
  LABEL maintainer="test <test@gmail.com>"
  LABEL description="this is a test image"
  LABEL version="1.0"
  
  # 设置工作目录，若不存在会自动创建，其他指令会以此为相对路径
  WORKDIR /work/app
  
  # ADD <src> <dest>
  # 添加资源到工作目录，若是压缩文件会自动解压，可指定远程地址下载url
  ADD 'https://github.com/nodejscn/node-api-cn/blob/master/README.md' ./doc/
  
  # COPY <src> <dest>
  # 复制资源到工作目录，不会解压，无法从远程地址下载
  COPY ./ ./
  
  # RUN 构建镜像时执行的命令(安装运行时环境、软件等)
  RUN npm install
  
  # ARG 构建镜像时可传递的参数，配合 ENV 使用 docker build --build-arg NODE_ENV=dev
  ARG NODE_ENV
  ARG TZ='Asia/Shanghai'
  
  # ENV 容器运行时环境变量，配合 ARG 使用 $NODE_ENV '${TZ}'
  ENV NODE_ENV=$NODE_ENV
  ENV TZ '${TZ}'
  
  # EXPOSE 容器端口(可指定多个)，启动时指定与宿主机端口的映射 docker run -p 9999:8888
  EXPOSE 8080 8888
  
  # CMD 容器启动后执行的命令，会被 docker run 命令覆盖
  CMD ["npm", "start"]  # other, web-proxy: CMD ["nginx", "-g", "daemon off;"]
  
  # ENTRYPOINT 容器启动后执行的命令，不会被 docker run 命令覆盖；一般不会使用；
  # 任何 docker run 命令设置的指令参数 或 CMD 指令，都将作为参数追加至 ENTRYPOINT 命令之后

~~~

> **docker-compose.yml** [官方文档v3](https://docs.docker.com/compose/overview) | [老版本v2](https://www.jianshu.com/p/2217cfed29d7)<br>
  `启动`：`docker-compose up -d` | `停止`：`docker-compose down` <br>
  `其他`：`pause`、`unpause`、`start`、`stop`、`restart`、`kill`、`down`.
~~~
  version: '3' # docker compose 版本(版本不同,语法命令有所不同)
  services:    # docker services 容器服务编排
    web:       # docker container service
      # build: # 构建镜像
      #   context: . # 构建镜像的上下文(本地构建的工作目录)
      #   dockerfile: Dockerfile # 指定构建文件(工作目录下)
      #   args: # 构建镜像时传递的参数/用于运行时环境变量
      #   - NODE_ENV=dev
      container_name: web-container # 容器名称
      image: docker-web-image       # 使用已有的镜像(用 docker images 查询)
      ports: # 端口映射(宿主机端口:容器端口)
      - "9999:8888"
      networks: # 网络设置(加入自定义网络)
      - front-tier
      - back-tier
      # links: # 外链容器(不安全)
      # - redis
      volumes: # 外挂数据(映射宿主机目录:容器工作目录)
      - "./data/:/work/app/data/"
      depends_on: # 启动时依赖的容器(容器启动顺序: 推荐第三方工具 wait-for-it dockerize 等)
      - redis
      restart: always # 重启设置
      env_file: # 环境变量配置文件 key=value
      - ./docker-web.env
      environment: # 设置容器运行时环境变量，会覆盖env_file相同变量
      - NODE_ENV: dev
      command: npm run dev # 容器启动后执行的命令
      
    redis:
      container_name: redis-container
      image: redis:latest
      networks:
      - back-tier

  networks: # 网络设置(自定义)
    front-tier:
      driver: bridge
    back-tier:
      driver: bridge
~~~

