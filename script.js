const signinbut=document.querySelector("#signincard");

signinbut.addEventListener("click",()=>{
    const signincard=document.querySelector(".signup");
    signincard.classList.add("signup-popup");
    const cross=document.querySelector("#close");
    cross.addEventListener("click",()=>{
        signincard.classList.remove("signup-popup");
    });
    const signinbutton=document.querySelector("#signinbut");
    signinbutton.addEventListener("click",()=>{
        signincard.classList.remove("signup-popup");
    });
});
const signedincardd=document.querySelector(".signedin");
const signedinbut=document.querySelector("#signedincard");
signedinbut.addEventListener("click",()=>{
    signedincardd.classList.add("signedin-popup");

});
const cross=document.querySelector("#close2");
    cross.addEventListener("click",()=>{
        signedincardd.classList.remove("signedin-popup");
    });
    const signinnbutton=document.getElementById("signinbut1");
    signinnbutton.addEventListener("click",()=>{
        signedincardd.classList.remove("signedin-popup");
    });
const gts=document.querySelector("#getstarted");
gts.addEventListener("click",()=>{
    const signedincardd=document.querySelector(".signedin");
    signedincardd.classList.add("signedin-popup");
});

const  profilecardd=document.querySelector("#profilecard");
const pinfo=document.querySelector(".profileinfo");
profilecardd.addEventListener("click",()=>{
    pinfo.classList.add("profileinfo-popup");
    const crossthird=document.querySelector("#close3");
    crossthird.addEventListener("click",()=>{
        pinfo.classList.remove("profileinfo-popup");
    });
});

const importancecard=document.querySelector("#impofex-card");
const impofexx=document.querySelector(".impofex");
importancecard.addEventListener("click",()=>{
    impofexx.classList.add("impofex-popup");
    const crossfour=document.querySelector("#close4");
    crossfour.addEventListener("click",()=>{
        impofexx.classList.remove("impofex-popup");
    });
});


const abtcard=document.querySelector("#aboutcard");
const abt=document.querySelector(".about");

abtcard.addEventListener("click",()=>{
    abt.classList.add("about-popup");
    const cross5=document.querySelector("#close5");
    cross5.addEventListener("click",()=>{
        abt.classList.remove("about-popup");
    });
});



