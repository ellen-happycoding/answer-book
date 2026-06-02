# 答案之书发布说明

这个小程序已经是纯静态网站，可以直接发布成一个手机能访问的网址。

## 方案 1：GitHub Pages

适合想要一个长期稳定的免费链接。

1. 在 GitHub 新建一个仓库，比如 `answers-book`。
2. 把当前目录里的所有文件上传到仓库根目录。
3. 进入仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` / `root`
5. 保存后等待几分钟。
6. 公开链接通常会是：
   - `https://你的用户名.github.io/answers-book/`

默认打开中文版 `index.html`。
英文版地址会是：

`https://你的用户名.github.io/answers-book/index-en.html`

## 方案 2：Cloudflare Pages

适合想更快拿到一个 `pages.dev` 链接。

1. 登录 Cloudflare。
2. 进入 `Workers & Pages`。
3. 选择 `Create application` -> `Pages`。
4. 连接 GitHub 仓库，选择这个项目。
5. 构建设置填：
   - `Build command`: `exit 0`
   - `Build output directory`: `/`
6. 部署完成后，你会得到一个：
   - `https://项目名.pages.dev`

## 文件说明

- `index.html`：中文版主页
- `index-en.html`：英文版主页
- `style.css`：共用样式
- `script.js`：中文版逻辑
- `script-en.js`：英文版逻辑

## 手机使用

发布后，直接把网址发到微信或保存到 Safari / Chrome 书签即可。
如果浏览器支持，也可以“添加到主屏幕”，它会更像一个独立小程序。
