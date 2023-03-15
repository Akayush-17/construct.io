var click1=document.getElementById("change1");
var click2=document.getElementById("change2");
var click3=document.getElementById("change3");


click1.style.display="none";
click2.style.display="none";
click3.style.display="none";

document.getElementById("control1").onclick=function(){
    click1.style.display="inline";
    click2.style.display="none";
    click3.style.display="none";
};
document.getElementById("control2").onclick=function(){
    click2.style.display="inline";
    click1.style.display="none";
    click3.style.display="none";
};
document.getElementById("control3").onclick=function(){
    click3.style.display="inline";
    click1.style.display="none";
    click2.style.display="none";
    
};