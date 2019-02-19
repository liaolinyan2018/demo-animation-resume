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
  font-size:16px;
}
#code{
  border:1px solid white;
  padding:16px;
}

/*我需要一点代码高亮*/

.token.comment{
  color:slategray;
}
.token.selector{
  color:#690;
}
.token.punctuation{
  color:#999;
}
.token.property{
  color:#905;
}
.token.function{
  color:#DD4A68;
}
/*加点3D效果*/
#code{
  transform: rotate(360deg)
}
/*不玩了，我来介绍一下自己吧
  我需要一张白纸
*/
`
var n = 0
var id = setInterval(() => {
  n+=1
  code.innerHTML = result.substring(0,n)
  code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
  styleTag.innerHTML = result.substring(0,n)

  if(n>=result.length){
    window.clearInterval(id)
    fn2()
    fn3(result)
  }
},10)

function fn2(){
  var paper = document.createElement('div')
  console.log(paper)
  paper.id = 'paper'
  document.body.appendChild(paper)
}

function fn3(preResult){
  var result = 
`#paper{
  width:200px;
  height:400px;
  background: white;
}`
  var n = 0
  var id = setInterval(() => {
    n+=1
    code.innerHTML = preResult + result.substring(0,n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
    styleTag.innerHTML = preResult + result.substring(0,n)

    if(n>=result.length){
      window.clearInterval(id)
    }
},10)

}