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
  
  # 列出所有端口
  > netstat -ap tcp | findstr -i "listening" # tcp端口
  $ netstat -ap tcp | grep -i "listening"    # tcp端口
  $ netstat -ap tcp | grep -i "time_wait"    # tcp超时
  
~~~


> docker 命令 <br>
  `Dockerfile` : `build` > `Image(tag)` > `push Registry` <br>
  `Registry`   : `Repository` > `Image(tag)` <br>
  `Docker`     : `pull Image(tag)`|`load .tar` > `run Container from-Image(tag)` <br>
  `Disk`       : `Image(tag) save .tar`, `Container export .tar(snapshot)`, `Data file`
  

~~~
  # 
  
~~~

