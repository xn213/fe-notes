# python + itchat

## 安装 python
首先，根据你的Windows版本（64位还是32位）从Python的官方网站下载Python 3.7对应的[64位安装程序](https://www.python.org/ftp/python/3.7.0/python-3.7.0-amd64.exe)或[32位安装程序](https://www.python.org/ftp/python/3.7.0/python-3.7.0.exe)，然后，运行下载的EXE安装包：

![install-py35](https://www.liaoxuefeng.com/files/attachments/1048401552601344/l)

特别要注意勾上`Add Python 3.7 to PATH`，然后点“Install Now”即可完成安装。

### 运行Python

安装成功后，打开命令提示符窗口，敲入python后，会出现两种情况：

情况一：

```language-ascii
┌────────────────────────────────────────────────────────┐
│Command Prompt                                    - □ x │
├────────────────────────────────────────────────────────┤
│Microsoft Windows [Version 10.0.0]                      │
│(c) 2015 Microsoft Corporation. All rights reserved.    │
│                                                        │
│C:\> python                                             │
│Python 3.7.x ...                                        │
│[MSC v... 64 bit (AMD64)] on win32                      │
│Type "help", "copyright", "credits" or "license" for mor│
│information.                                            │
│>>> _                                                   │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

看到上面的画面，就说明Python安装成功！

你看到提示符 `>>>` 就表示我们已经在 `Python` 交互式环境中了，可以输入任何 `Python` 代码，回车后会立刻得到执行结果。现在，输入 `exit()` 并回车，就可以退出 `Python` 交互式环境（直接关掉命令行窗口也可以）。

情况二：得到一个错误：

```language-ascii
┌────────────────────────────────────────────────────────┐
│Command Prompt                                    - □ x │
├────────────────────────────────────────────────────────┤
│Microsoft Windows [Version 10.0.0]                      │
│(c) 2015 Microsoft Corporation. All rights reserved.    │
│                                                        │
│C:\> python                                             │
│'python' is not recognized as an internal or external co│
│mmand, operable program or batch file.                  │
│                                                        │
│C:\> _                                                  │
│                                                        │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

这是因为Windows会根据一个`Path`的环境变量设定的路径去查找`python.exe`，如果没找到，就会报错。如果在安装时漏掉了勾选`Add Python 3.7 to PATH`，那就要手动把`python.exe`所在的路径添加到Path中。

如果你不知道怎么修改环境变量，建议把Python安装程序重新运行一遍，务必记得勾上`Add Python 3.7 to PATH`。

```python
# first.py
import itchat # 导入 itchat 模块
import random # 导入随机数函数

itchat.auto_login(hotReload=True) # 获取微信登录二维码(微信网页版)

friend_list = itchat.get_friends(update=True) # 获取微信好友列表信息
name = itchat.search_friends(name=u'娇娇') # 查找备注名为娇娇的好友信息
JiaoJiao = name[0]['UserName'] # 获取用于发送消息的好友UserName,一串以@开头的字母数字

message_list = [u'hello, 娇娇', u'加油', u'学习', u'bye~'] # 消息列表
message_concent = random.sample(message_list,1)[0] # 获取随机消息字符串
itchat.send(message_concent,JiaoJiao) # 发送
```

# 【itchat】用Python玩耍微信

### 【itchat】

itchat是个基于网页版微信的python微信API。功能目前做到基本可以满足正常的消息收发，信息的获取等等。不过对于红包之类网页版微信不支持的功能，这个模块自然也就无法支持了。

■　　安装与基本使用

安装就用pip就可以了。

基本使用：

首先进行登录，登出和发送消息，获取好友信息等等简单操作。

```python
import itchat
def find_friend(nick_name):
  for friend in itchat.get_friends():
    if friend['NickName'] == nick_name:
      return frienddef main():
  itchat.auto_login(True)
  friend = find_friend(u'spiritual')
  username = friend['UserName']
  itchat.send(msg=u'你好啊',toUserName=username)
  itchat.logout()
if __name__ == "__main__":
  main()
```

按照代码逻辑，首先调用的是auto_login方法，这个方法就可以视为是登录方法，初次调用此方法时itchat会自动生成一个二维码并且显示出来让你扫二维码确认登录。至于其auto不auto在于参数有没有True。当参数为True的时候，意思是说保持热登录状态，初次登录后会把登录的一些信息保存在同目录下的itchat.pkl文件中，即使这次程序运行结束，下次在同目录下再次调用这个方法的时候可以不用再扫二维码登录了。根据网页版微信的登录机制，这种保持是有时限的，隔一段时间后就要重新登录。

find_friend方法接受一个用户昵称，然后调用了get_friends方法，这个方法放回的是一个当前用户所有好友组成的列表。一个好友可以视为一个字典结构，有UserName，NickName，Province，City，Sex等等字段的信息。需要注意的是UserName这个字段是处理过的，不是微信ID。而且这个UserName会根据每次登录而变化，所以对于程序而言，最好是能动态地获取这个信息，然后作为参数被其他函数调用。

send方法是笼统的发送消息的方法。指定msg为普通字符串时发送普通文本信息，toUserName就用到了刚才解析出的UserName的值。

logout自然就是登出了。因为设置了True，所以这里登不登出无所谓了，反正下次都是自动登录了。如果toUserName没有指出或为None，那么就发送给自己。

●  通过send方法发送其他类型的信息

如果想通过send方法发送一些其他类型的信息比如文件、图片、视频等，可以另msg等于一个有格式的字符串：

发送文件： msg='@fil@path_to_file'

发送图片：msg='@img@path_to_img'

发送视频：msg='@vid@path_to_vid'

这样就可以把程序所在计算机上的一些资源通过微信发送出去了。

send方法返回True或False来提示发送成功或失败，除了send，还有send_msg，send_image等一些经过一些包装的方法，这里就不多说了。

■　　注册消息

上面说的都是由本用户发送消息给其他用户，其实itchat还可以监听别人发给本用户的消息并根据消息做出一些反应。结合上面的send等方法就可以实现自动回复了。监听的具体实现就是通过装饰器来注册消息。比如：

```python
@itchat.msg_register(itchat.content.TEXT)def simple_reply(recv_msg):
    msg = recv_msg['Text']
    if msg == 'name':
        itchat.send(msg=u'我的名字是Takanashi',toUserName=recv_msg['FromUserName'])
    elif msg == 'age':
        itchat.send(msg=u'我今年10岁了',toUserName=recv_msg['FromUserName'])  

itchat.run()
```

这个注册方法就监听了所有普通文本类型的消息，当消息是name或age的时候就返回相关的信息。注意这个注册函数接受的参数recv_msg不是单纯的文本而也是一个字典类型的结构。

最后别忘了调用itchat.run来启动自动回复。

\*当对同一种类型的消息进行了多次注册的话那么以最后一次注册情况为准。

●  带参数注册

再来深入看下msg_register这个装饰器。上面使用的时候添加了一个参数itchat.content.TEXT，这是指出了注册在这个装饰器下的函数是用于处理文本类型消息的。

除了TEXT这个类型以外，还可以用以下的类型来标识发送过来的信息，从而实现对不同类别的信息作出不同类别的反应。

MAP 　　地理位置的分享

CARD　　名片信息

SHARING　　链接分享

PICTURE　　表情或照片

RECORDING　　语音

ATTACHMENT　　附件

VIDEO　　视频

FRIENDS　　加好友申请，也就是说发起的一个好友申请其实是一条特殊的信息

SYSTEM　　系统消息，比如系统推送消息或者是某个群成员发生变动等等

NOTE　　通知文本，比如撤回了消息等等

对于非文本类型的信息，在注册的响应函数中的参数recv_msg结构上和文本信息是类似的。比如下面这个注册的响应函数可以自动把所有发过来的附件、语音等类型的信息保存到本地：

```python
@itchat.msg_register([ATTACHMENT,PICTURE,RECORDING,VIDEO])def download_attach(recv_msg):
    recv_msg['Text'](recv_msg['FileName'])
    itchat.send(msg='Received Your Message',toUserName=recv_msg['FromUserName'])
```

从中可以看出，文本信息的msg['Text']值是一段文本，而这些类型信息的msg['Text']的值却是一个函数，这个函数的作用就是接受一个本地的文件路径然后把目标文件保存在这个路径上，换言之就是下载了这个文件。

在想要进行某种类型的信息进行注册响应函数的时候，可以先实验性地用发送一条相关类型的信息，捕捉下获取到的Msg对象，逐一分析字段，，然后根据自己的需要进行编程。

再回到msg_register这个装饰器上来，除了第一个参数，我们还可以添加一些其他参数比如isGroupChat=True就表示注册的响应函数只响应来自群聊的信息。此时的recv_msg对象中会有isAt这个Key，当其值为True时表明在这条消息中我被@了。与之相对的还有isFriendChat应该是表明消息来自一般的好友聊天。比如下面这段代码可以将好友推荐过来的名片自动加好友：

```python
@itchat.msg_register(CARD)def add_friend(msg):
    print msg['Text']
    print msg['Content']
    itchat.add_friend(userName=msg['Text']['UserName'])
    print msg['RecommendInfo']
    print msg['RecommendInfo']['UserName']
```

■　　账号类方法

刚才上面也已经用过了get_friends这个方法。其实类似的跟好友、账号相关的方法还有一些：

get_friends　　返回所有好友组成的列表，第一个是自己，此外还能传入update=True参数用于获取更新后的列表。

search_friends　　这个方法的参数是多种多样的。如果是空参，那么返回自己的信息。如果有参数userName那么就是用户对象中userName字段的值作为查询的依据。如果name=xxx是根据我们对好友的备注来找人，wechatAccount=xxx则是根据微信ID来找人

update_friend　　有时候好友更新了资料比如头像，我们是无法第一时间知道的，这个方法就是手动触发更新资料的操作。参数可以传入一个userName的值或者一些值的列表来更新一个或一些用户的信息

get_mps　　返回关注的全部公众号列表

search_mps　　公众号也是有UserName这个属性的，所以可以通过UserName来选择返回特定的一个公众号的信息

■　　群聊类方法

get_chatrooms　　返回所有群聊的列表，可以加参数update=True，此时手动更新信息并且返回在通讯录中保存过的群聊列表的信息。

要获取群聊信息时，有一点比较Tricky的是群聊列表的信息并不是和账户直接相关，而是每次登录的时候进行动态加载的，这就使得利用API来获取群聊列表的时候有时候会失灵。为了正确地获取群聊列表，应该即使没有需要时也要保证itchat.run()的运行。假如一定不想运行这个run的话可以在程序结束前调用itchat.dump_login_status()方法来更新热插拔时itchat所需要的登录状态。

search_chatroom　　搜寻特定的群聊信息。群聊同样有UserName这个字段的信息用于特定一个群聊用。

update_chatroom　　更新群聊信息