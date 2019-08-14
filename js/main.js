const result = `/*面试官你好，我叫xxx
    用文字介绍自己太单调了
    我将用动画的形式来介绍自己
    就用代码来介绍自己吧
    首先写一些基本样式
*/
  
*{
    transition: all 1s;
}
html{
  background: rgb(63, 82, 99);
  font-size: 16px;
}
#code{
  border: 1px solid white;
  padding: 16px;
}

/*我需要一点代码高亮*/

.token.comment{
  color: slategray;
}
.token.selector{
  color: #690;
}
.token.punctuation{
  color: #999;
}
.token.property{
  color: #905;
}
.token.function{
  color: #DD4A68;
}
/*加点3D效果*/
#code{
  transform: rotate(360deg)
}
/*不玩了，我来介绍一下自己吧
  我需要一张纸
*/
`
const result2 = `
#code{
  position: fixed;
  left: 0;
  height: 100%;
  width: 50%;
}
#paper{
  background: #f8aba6;
  position: fixed;
  right: 0;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}
#paper > .paperContent{
  background: #feeeed;
  width: 100%;
  height: 100%;
  padding: 8px;
}

/* 这样我就能在纸上写字啦，请看右边 */
`
const result3 = `
/* 接下来把markdown变成HTML */
`
const result4 = `
/* 接下来给HTML加样式 */
`
const result5 = `
/* 这就是我会动的简历了*/
/* 谢谢观看 */
`

const md =
  `# 自我介绍

我叫xxx，19xx年x月出生
毕业于北京化工大学, 2019应届
自学前端
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS3 HTML5 Promise DOM Ajax JSON

# 项目介绍

1.苹果风格轮播
2.简约画板
3.个人在线简历

# 联系方式

微信 136xxxx0718
手机 136xxxx0718
邮箱 xxx@gmail.com
`

// 主业务逻辑
writeCode('', result)
  .then((data) => {
    console.log(data)
    return createPaper()
  })
  .then((data) => {
    console.log(data)
    return writeCode(result, result2)
  })
  .then((data) => {
    console.log(data)
    return writeMarkdown(md)
  })
  .then((data) => {
    console.log(data)
    return writeCode(result + result2, result3)
  })
  .then((data) => {
    console.log(data)
    return markdownToHtml()
  })
  .then((data) => {
    console.log(data)
    return writeCode(result + result2 + result3, result5)
  })
  .then((data) => {
    console.log(data)
    console.log('简历完成')
  })


// 功能函数封装，带Promise功能

function writeMarkdown(markdown) {
  console.log('开始写简历内容')
  return new Promise((resolve, reject) => {
    const paperContent = _$('.paperContent')
    let n = 0
    const id = setInterval(() => {
      n += 1
      paperContent.innerHTML = markdown.substring(0, n)
      paperContent.scrollTop = paperContent.scrollHeight  //每写一句代码，paperContent元素向上滚动最大幅度
      if (n >= markdown.length) {
        window.clearInterval(id)
        resolve('简历内容也写好了')
      }
    }, 10)
  })
}

/*将markdown转为html*/
function markdownToHtml() {
  console.log('开始将md格式转为html')
  return new Promise((resolve, reject) => {
    const paperContent = _$('.paperContent')
    let n = 0
    const id = setInterval(() => {
      n += 1;
      paperContent.innerHTML = marked(md).substring(0, n);
      paperContent.scrollTop = paperContent.scrollHeight  //每写一句代码，paperContent元素向上滚动最大幅度
      if (n >= marked(md).length) {
        window.clearInterval(id)
        resolve('md格式转为html结束')
      }
    }, 5)
  })
}

/*把code写到#code 和 #styleTag标签 里，20ms添加一个字*/
function writeCode(prefix, code) {
  console.log('writeCode begin')
  return new Promise((resolve, reject) => {
    const codeDom = _$('#code')
    let n = 0
    const id = setInterval(() => {
      n += 1;
      codeDom.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
      styleTag.innerHTML = prefix + code.substring(0, n)
      codeDom.scrollTop = codeDom.scrollHeight  //每写一句代码，codeDom元素向上滚动最大幅度
      //console.log(codeDom.scrollTop)
      console.log('刚刚添加了一个字')
      if (n >= code.length) {
        window.clearInterval(id)
        resolve('writeCode end')
      }
    }, 5)
  })
}

/*造纸*/
function createPaper() {
  console.log('开始造纸')
  return new Promise((resolve, reject) => {
    const paper = createElement('div')
    paper.id = 'paper'
    const content = createElement('pre')
    content.className = 'paperContent'
    appendChild(paper, content)
    appendChild(document.body, paper)
    resolve('paper造好了')
  })
}

// 工具函数封装
function _$(selector) {
  return document.querySelector(selector)
}
function createElement(selector) {
  return document.createElement(selector)
}
function appendChild(fatherElement, sonElement) {
  return fatherElement.appendChild(sonElement)
}
