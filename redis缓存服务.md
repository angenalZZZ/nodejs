
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
 > set key value
 > get key
 > exists key                     # if key is exists: 成功返回1,失败返回0.
 > del key                        # 删除: 成功返回1,失败返回0.
 > mset name1 value1 name2 value2 # 批量设置
 > mget name1 name2               # 批量获取
 > expire key 60                  # 过期: 60s
 > setex key 60 value             # 过期: 60s
 > setnx age 1                    # if age is not exists, set age = 1: 成功返回1,失败返回0.
 > incr age                       # 计数: += 1
 > incrby age 2                   # 计数: += 2
 
2. list   # 列表 LinkedList 链表[内存: 元素少时ziplist压缩列表, 元素多时quicklist快速列表 ]: 插入删除快Time=O(1),索引定位慢Time=O(n)
 > rpush books python java swift golang # 插入: 成功返回4,失败返回0.
 > llen books                     # 列表长度: 成功返回4
 > lpop books                     # 取值快: 成功返回python
 > rpop books                     # 取值快: 成功返回golang
 > lindex books 0                 # 取值慢: 成功返回java, O(n) 慎用
 > lrange books 0 -1              # 取全部: 成功返回java swift, O(n) 慎用
 > ltrim books 1 -1               # 从第二个开始截取全部: 成功返回OK, O(n) 慎用
 > ltrim books 1 0                # 清空: llen books = 0 可用
 
3. set    # 集合
4. zset   # 有序集合
5. hash   # 哈希
~~~


