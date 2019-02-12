# **系统命令**

# [**windows-cmd**](https://github.com/Awesome-Windows/awesome-windows-command-line) | [windows-tool](https://github.com/Awesome-Windows/Awesome) | [**linux-bash**](https://wangchujiang.com/linux-command/hot.html) | [shell](https://github.com/fengyuhetao/shell) | [docker](#docker)
> [Index of Linux Command](https://ss64.com/bash/)、[List of Windows CMD](https://ss64.com/nt/)<br>
[`免费的容器镜像服务`](#免费的容器镜像服务)、[`免费的开发服务器`](#免费的开发服务器)、[`k8s`](https://www.kubernetes.org.cn) 

~~~
  # 清屏
  > cls
  $ clear
  
  # 系统
  > ver
  $ uname -a
  
  # 用户登陆
  $ w
  
  # 内存情况
  $ free -h
  $ top
  
  # 进程详情
  > tasklist
  $ ps aux
  
  # 文件列表
  > dir [目录] # 默认当前目录
  $ ls  [目录] # 默认当前目录
  
  # 文件复制
  > xcopy /isy C:\...\bin\Release\netcoreapp2.1\* F:\app\dotnetcore\centos\a
  $ cp -if /mnt/floppy/* ~/floppy # [~/floppy 指向 /root/floppy 或 /home/floppy]
  
  # 文件删除
  > del /f /s /q [目录|文件]
  > rd /s /q %windir%\temp & md %windir%\temp [删除临时文件]
  $ rm -f -r [目录] [-f 强制]
  
  # 列出网络监听端口
  > netstat -ap tcp | findstr -i "listening" # tcp端口
  $ netstat -atW | grep -i "listen"    # tcp端口-centos $ yum install -y net-tools & yum install -y traceroute
  $ netstat -atW | grep -i "time_wait" # tcp超时-ubuntu $ apt-get update & apt-get -y install xinetd telnetd
  
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
  
  # 服务安装ssh
  $ rpm -qa | grep ssh  #-centos: netstat -antp | grep sshd [端口:22]
  $ yum install -y initscripts #-centos: install service [/sbin/service]
  $ yum install -y openssh-server #-centos: install sshd
  $ service sshd start | service sshd stop #-centos: [启动sshd|停止服务]
  $ chkconfig sshd on #-centos: [开机启动]
~~~

# [**docker**](https://docs.docker.com)

>  [下载](https://download.docker.com)、[安装](https://docs.docker.com/install/)<br>
  `环境 & 版本` : `Linux x64, Kernel^3.10 cgroups & namespaces.`, `docker-ce`社区版 + `docker-ee`企业版 <br>
  `加速器`      : [`阿里云`](https://cr.console.aliyun.com/#/accelerator)、[`DaoCloud道客`](https://dashboard.daocloud.io/packages/explore) [..](http://8fe1b42e.m.daocloud.io)

> `Dockerfile` : `docker build Image(tag=name+version)` > `push Registry` <br>
  `Registry & Disk` : `Repository` > `Image-Url` | `Image save .tar to-Disk`, `Container export .tar(snapshot)` <br>
  `Docker`     : `pull Image from-Registry` | `load Image .tar from-Disk` <br>
  `Data`       : `docker container run Image` - `--volumes-from Data-Container` - `-v from-Disk:Data-Dir`

> **Shell** [samples](https://docs.docker.com/samples)、[labs/tutorials](https://github.com/angenal/labs)
~~~
  # 构建
  docker build --build-arg NODE_ENV=dev -t test-image # 当前目录下有Dockerfile
  # 运行
  docker run --name test-image-docker -it -p 9999:8888 test-image # 已加载镜像 test-image 时, 用 docker images 查询
  # 网络
  docker network create -d bridge [network-name]    # 创建自定义网络[-d bridge 网络驱动=桥接模式]
  docker network connect [network-name] [container] # 加入自定义网络
  # 基础
  docker [COMMAND] --help
  docker [OPTIONS] COMMAND
  docker images # 查看镜像
  docker ps -a | docker container ls -a # 查看容器
  docker search ubuntu # 搜索镜像
  docker pull ubuntu:latest # 下载镜像
  docker cp d:\app\xxx\publish centos.netcore:/home/app # 复制程序发布目录
  docker export ubuntu > "d:\app\snapshot\ubuntu_19_04.tar"            # 导出镜像
  docker container export -o="d:\app\snapshot\ubuntu_19_04.tar" ubuntu # 导出镜像
  
  docker run -it -e AUTHOR="Test" alpine /bin/sh # 查找镜像alpine:latest+运行容器alpine+终端交互it+执行命令/bin/sh
  
  docker run -d -p 8080:80 -p 8081:443 --name mysite dockersamples/static-site # 查找镜像&运行容器mysite&后端服务&端口映射
  
  docker run --name redis5 --network=net1d -d -m 512m -p 6379:6379 
    -v "d:\app\redis5\redis.conf:/etc/redis/redis.conf" -v "d:\app\redis5\data:/data" 
    redis:5.0.3-alpine redis-server /etc/redis/redis.conf
  
  docker run --name centos.netcore --network=net1d -it -m 512m -p 8000:80 -v "d:\app\centos.netcore\home:/home" centos /bin/bash
    $ rpm -Uvh https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm & yum install -y dotnet-sdk-2.1
    $ dotnet /home/app/ConsoleApp2NewLife/ConsoleApp2NewLife.dll # 访问 tcp://127.0.0.1:8000
  
  docker network create -d bridge net1d # 创建自定义网络net1d
  docker network connect net1d redis5 & docker network connect net1d centos.netcore # 加入自定义网络net1d
  
  docker stop 8b49 & docker rm -f mysite # 停止+删除:容器[CONTAINER ID: 8b49b31cea06][前缀4位|完整ID|name]
  docker container prune   # 删除所有停止的容器
  docker port mysite       # 查看容器端口映射
  docker exec redis5 ps -a # 在容器中执行命令
  docker inspect mysite    # 查看容器详情
  docker logs redis5       # 查看容器日志
~~~

> **docker-search-tags.sh** 标签/版本列表
~~~
  # Usage: $ ./docker-search-tags.sh ubuntu
  for Repo in $* ; do
    curl -s -S "https://registry.hub.docker.com/v2/repositories/library/$Repo/tags/" | \
      sed -e 's/,/,\n/g' -e 's/\[/\[\n/g' | \
      grep '"name"' | \
      awk -F\" '{print $4;}' | \
      sort -fu | \
      sed -e "s/^/${Repo}:/"
  done
~~~

> **Dockerfile** [文档](https://docs.docker.com/get-started)<br>
　$ docker build -t <YOUR_USERNAME>/myapp . # 构建+标签[用户名/镜像名]
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

> **docker-compose.yml** [安装Compose](https://docs.docker.com/compose/install/) [文档v3](https://docs.docker.com/compose/overview) | [老版本v2](https://www.jianshu.com/p/2217cfed29d7) | [votingapp例子](https://github.com/angenal/labs/blob/master/beginner/chapters/votingapp.md)<br>
  　[`k8s`](https://www.kubernetes.org.cn) 是一个流行的容器管理编排平台，集中式管理数个服务的容器集群；<br>
  　　管理容器的生命周期，从应用创建、部署、扩容、更新、调度均可在一个平台上完成。<br>
　[`启动`](https://docs.docker-cn.com/compose/reference/up/)：`docker-compose up -d` | [`停止`](https://docs.docker-cn.com/compose/reference/down/)：`docker-compose down` | [`更多`](https://docs.docker-cn.com/compose/reference)：`pause`、`unpause`、`start`、`stop`、`restart`
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

####  免费的容器镜像服务

> [阿里云`/fp-api/front`](https://cr.console.aliyun.com/repository/cn-hangzhou/fp-api/front/detail)

  1. 登录阿里云Docker Registry
~~~
  $ sudo docker login --username=angenal@hotmail.com registry.cn-hangzhou.aliyuncs.com
~~~
  2. 从Registry中拉取镜像
~~~
  $ sudo docker pull registry.cn-hangzhou.aliyuncs.com/fp-api/front:[镜像版本号]
~~~
  3. 将镜像推送到Registry
~~~
  # [ImageId]和[镜像版本号]参数(用 docker images 查询)
  # 　公网地址：registry.cn　经典内网：registry-internal.cn　专有网络：registry-vpc.cn
  $ sudo docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/fp-api/front:[镜像版本号]
  $ sudo docker push registry.cn-hangzhou.aliyuncs.com/fp-api/front:[镜像版本号]
~~~

#### 免费的开发服务器

> [转发服务`ngrok`](https://dashboard.ngrok.com/get-started)

~~~
  # 配置认证服务 add your account's authtoken to your ngrok.yml file.
  $ ./ngrok authtoken 7pWLVhS1gxiMAQdaFeYJy_31krnw9drNLLJftaNSFnm
  # 查看帮助文档
  $ ./ngrok help
  # 开启http服务
  $ ./ngrok http 80
~~~


