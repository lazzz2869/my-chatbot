<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的 AI 学习网站</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; height: 100vh; display: flex; flex-direction: column; }
    
    header { background: #1a1a2e; color: white; padding: 15px 25px; display: flex; align-items: center; gap: 10px; }
    header h1 { font-size: 20px; }
    
    .main-container { display: flex; flex: 1; overflow: hidden; }
    
    .sidebar { width: 220px; background: #16213e; color: white; padding: 20px 0; overflow-y: auto; }
    .sidebar h2 { font-size: 14px; padding: 0 20px 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
    .sidebar button { display: block; width: 100%; padding: 12px 20px; background: none; border: none; color: #ccc; text-align: left; cursor: pointer; font-size: 15px; transition: 0.2s; border-left: 3px solid transparent; }
    .sidebar button:hover { background: #0f3460; color: white; }
    .sidebar button.active { background: #0f3460; color: white; border-left-color: #e94560; }
    
    .content { flex: 1; padding: 30px; overflow-y: auto; background: white; }
    .content h2 { color: #1a1a2e; margin-bottom: 15px; }
    .content h3 { color: #e94560; margin: 20px 0 10px; }
    .content p { line-height: 1.8; color: #333; margin-bottom: 15px; }
    .content pre { background: #1a1a2e; color: #0f0; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 15px 0; font-family: 'Courier New', monospace; }
    .content code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; color: #e94560; }
    .content ul { margin: 10px 0 15px 25px; line-height: 1.8; }

    /* ===== 悬浮聊天机器人 ===== */
    #chat-toggle-btn {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a73e8, #0d47a1);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      z-index: 9998;
    }
    #chat-toggle-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
    #chat-toggle-btn.hidden { display: none; }

    #chat-widget {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 380px;
      height: 560px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      animation: slideUp 0.3s ease-out;
    }
    #chat-widget.open { display: flex; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chat-header {
      padding: 15px 18px;
      background: linear-gradient(135deg, #1a73e8, #0d47a1);
      color: white;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
    }
    .chat-header .title { display: flex; align-items: center; gap: 8px; }
    .chat-header .status { font-size: 11px; background: rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 10px; font-weight: normal; }
    #close-chat-btn { background: none; border: none; color: white; font-size: 22px; cursor: pointer; line-height: 1; }
    #close-chat-btn:hover { opacity: 0.7; }

    #chat-box { flex: 1; overflow-y: auto; padding: 15px; background: #f8f9fa; }
    .message { margin-bottom: 12px; padding: 10px 14px; border-radius: 12px; max-width: 85%; word-wrap: break-word; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }
    .user { background: #1a73e8; color: white; margin-left: auto; border-bottom-right-radius: 2px; }
    .ai { background: #e9ecef; color: #333; margin-right: auto; border-bottom-left-radius: 2px; }

    .chat-input-area { padding: 12px; background: white; border-top: 1px solid #ddd; display: flex; gap: 8px; }
    #user-input { flex: 1; padding: 10px 14px; border: 1px solid #ddd; border-radius: 20px; font-size: 14px; outline: none; }
    #user-input:focus { border-color: #1a73e8; }
    #user-input:disabled { background: #f0f0f0; color: #999; }
    #send-btn { padding: 10px 18px; background: #1a73e8; color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 14px; }
    #send-btn:disabled { background: #aaa; }

    @media (max-width: 500px) {
      #chat-widget { width: calc(100vw - 20px); height: calc(100vh - 100px); bottom: 10px; right: 10px; }
      #chat-toggle-btn { bottom: 15px; right: 15px; }
    }
  </style>
</head>
<body>

<header>
  <h1>📚 我的 AI 学习网站</h1>
</header>

<div class="main-container">

  <div class="sidebar">
    <h2>课程目录</h2>
    <button class="active" onclick="loadLesson('intro', this)">📖 课程介绍</button>
    <button onclick="loadLesson('variables', this)">🔤 变量与数据类型</button>
    <button onclick="loadLesson('functions', this)">⚙️ 函数与逻辑</button>
    <button onclick="loadLesson('practice', this)">✏️ 练习题</button>
  </div>

  <div class="content" id="lesson-content">
    <h2>📖 课程介绍</h2>
    <p>欢迎来到我的学习网站！点击右下角的机器人按钮，就可以向 AI 导师提问。</p>
    <h3>如何使用这个网站？</h3>
    <ul>
      <li>点击左侧目录切换不同章节。</li>
      <li>阅读中间的课程内容。</li>
      <li>点击右下角的圆形机器人按钮，打开 AI 导师聊天窗口。</li>
      <li>AI 会根据当前章节的内容来回答你的问题。</li>
    </ul>
  </div>

</div>

<!-- 悬浮聊天按钮 -->
<button id="chat-toggle-btn" onclick="toggleChat()">🤖</button>

<!-- 悬浮聊天窗口 -->
<div id="chat-widget">
  <div class="chat-header">
    <div class="title">🤖 AI 导师 <span class="status">在线</span></div>
    <button id="close-chat-btn" onclick="toggleChat()">×</button>
  </div>
  <div id="chat-box"></div>
  <div class="chat-input-area">
    <input type="text" id="user-input" placeholder="输入你的问题..." onkeypress="if(event.key==='Enter') sendMessage()">
    <button id="send-btn" onclick="sendMessage()">发送</button>
  </div>
</div>

<script>
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const lessonContent = document.getElementById('lesson-content');
  const chatWidget = document.getElementById('chat-widget');
  const chatToggleBtn = document.getElementById('chat-toggle-btn');

  let currentLesson = "课程介绍";
  let currentLessonContent = "欢迎来到我的学习网站...";

  const lessons = {
    intro: {
      title: "课程介绍",
      html: `
        <h2>📖 课程介绍</h2>
        <p>欢迎来到我的学习网站！点击右下角的机器人按钮，就可以向 AI 导师提问。</p>
        <h3>如何使用这个网站？</h3>
        <ul>
          <li>点击左侧目录切换不同章节。</li>
          <li>阅读中间的课程内容。</li>
          <li>点击右下角的圆形机器人按钮，打开 AI 导师聊天窗口。</li>
        </ul>
      `
    },
    variables: {
      title: "变量与数据类型",
      html: `
        <h2>🔤 变量与数据类型</h2>
        <p><strong>变量</strong>是用来存储数据的容器。在 Python 中，你可以直接给变量赋值，不需要提前声明类型。</p>
        <pre>name = "小明"
age = 18
height = 1.75
is_student = True</pre>
        <h3>常见的数据类型：</h3>
        <ul>
          <li><code>str</code>（字符串）：文本，如 "hello"</li>
          <li><code>int</code>（整数）：如 42</li>
          <li><code>float</code>（浮点数）：如 3.14</li>
          <li><code>bool</code>（布尔值）：True 或 False</li>
        </ul>
      `
    },
    functions: {
      title: "函数与逻辑",
      html: `
        <h2>⚙️ 函数与逻辑</h2>
        <p><strong>函数</strong>是一段可以重复使用的代码块。在 Python 中，用 <code>def</code> 关键字定义函数。</p>
        <pre>def greet(name):
    return f"你好，{name}！"

print(greet("小明"))</pre>
        <h3>条件判断：</h3>
        <pre>if age >= 18:
    print("成年人")
else:
    print("未成年人")</pre>
      `
    },
    practice: {
      title: "练习题",
      html: `
        <h2>✏️ 练习题</h2>
        <p>试试下面这些题目，如果做不出来，可以点击右下角的机器人问 AI 导师。</p>
        <h3>题目 1：</h3>
        <p>写一个函数，接收两个数字，返回它们的和。</p>
        <h3>题目 2：</h3>
        <p>写一个程序，判断一个年份是不是闰年。</p>
        <h3>题目 3：</h3>
        <p>写一个程序，打印 1 到 100 之间的所有偶数。</p>
      `
    }
  };

  function loadLesson(id, btn) {
    const lesson = lessons[id];
    if (!lesson) return;
    
    lessonContent.innerHTML = lesson.html;
    currentLesson = lesson.title;
    currentLessonContent = lesson.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // ===== 悬浮聊天窗口的开关 =====
  function toggleChat() {
    chatWidget.classList.toggle('open');
    chatToggleBtn.classList.toggle('hidden');
    if (chatWidget.classList.contains('open')) {
      userInput.focus();
    }
  }

  let conversationHistory = [];

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    if (sendBtn.disabled) return;

    addMessage(text, 'user');
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;
    sendBtn.textContent = '...';

    const systemPrompt = {
      role: "system",
      content: `You are a patient, friendly AI learning tutor. The student is currently studying the chapter "${currentLesson}".
      Here is the content of this chapter, use it to answer the student's questions:
      ---
      ${currentLessonContent}
      ---
      STRICT RULES (apply to ALL languages, no exceptions):
      1. Always reply in the SAME language as the student's question. If the student asks in Chinese, reply in Chinese. If the student asks in English, reply in English. If the student asks in any other language, reply in that language.
      2. NEVER use emojis in any language. No emojis at all. Use plain text only. This rule applies to Chinese, English, Japanese, Korean, and every other language.
      3. Keep your answers concise (under 200 words) unless the student asks for a detailed explanation.
      4. If the student sends random characters or gibberish, just briefly say you don't understand and ask them to rephrase.`
    };

    const messages = [systemPrompt, ...conversationHistory, { role: "user", content: text }];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.error) {
        addMessage("❌ 错误: " + data.error, 'ai');
      } else {
        const aiReply = data.reply;
        addMessage(aiReply, 'ai');
        conversationHistory.push({ role: "user", content: text });
        conversationHistory.push({ role: "assistant", content: aiReply });
      }

    } catch (error) {
      addMessage("❌ 网络请求失败: " + error.message, 'ai');
    } finally {
      userInput.disabled = false;
      sendBtn.disabled = false;
      sendBtn.textContent = '发送';
      userInput.focus();
    }
  }
</script>

</body>
</html>
