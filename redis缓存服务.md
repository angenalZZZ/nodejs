
# **[安装redis - Remote Dictionary Service](http://redis.io/)**

~~~
redis git:git clone --branch 2.8 --depth 1 git@github.com:antirez/redis.git;cd redis;make;cd src;./redis-server --daemonize yes;./redis-cli
redis for Docker: docker pull redis; docker run --name redis-server -d -p6379:6379 redis; docker exec -it redis-server redis-cli
redis for Windows: https://github.com/MicrosoftArchive/redis/releases
mac > brew install redis
ubuntu > apt-get install redis
redhat > yum install redis
~~~

####  1.查询服务信息

~~~
redis-cli -h 127.0.0.1 -p 6379  # 连接redis服务
> info                          # 查询redis服务信息
~~~

####  2.基础数据结构

~~~
1. string # 字符串
2. list   # 列表
3. set    # 集合
4. zset   # 有序集合
5. hash   # 哈希
~~~


