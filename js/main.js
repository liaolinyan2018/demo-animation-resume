var result = `/*面试官你好，我叫xxx
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
  我需要一张白纸
*/
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
#paper > .content{
  background: #feeeed;
  width: 100%;
  height: 100%;
  padding: 8px;
}
`
var result2 = `


`
var result3 = `
/* 接下来把markdown变成HTML-marked.js */


/* 接下来给HTML加样式 */


/* 这就是我会动的简历了*/
/* 谢谢观看 */

`

var md = 
`# 自我介绍

我叫***，19xx年x月出生
现就读于北京**大学，大四
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS3 HTML5 jQuery Ajax JSON

# 项目介绍

1. xxx轮播
2. 简约画板
3. 个人在线简历

# 联系方式

微信 136xxxx0718
手机 136xxxx0718
邮箱 xxx@gmail.com
`

writeCode('',result,() => { //writeCode call function back
  console.log('结束了')
  createPaper(() => {
    console.log('paper准备好了')
    writeCode(result,result2,()=>{
      console.log('纸的样式加好了')
      writeMarkdown(md,()=>{console.log('内容也写好了')})
    })
  }); 
})

function writeMarkdown(markdown,fn){
  let paperContent = paper.querySelector('.content')
  var n = 0
  var id = setInterval(() => {
    n+=1;
    paperContent.innerHTML = markdown.substring(0,n);
    paperContent.scrollTop = paperContent.scrollHeight  //每写一句代码，paperContent元素向上滚动最大幅度
    if(n>=markdown.length){
      window.clearInterval(id)
      fn.call()
    }
  },30)

}

/*把code写到#code 和 #styleTag标签 里*/
function writeCode(prefix,code,fn){
  var codeDom = document.querySelector('#code')
  var n = 0
  var id = setInterval(() => {
    n+=1;
    codeDom.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css, 'css');
    styleTag.innerHTML = prefix + code.substring(0,n)
    codeDom.scrollTop = codeDom.scrollHeight  //每写一句代码，codeDom元素向上滚动最大幅度
    //console.log(codeDom.scrollTop)
    if(n>=code.length){
      window.clearInterval(id)
      fn.call()
    }
  },30)
}

/*造一张白纸*/
function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}
