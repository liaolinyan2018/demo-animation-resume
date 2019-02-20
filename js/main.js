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
var result2 = 
`#paper{
  width:200px;
  height:400px;
  background: white;
}`

writeCode('',result,() => { //writeCode call function back
  console.log('结束了')
  createPaper(() => {
    console.log('paper有了')
    writeCode(result,result2,()=>{
      console.log('到此暂时结束')
    })
    
  }); 
})

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
  },10)
}
function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  document.body.appendChild(paper)
  fn.call()
}
