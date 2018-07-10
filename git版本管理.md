
# **[安装git](https://github.com/git-for-windows/git/releases/)**

~~~
Git for Windows: https://github.com/git-for-windows/git/releases/
~~~


# [新建git项目与git发布](http://wangchujiang.com/linux-command/c/git.html)


####  1.新建项目-目录-初始化本地git仓库(1个隐藏的目录.git)

~~~
git init  # -目录-为当前工作区, .git/*[index指add的暂存区数据,objects指commit的本地仓库数据]
git config --global user.name                # 查询全局git用户配置
git config --local user.name "用户名"        # 设置当前项目git用户配置
git config --local user.email "用户邮箱地址"  # 邮箱地址用来注册远程git账号
~~~

####  2.检查git状态(当前工作区：新增文件要add [或添到.gitignore], 变更文件要commit)

~~~
git status #工作区如果干净, 还得查stash中间状态: git stash list 然后还原git stash apply stash@{0} 最后commit
~~~

####  3.新建文件(-目录-cmd: 新建mkdir, 打开cd, 删除rd /s/q [目录名])

~~~
echo hello-git > octocat.txt
~~~

####  4.添加跟踪的文件到暂存区(也表示添加了文件快照, 批量添加用git add '*.txt')

~~~
git add octocat.txt
~~~

####  5.检查git状态 > [当前分支]变更或新增并未commit, 但是要换分支处理hot-bug, 只能先保存stash中间状态git stash

~~~
git status 或 git stash & git checkout [现有分支] ... 或 git checkout master & git checkout -b [新建分支] ...
~~~

####  6.提交到本地git仓库(添加了文件版本 -m备注, -am添加变更文件和备注)

~~~
git commit -m "Add cute octocat story"
~~~

####  7.提交所有更改到本地git仓库(-a可处理冲突)

~~~
git commit -am '功能#01完成'
~~~

####  8.查看本地git仓库当前分支的提交记录

~~~
git log
~~~

####  9.准备远程git仓库(##代表git账号: ***@mail.com)

~~~
 1)ssh-key的生成(Git-Bash密码为空): ssh-keygen -t rsa -C "##" , 默认生成到.ssh目录: id_rsa[密钥], id_rsa.pub[公钥]
 2)##注册到bitbucket.org、github.com，或者自建Git-Server: gogs、Bonobo,  然后上传公钥并检查: ssh git@bitbucket.org
 3)##登陆后, 新建1个空的git仓库***
 4)在以上1-8准备的本地git仓库的目录中执行(添加远程仓库):
    方式一：git remote add origin git@bitbucket.org:##/***.git
    方式二：git remote add origin https://github.com/##/***.git
    方式三：git clone git@bitbucket.org:##/***.git  # clone方式指没有1-8准备的本地git仓库
 5)准备好本地git仓库, 下一步进行推送(远程仓库名origin)
~~~

####  10.准备好本地git仓库后, 推送到远程git仓库(第一次推送时,会在远程新建origin/master分支)

~~~
方式一：git push -u [远程仓库名origin] [本地要推送的分支名] # 第一次加-u建立追踪, 让git status可显示本地和远程的不同
方式二：git push -u [远程仓库名origin] --all # 推送本地仓库的所有分支，以后可简写：git push [--all]
git push -u origin master # 远程有更新推送失败时(远程分支保护): 1.先获取git fetch origin处理完再push;2.强制推送git push -f origin master
~~~

####  11.查看远程仓库信息、远程分支与本地建立跟踪关联(远程分支tracked跟踪后可直接用git push|pull)

~~~
git remote show [远程仓库名origin] # 远程仓库的查询 git remote -v
git remote rm [远程仓库名origin] # 远程仓库的删除
git remote rename [远程仓库名origin] [远程仓库名origin2] # 远程仓库重命名
git branch --set-upstream [本地已有分支master] [远程仓库名origin/已有分支master] # 建立跟踪关联
git checkout -b [本地新建分支test] [远程仓库名origin/已有分支test] # 建立跟踪关联(表示跟踪远程分支)
~~~

####  12.获取远程origin仓库master分支所有的变更(最新代码),并下载同步到本地git仓库master

~~~
git pull origin master
git pull --all # 获取远程git仓库所有分支的变更
~~~

####  13.比较远程文件与本地文件,哪些文件变化了

~~~
git diff HEAD
~~~

####  14.当文件变化或冲突时(git add解决冲突)

~~~
git add octofamily/octodog.txt
~~~

####  15.比较暂存区文件版本

~~~
git diff --staged
~~~

####  16.重置暂存区文件版本

~~~
git reset octofamily/octodog.txt
~~~

####  17.签出文件(完成修改后可添加至新的分支)

~~~
git checkout -- octocat.txt
~~~

####  18.新建分支(-c -C 拷贝)

~~~
git branch clean_up
~~~

####  19.切换分支(签出新的分支)

~~~
git checkout clean_up
~~~

####  20.删除不要的文件

~~~
git rm '*.txt'
git rm -f *  # 强制移除
~~~

####  21.提交到本地git仓库的当前分支

~~~
git commit -m "Remove all the cats"
~~~

####  22.切换分支

~~~
git checkout master
git checkout -b [新建分支]
~~~

####  23.合并其他分支(当前不是分支clean_up)

~~~
git merge clean_up        # 合并本地分支
git merge origin/clean_up # 合并远程分支
~~~

####  24.删除其他分支(当前是主分支master)

~~~
git branch -d clean_up
git remote rm [远程仓库名origin]/[分支clean_up]
~~~

####  25.加标签-(版本号)

~~~
git tag -a v0.1.3 -m "Release Version 0.1.3" # -a 添加, -d 删除
git push --tags origin                 # 推送本地仓库的标签到远程仓库origin
git push origin :refs/tags/[tag-name]  # 删除远程标签
~~~

####  26.最后发布

~~~
git push --all         # 推送本地仓库的所有分支
git push origin master # 推送本地仓库的主分支master到远程仓库origin
~~~

