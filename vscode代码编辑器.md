
# **安装 [Visual Studio Code](https://github.com/microsoft/vscode)**

~~~
mac    > https://code.visualstudio.com/docs/setup/mac
linux  > https://code.visualstudio.com/docs/setup/linux
windows> https://code.visualstudio.com/docs/setup/windows
network> https://code.visualstudio.com/docs/setup/network
~~~

##  安装.NET [Install .NET Core SDK](https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial)

####  1.插件扩展 [Extensions for the Visual Studio family of products](https://marketplace.visualstudio.com/vscode)

~~~
> 环境Env
    1. DotNet: C#扩展、Roslyn & OmniSharp、vscode-solution-explorer、.NET Core Test Explorer

> 快捷键Key
    1. 命令: Ctrl + Shift + P
    2. 格式化代码: Shift + Alt + F
    3. 编码时查找方法接口: Ctrl + T

> 同步配置Code
  1. 安装扩展Settings Sync
     > Shift + Alt + U 上传配置 | df0b4d1940b53ff7a7c166e35d68792962e10da2
       1) 获取你的GitHub帐户访问令牌 : New personal access token > code-settings-sync (填写Token描述后选gist)
       2) 按快捷键，它将询问您的GitHub帐户访问令牌 | github.com/settings/tokens
       3) 自动上传您的设置，扩展程序会在系统消息中为您提供私有的GistID (注意保存,用于下载配置和共享给其它电脑使用)
       4) 验证GistID | https://gist.github.com/{YourName}/{GistID}
     > Shift + Alt + D 下载配置
       1) 按快捷键，它将询问您的GistID | 7e32bcc357be6d8149bd4947b119c9b3 | 我的电脑Angenal-PC
       2) 公共的 Gist | 52ABP框架/开发环境/设置同步扩展工具 | 52abp.com
          首先按 F1 进入命令行，然后输入sync ；选择重置设置(保证本地的配置为清空状态)
          选择高级选项；Sync:从公开的 Gist 下载设置；再选择下载设置(F1>sync>“下载设置”)
          输入公共的gist：149022554137a8df48d795eb8b8298ec (重启后开始“下载设置”共计30多个插件)

 ~~~

####  2.帮助文档
  [52ABP框架/开发文档](https://gitee.com/aiabpedu/dashboard/wikis/aiabpedu%2F52abp_framework_programming?doc_id=183193&sort_id=833878)

