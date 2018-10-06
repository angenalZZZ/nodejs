
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
> info clients                  # redis connected_clients
> info memory                   # redis内存使用概况与分配mem_allocator:libc、tcmalloc(google)、jemalloc(facebook)[默认-性能最佳]
~~~

####  2.基础数据结构

~~~
1. string # 字符串
 > set key value                  # 添加/修改 (value包含空格时添加“”)
 > get key                        # 获取value
 > exists key                     # if key is exists: 成功返回1,失败返回0.
 > del key                        # 删除: 成功返回1,失败返回0.
 > mset name1 value1 name2 value2 # 批量设置
 > mget name1 name2               # 批量获取
 > expire key 60                  # 过期: 60s
 > setex key 60 value             # 添加/过期: 60s
 > ttl key                        # 返回: 过期时间(秒)
 > setnx age 1                    # if age is not exists, set age = 1: 成功返回1,失败返回0.
 > incr age                       # 计数: += 1
 > incrby age 2                   # 计数: += 2
 
2. list   # 列表 LinkedList 链表[内存: 元素少时ziplist压缩列表, 元素多时quicklist快速列表]: 插入删除快Time=O(1),索引定位慢Time=O(n)
 > rpush books python java swift golang # 插入[右进左出/队列,右进右出/栈]: 成功返回4,失败返回0.
 > llen books                     # 列表长度: 成功返回4
 > lpop books                     # 取值快/队列: 成功返回python
 > rpop books                     # 取值快/栈: 成功返回golang
 > lindex books 0                 # 取值慢: 成功返回java, O(n) 慎用
 > lrange books 0 -1              # 取全部: 成功返回java swift, O(n) 慎用
 > ltrim books 1 -1               # 从第二个开始截取全部: 成功返回OK, O(n) 慎用
 > ltrim books 1 0                # 清空列表: llen books = 0 内存自动回收

3. hash   # 哈希 HashMap 无序字典[内存: 数组+链表二维结构，采用渐进式rehash策略，存储消耗高于单个字符串]
 > hset books java "think in java" # 添加/修改: 字符串如果有空格要用引用
 > hgetall books
 > hget books java
 > hmset books golang "c in go" python "python cookbook"  # 批量添加/修改
 > hmget bokks java golang python
 > hlen books                      # 集合长度: 成功返回1
 > hset books count 3              # 添加: count 计数
 > hincrby books count 1           # 计数: += 1 , hget books count = 4
4. set    # 无序集合 HashSet 无序唯一键值对
 > sadd books java                 # 添加: 返回1
 > sadd books java                 # 重复: 返回0
 > sadd books golang python        # 批量: 返回2
 > smembers books                  # 查询: 返回所有/无序
 > sismember books jaja            # 判断: 存在与否
 > scard books                     # 集合长度: 成功返回3
 > spop books                      # 取值/删除: 弹出一个
5. zset   # 有序集合 SortedSet+HashMap结合 [内存: 跳跃列表，每个value赋予一个score的排序权重]
 > zadd books 9.0 "java"           # 添加: 返回1
 > zadd books 8.8 python           # 添加: 返回1
 > zadd books 8.6 golang           # 添加: 返回1
 > zrange books 0 -1               # 查询: 返回所有 / 按 score 排序
 > zrevrange books 0 -1            # 查询: 返回所有 / 按 score 倒序
 > zrangebyscore books 0 8.9       # 查询: 返回部分 / 区间 score 0 - 8.9
 > zrangebyscore books -inf 8.9 withscores # 查询: 返回部分 / 区间 score -∞(inf无穷大) - 8.9 , withscores(同时返回score)
 > zcard books                     # 集合长度: 成功返回3
 > zscore books "java"             # 查询score: 成功返回9.0
 > zrank books "java"              # 排名: 成功返回0 / 第一名
 > zrem books "java"               # 删除: 成功返回1
---------------------------------------------------------------
 # 以上的list/hash/set/zset是容器型数据结构,它们有通用规则:
 # 1. create if not exists 容器不存在就创建一个再操作 2. drop if no elements 容器中元素没有了释放内存,列表消失
---------------------------------------------------------------
6. stream   # 频道[发送/接收/历史]消息
 > xadd channel1 * create-channel null              # 创建频道channel1,发送空消息create-channel
 > xadd channel1 * message1 "hello world" message2 "my name is stream"  # 创建频道channel1,发送消息message1...
 > xread block 10 streams channel1 1538804450788-0  # 接收消息
 > xrange channel1 1538804450789-0 +                # 历史消息
~~~

~~~
1. 压力测试工具
 > redis-benchmark -t set -P 2 -q # 管道提升性能: 成功返回SET:51975.05 requests per second, 慎用 参数-P越大QPS越高,但可能CPU已100%了.
~~~


