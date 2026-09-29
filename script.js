// ========== 星空画布动画 ==========
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let stars = [];

class Star{
    constructor(){
        this.x = Math.random()*w;
        this.y = Math.random()*h;
        this.r = Math.random()*1.2+0.2;
        this.speed = Math.random()*0.008+0.002;
        this.opacity = Math.random();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(220, 230, 255, ${this.opacity})`;
        ctx.fill();
    }
    update(){
        this.opacity += Math.sin(Date.now()*this.speed)*0.012;
        if(this.opacity>1) this.opacity=1;
        if(this.opacity<0) this.opacity=0;
    }
}
function initStar(){
    stars=[];
    for(let i=0;i<700;i++) stars.push(new Star());
}
function animate(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(s=>{s.update();s.draw()});
    requestAnimationFrame(animate);
}
initStar();
animate();
window.addEventListener('resize',()=>{
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    initStar();
})

// ========== 密码验证 密钥950614 ==========
const correctPwd = "950614";
const pwdInput = document.getElementById("pwdInput");
const pwdBtn = document.getElementById("pwdBtn");
const tipText = document.getElementById("tipText");
const passwordPage = document.getElementById("passwordPage");
const homePage = document.getElementById("homePage");

pwdBtn.onclick = checkPwd;
pwdInput.addEventListener("keydown",e=>{if(e.key==="Enter") checkPwd()})
function checkPwd(){
    if(pwdInput.value.trim() === correctPwd){
        passwordPage.classList.add("hidden");
        homePage.classList.remove("hidden");
        tipText.textContent="";
    }else{
        tipText.textContent="密钥错误，请重新输入";
    }
}

// ========== 页面导航 ==========
const navBtns = document.querySelectorAll(".nav-btn");
const subpages = document.querySelectorAll(".subpage");
const backBtns = document.querySelectorAll(".back-btn");

navBtns.forEach(btn=>{
    btn.onclick = ()=>{
        const targetId = btn.dataset.target;
        homePage.classList.add("hidden");
        document.getElementById(targetId).classList.remove("hidden");
    }
})
backBtns.forEach(btn=>{
    btn.onclick = ()=>{
        subpages.forEach(p=>p.classList.add("hidden"));
        homePage.classList.remove("hidden");
    }
})

// ========== 图片大图预览 ==========
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");
const galleryImgs = document.querySelectorAll(".gallery-img");

galleryImgs.forEach(img=>{
    img.onclick = ()=>{
        modalImg.src = img.src;
        modal.style.display="flex";
    }
})
closeModal.onclick = ()=> modal.style.display="none";
modal.onclick = e=>{if(e.target===modal) modal.style.display="none"}
