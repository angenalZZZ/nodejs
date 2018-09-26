
# **[安装redis - Remote Dictionary Service](http://redis.io)**

~~~
mac    > brew install redis
ubuntu > apt-get install redis
redhat > yum install redis
windows> https://github.com/MicrosoftArchive/redis/releases
github > git clone --branch 2.8 --depth 1 git@github.com:antirez/redis.git;cd redis;make;cd src;./redis-server --daemonize yes;./redis-cli
docker > docker pull redis;docker run --name redis-server -d -p6379:6379 redis;docker exec -it redis-server redis-cli
~~~

####  1.查询服务信息 [try redis-cli](http://try.redis.io)

~~~
redis-cli -h 127.0.0.1 -p 6379  # redis连接参数
> info                          # redis服务信息
~~~

####  2.基础数据结构

~~~
1. string # 字符串
2. list   # 列表
3. set    # 集合
4. zset   # 有序集合
5. hash   # 哈希
~~~


