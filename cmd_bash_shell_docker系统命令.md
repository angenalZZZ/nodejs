# [**系统命令**]

# [**windows-cmd**](https://github.com/Awesome-Windows/awesome-windows-command-line) & [**linux-bash**](https://wangchujiang.com/linux-command/hot.html) 

~~~
  # 清屏
  > cls
  $ clear
  
  # 文件列表
  > dir [目录] # 默认当前目录
  $ ls  [目录] # 默认当前目录
  
  # 文件删除 [-f-强制删除]
  > del /f /s /q [目录|文件]
  > rd /s /q %windir%\temp & md %windir%\temp [临时文件]
  $ rm -f -r [目录]
  
  # 列出网络监听端口
  > netstat -ap tcp | findstr -i "listening" # tcp端口
  $ netstat -ap tcp | grep -i "listening"    # tcp端口
  $ netstat -ap tcp | grep -i "time_wait"    # tcp超时
  
~~~

# [**docker**](https://docs.docker.com)

> docker 命令 <br>
  `Dockerfile` : `docker build Image(tag=name+version)` > `push Registry` <br>
  `Registry & Disk` : `Repository` > `Image-Url` | `Image save .tar to-Disk`, `Container export .tar(snapshot)` <br>
  `Docker`     : `pull Image from-Registry` | `load Image .tar from-Disk` <br>
  `Runtime`    : `docker container run Image` + `--volumes-from Data-Container` | `-v from-Disk:Data-Dir`

> **Dockerfile** [官方文档](https://docs.docker.com/dockerfile/overview)
~~~
  # 构建：docker build --build-arg NODE_ENV=dev -t test-image
  # 运行：docker run --name test-image-docker -it -p 9999:8888 test-image
  FROM node:10.15.0
  
  # 说明镜像相关信息，通过 docker inspect 查看
  LABEL maintainer="test <test@gmail.com>"
  LABEL description="this is a test image"
  LABEL version="1.0"
  
  # 设置工作目录，若不存在会自动创建，其他指令会以此为工作路径
  WORKDIR /work/app
  
  # ADD <src> <dest>
  # 添加资源到工作目录，若是压缩文件会自动解压，可指定远程地址下载url
  ADD 'https://github.com/nodejscn/node-api-cn/blob/master/README.md' ./doc/
  
  # COPY <src> <dest>
  # 复制资源到工作目录，不会解压，无法从远程地址下载
  COPY ./ ./

  # ARG 构建镜像时可传递的参数，配置 ENV 使用 docker build --build-arg NODE_ENV=dev
  ARG NODE_ENV
  ARG TZ='Asia/Shanghai'
  
  # ENV 容器运行时环境变量，配置 ARG 使用 $NODE_ENV ${TZ}
  ENV NODE_ENV=$NODE_ENV
  ENV TZ ${TZ}
  
  # RUN 构建镜像时执行的命令
  RUN npm install
  
  # EXPOSE 容器端口(可指定多个)，启动时指定与宿主机端口的映射 docker run -p 9999:8888
  EXPOSE 8080 8888
  
  # CMD 容器启动后执行的命令，会被 docker run 命令覆盖
  CMD ["npm", "start"]  # CMD ["nginx", "-g", "daemon off;"]
  
  # ENTRYPOINT 容器启动后执行的命令，不会被 docker run 命令覆盖
  # 任何 docker run 命令设置的指令参数 或 CMD 指令，都将作为参数追加至 ENTRYPOINT 命令之后

~~~

> **docker-compose.yml** [官方文档v3](https://docs.docker.com/compose/overview) | [老版本v2](https://www.jianshu.com/p/2217cfed29d7)
~~~
  # 启动：docker-compose up -d , 停止：docker-compose down
  version: '3' # docker compose 版本
  services:
    web:
      # build: # 构建镜像
      #   context: . # 构建镜像的上下文(本地相对路径)
      #   dockerfile: Dockerfile # 指定dockerfile文件
      #   args: # 构建镜像使用的环境变量
      #   - NODE_ENV=dev
      container_name: web-container
      image: docker-web-image # 使用已存在的镜像
      ports: # 端口映射
      - "9999:8888"
      networks: # 网络设置
      - front-tier
      - back-tier
      depends_on: # 容器服务启动依赖
      - redis
      # links: # 外链
      # - redis
      volumes: # 外挂数据
      - "./:/work/app/"
      restart: always # 重启设置
      env_file: # 环境变量配置文件 key=value
      - ./docker.env
      environment: # 设置容器运行时环境变量，会覆盖docker.env相同变量
      - NODE_ENV: dev
      command: npm run dev # 容器启动后执行的命令
      
    redis:
      container_name: redis-container
      image: redis:latest
      networks:
      - back-tier

  networks: # 网络设置-自定义网络
    front-tier:
      driver: bridge
    back-tier:
      driver: bridge
~~~

