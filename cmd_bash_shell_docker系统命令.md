# [**系统命令**](https://github.com/)

> cmd & bash 命令

~~~
  # 清屏
  > cls
  $ clear
  
  # 文件列表
  > dir [目录] # 默认当前目录
  $ ls  [目录] # 默认当前目录
  
  # 文件删除
  > del /f /s /q [目录|文件]
  $ rm -f -r [目录]
  
  # 列出所有端口
  > netstat -ap tcp | findstr -i "listening" # tcp端口
  $ netstat -ap tcp | grep -i "listening"    # tcp端口
  $ netstat -ap tcp | grep -i "time_wait"    # tcp超时
  
~~~
