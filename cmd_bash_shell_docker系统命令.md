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
  `Registry`   : `Repository` > `Image`,  `Disk` : `Image save .tar`, `Container export .tar(snapshot)` <br>
  `Docker`     : `pull Image from-Registry` | `load Image .tar from-Disk` <br>
  `Runtime`    > `container run from-Image`, `--volumes-from Data-Container`, `-v load.Data-File`

~~~
  # 
  
~~~

