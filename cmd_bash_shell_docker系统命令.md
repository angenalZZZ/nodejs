# [**系统命令**](https://github.com/)

> cmd & bash 命令

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


> docker 命令 <br>
  `Dockerfile` : `build` > `Image(tag=name+version)` > `push Registry` <br>
  `Registry`   : `Repository` > `Image-Url` | `Disk` : `Image save .tar`, `Container export .tar(snapshot)` <br>
  `Docker`     : `pull Image from-Registry` | `load Image .tar from-Disk` <br>
  `Runtime`    > `container run from-Image`, `--volumes-from Data-Container`, `-v load.Data-File`

> `docker-compose.yml` [官方文档](https://docs.docker.com/compose/overview) [老版本 2](https://www.jianshu.com/p/2217cfed29d7)
~~~
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

