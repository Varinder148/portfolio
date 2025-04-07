(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{411:()=>{},4327:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let n={reactStrictMode:!0,images:{loader:"custom",loaderFile:"./imgLoader.ts"},assetPrefix:"/portfolio/",basePath:"/portfolio",output:"export"};var s=r(1807),l=r.n(s);function a(e){let{src:t}=e,{basePath:r}=n;return r&&l().isAbsolute(t)?"".concat(r).concat(t):t}},5380:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>_});var n=r(5155),s=r(2115),l=r(802);let a={RED:"#CC2936",IVORY:" #F6F7EB"};var o=r(2596),i=r(9197);let c=()=>{let e=(0,s.useRef)(null),t=(0,s.useRef)(null),r=(0,s.useRef)(null),c=(0,s.useRef)(null),{isTouchDevice:d}=(0,i.T)(),[u,h]=(0,s.useState)(!1);return((0,s.useEffect)(()=>{if(d)return;let n=n=>{var s,o,i;let{clientX:d,clientY:h}=n,{innerWidth:m,innerHeight:x}=window;if(t.current&&(t.current.kill(),null==c||null===(s=c.current)||void 0===s||s.kill()),d>=0&&d<=m&&h>=0&&h<=x){let n=null===(o=e.current)||void 0===o?void 0:o.getBoundingClientRect(),s=null===(i=r.current)||void 0===i?void 0:i.getBoundingClientRect();if(n&&s){let o=(s.width-n.width)/2,i=(s.height-n.height)/2;t.current=l.Ay.to(e.current,{x:d,y:h,scale:u?3:1,backgroundColor:u?a.IVORY:a.RED,display:"block",duration:.1,ease:"power3.out"}),c.current=l.Ay.to(r.current,{x:d-o,y:h-i,display:"block",duration:.7,ease:"power3.out"})}}else t.current=l.Ay.to(e.current,{display:"none"}),c.current=l.Ay.to(r.current,{display:"none"})},s=()=>h(!0),o=()=>h(!1),i=document.querySelectorAll('a, button, [role="button"]');return i.forEach(e=>{e.addEventListener("mouseenter",s),e.addEventListener("mouseleave",o)}),window.addEventListener("mousemove",n),()=>{window.removeEventListener("mousemove",n),i.forEach(e=>{e.removeEventListener("mouseenter",s),e.removeEventListener("mouseleave",o)}),t.current&&t.current.kill()}},[u,d]),d)?null:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{ref:e,className:"fixed top-0 left-0 w-5 h-5 opacity-50 rounded-full pointer-events-none z-1000 hidden ".concat(u?"bg-theme-red":"bg-theme-white")}),(0,n.jsx)("div",{ref:r,className:(0,o.A)("fixed top-0 left-0 w-15 h-15 border-2 border-theme-gray rounded-full pointer-events-none z-1000 hidden ",{invisible:u})})]})},d=e=>{let{className:t="",fill:r="",id:s=""}=e;return(0,n.jsx)("svg",{width:"585",height:"585",viewBox:"0 0 585 585",className:t,xmlns:"http://www.w3.org/2000/svg",id:s,children:(0,n.jsx)("circle",{cx:"292.5",cy:"292.5",r:"292.5",className:r})})};var u=r(6766);let h={About:"home",Experience:"experience",Skills:"skills",Contact:"contact"},m=[{name:"About",anchor:h.About,index:0},{name:"Experience",anchor:h.Experience,index:1},{name:"Skills",anchor:h.Skills,index:2},{name:"Contact Info",anchor:h.Contact,index:4}],x=()=>{let e=l.Ay.timeline().to("#compass",{rotate:45,duration:.4,ease:"power2.out"}).to("#compass",{rotate:-45,duration:.3,ease:"power2.inOut"}).to("#compass",{rotate:0,duration:.5,ease:"elastic.out(1, 0.3)"});return()=>e.kill()},p=e=>{let t=l.Ay.timeline();return t.set("#list",{top:0,right:0,position:"fixed",zIndex:30}),e?t.to("#list",{scale:0,transformOrigin:"top right",duration:.3,ease:"back.in"}):t.to("#list",{scale:1,transformOrigin:"top right",duration:.3,ease:"back.out"}),()=>t.kill()},f=e=>{let{className:t="",refs:r,setActiveTab:l,activeTab:a}=e,[c,h]=(0,s.useState)(!1),{isMobile:f}=(0,i.T)(),g=180/m.length,v=()=>{h(e=>!e),p(c)},b=e=>{var t;l(e),x(),null===(t=r.current[e])||void 0===t||t.scrollIntoView({behavior:"smooth"}),v()};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{onClick:v,className:(0,o.A)("fixed top-5 right-5 md:top-10 md:right-10 w-15 h-15 md:w-20 md:h-20 bg-theme-ivory rounded-full shadow-theme-spread-lg  shadow-theme-red  grid place-content-center border-2 border-theme-black cursor-pointer z-20",{hidden:c}),children:(0,n.jsx)(u.default,{src:"/compass.svg",alt:"compass",id:"compass",width:f?25:50,height:f?25:50})}),(0,n.jsxs)("div",{id:"list",className:"fixed top-0 right-0 z-30 scale-0",children:[(0,n.jsx)("button",{onClick:v,className:(0,o.A)("min-h-screen w-screen  -z-1 fixed top-0 right-0",{hidden:!c}),id:"layout"}),(0,n.jsx)(d,{fill:"fill-theme-ivory ",className:"h-[1000px] w-[1000px] md:h-[1500px] md:w-[1500px]  top-0 right-0   -translate-y-1/2 translate-x-1/2  border-4 border-theme-black  rounded-full shadow-2xl shadow-theme-black "}),(0,n.jsxs)("nav",{className:"rounded-full absolute flex items-center justify-center right-[100px] top-[100px]  md:right-[200px] md:top-[200px] z-40 scale-70 md:scale-100 ".concat(t),children:[(0,n.jsx)(u.default,{src:"/compass.svg",alt:"compass",id:"compass",width:150,height:150,className:"bg-none "}),(0,n.jsx)("ul",{children:m.map((e,t)=>{var r;let s=270+g*t-((null===(r=m.find(e=>e.anchor===a))||void 0===r?void 0:r.index)||0)*g;return(0,n.jsx)("li",{className:"absolute top-1/2 left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2  ".concat(a===e.anchor?"text-theme-red text-2xl":"text-theme-black hover:text-theme-red"),style:{transform:"rotate(".concat(s,"deg) translate(").concat(200,"px) rotate(").concat(-1*s,"deg)")},children:(0,n.jsx)("button",{onClick:()=>b(e.anchor),children:e.name})},t)})})]})]})]})};var g=r(9088);l.Ay.registerPlugin(g.A);let v=e=>{let{triggerClass:t,children:r}=e,a=(0,s.useRef)(null);return(0,s.useEffect)(()=>{a.current&&l.Ay.to(a.current,{xPercent:-100,ease:"none",scrollTrigger:{trigger:".".concat(t),start:"top top",end:"+=100%",pin:!0,pinSpacing:!0,scrub:.2}})},[t]),(0,n.jsx)("div",{className:"h-screen overflow-x-hidden no-scrollbar w-full flex items-center ".concat(t),children:(0,n.jsx)("h1",{ref:a,className:"text-[clamp(6rem,10vw,12rem)] items-center whitespace-nowrap  font-luckiest-guy",children:r})})};var b=r(9676);let w=e=>{let t=Math.floor(e/31536e6),r=Math.floor((e-=31536e6*t)/2592e6),n=Math.floor((e-=2592e6*r)/864e5),s=Math.floor((e-=864e5*n)/36e5),l=Math.floor((e-=36e5*s)/6e4),a=Math.floor((e-=6e4*l)/1e3),o=s.toString().padStart(2,"0"),i=l.toString().padStart(2,"0"),c=a.toString().padStart(2,"0");return"".concat(t," years ").concat(r," months ").concat(n," days ").concat(o,":").concat(i,":").concat(c)},j=(0,s.memo)(()=>{let[e,t]=(0,s.useState)("");return(0,s.useEffect)(()=>{let e=()=>{let e=new Date().getTime();t(w(e-new Date("2019-08-5").getTime()))};console.log("Time updated"),e();let r=setInterval(e,1e3);return()=>clearInterval(r)},[]),(0,n.jsxs)("div",{className:"text-theme-xl md:text-theme-2xl text-theme-gray ",children:[e.split(" ").slice(0,6).join(" "),(0,n.jsx)("br",{}),e.split(" ").slice(6).join(" ")]})}),y=e=>{let{children:t,onClick:r=()=>{},className:a=""}=e,o=(0,s.useRef)(null),i=(0,s.useRef)(null);return(0,n.jsxs)("button",{ref:i,className:"\n        uppercase cursor-pointer rounded-8xl relative overflow-hidden border-2 border-theme-red hover:text-theme-black font-montserrat touch-none px-8 py-2 md:px-15 md:py-5 ".concat(a,"\n      "),onClick:r,onMouseEnter:e=>{let t=e.target.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top;l.os.timeline().to(o.current,{opacity:1,duration:0}).fromTo(o.current,{scale:0,top:n,left:r,boxShadow:"0 0 0 rgba(239, 68, 68, 0)"},{scale:1,duration:.5,ease:"power1.out",boxShadow:"0 0 30px rgba(239, 68, 68, 0.6)"}),l.os.to(i.current,{boxShadow:"0 0 15px rgba(239, 68, 68, 0.8)",duration:.2})},onMouseLeave:e=>{let t=e.target.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top;l.os.to(o.current,{scale:0,top:n,left:r,boxShadow:"0 0 0 rgba(239, 68, 68, 0)",duration:.5,ease:"power1.out"}),l.os.to(i.current,{boxShadow:"0 0 0 rgba(239, 68, 68, 0)",duration:.2})},onTouchStart:e=>{let t=e.touches[0],r=e.target.getBoundingClientRect(),n=t.clientX-r.left,s=t.clientY-r.top;l.os.timeline().to(o.current,{opacity:1,duration:0}).fromTo(o.current,{scale:0,top:s,left:n,boxShadow:"0 0 0 rgba(239, 68, 68, 0)"},{scale:.8,duration:.3,ease:"power1.out",boxShadow:"0 0 20px rgba(239, 68, 68, 0.6)"}),l.os.to(i.current,{boxShadow:"0 0 15px rgba(239, 68, 68, 0.8)",duration:.2})},onTouchEnd:()=>{l.os.to(o.current,{scale:0,boxShadow:"0 0 0 rgba(239, 68, 68, 0)",duration:.3,ease:"power1.out"}),l.os.to(i.current,{boxShadow:"0 0 0 rgba(239, 68, 68, 0)",duration:.2})},children:[(0,n.jsx)("div",{ref:o,className:"bg-theme-red -z-1 absolute rounded-full",style:{width:"1500px",height:"1500px",transform:"translate(-50%, -50%)",opacity:0}}),(0,n.jsx)("span",{className:"relative text-sm md:text-base",children:t})]})};var N=r(6874),k=r.n(N);let S=".neon-effect",A=e=>{let{className:t="",scrollToContact:r}=e,[a,o]=(0,s.useState)(!1),i=".delayed-text",c=(0,s.useRef)(null),d=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=new IntersectionObserver(e=>{let[t]=e;if(!t.isIntersecting){var r;null===(r=c.current)||void 0===r||r.progress(1).kill(),document.querySelectorAll(S).forEach(e=>{e.classList.remove("text-neon-subtle")})}},{threshold:.1});return d.current&&e.observe(d.current),()=>{var t;e.disconnect(),null===(t=c.current)||void 0===t||t.kill()}},[]),(0,b.L)(()=>{if(a)return;let e=l.Ay.timeline({delay:1.3}).from(".spelling-animation",{opacity:0,stagger:.05,duration:.05,ease:"none"}).to("#welcome",{delay:2,textShadow:"none",rotate:-10,duration:.5,ease:"bounce",transformOrigin:"top right"}).to(S,{textShadow:"none"}).to("#welcome",{rotate:-80,duration:2,ease:"bounce",transformOrigin:"top right"}).to("#welcome",{y:2e3,zIndex:-100,delay:.1,opacity:0}).to(i,{opacity:1,yPercent:0,duration:.3,stagger:.2,ease:"back"}).call(()=>{document.querySelectorAll(S).forEach(e=>{e.classList.add("text-neon-subtle")}),o(!0)});return c.current=e,()=>{e.kill()}},[a]),(0,n.jsxs)("section",{ref:d,id:"about",children:[(0,n.jsx)("div",{className:"absolute w-full h-screen inset rounded-b-full bg-mountain -z-50 inset-shadow"}),(0,n.jsx)("div",{className:"absolute w-full h-screen inset opacity-80 bg-theme-black -z-40 "}),(0,n.jsxs)("div",{className:"bg-theme-grainy h-screen relative flex flex-col items-center justify-between pt-10  md:p-20 md:pb-10  ".concat(t),children:[(0,n.jsxs)("div",{className:"flex flex-col w-full items-center",children:[(0,n.jsx)("div",{className:"flex items-center",children:(0,n.jsxs)("h1",{className:"font-luckiest-guy  tracking-widest text-[clamp(5rem,10vw,12rem)] justify-self-center pb-15 relative",children:[(0,n.jsx)("div",{className:"stroke-text absolute   ",children:(0,n.jsx)("span",{className:"flex items-center",children:"HEY!"})}),(0,n.jsx)("div",{id:"welcome",children:(0,n.jsx)("span",{id:"hey",children:"HEY!"})})]})}),(0,n.jsx)("div",{className:"grid grid-cols-1 justify-center items-end ",children:(0,n.jsxs)("div",{className:"text-theme-lg md:text-theme-xl font-montserrat text-center",children:[(0,n.jsxs)("div",{children:["I'm",(0,n.jsx)("span",{className:" text-theme-red pl-2 text-4xl font-luckiest-guy ",id:"name",onMouseEnter:()=>{l.Ay.to("#name",{text:{value:"Software Engineer"}})},onMouseLeave:()=>{l.Ay.to("#name",{text:{value:"Varinder&nbsp;Singh",padSpace:!0,newClass:"text-theme-ivory "}})},children:"Varinder\xa0Singh\xa0"}),(0,n.jsx)("span",{className:"font-noto-color-emoji text-4xl",children:"\uD83D\uDC4B"})]}),(0,n.jsxs)("div",{children:["I have been helping organisations with their"," ",(0,n.jsx)("i",{children:"UI development"})," needs from the past ⌛",(0,n.jsx)(j,{})]})]})})]}),(0,n.jsx)("div",{className:"flex flex-col w-full gap-10 mt-30 ".concat(i.replace(".","")),children:(0,n.jsxs)("div",{className:"flex flex-col md:flex-row justify-center gap-5 px-10",children:[(0,n.jsx)(k(),{href:"./resume.pdf",target:"_blank",download:!0,children:(0,n.jsxs)(y,{className:"md:min-w-[300px] py-5 w-full ",children:["My resume ",(0,n.jsx)("span",{className:"font-noto-color-emoji",children:"\uD83D\uDC54"})]})}),(0,n.jsxs)(y,{className:"md:min-w-[300px] py-5",onClick:()=>null==r?void 0:r(),children:["Contact me ",(0,n.jsx)("span",{className:"font-noto-color-emoji",children:"\uD83E\uDD19"})]})]})})]})]})},C=[{id:1,color:"#000000",image:"./infosys.webp",name:"Infosys",from:"5 Aug, 2019",to:"6 Sep, 2021",position:"Systems Engineer",location:"Chandigarh | India",responsibilities:["Developed serverless web apps with React, enabling data uploads processed by a machine learning model on AWS.","Deployed the app using AWS, utilizing AWS Lambda to manage API endpoints."]},{id:2,color:"#66ff66",image:"./geektrust.webp",name:"Geektrust",from:"8 Sep, 2021",to:"22 Apr, 2022",position:"Applications Developer",location:"Bangalore | India",responsibilities:["Developed serverless web apps with React, enabling data uploads processed by a machine learning model on AWS.","Deployed the app using AWS, utilizing AWS Lambda to manage API endpoints.","Created proof-of-concept solutions tailored to client needs and objectives.","Gathered and analyzed requirements, developed technical specifications, and devised implementation strategies."]},{id:3,color:"#6666ff",image:"./thoughtworks.webp",name:"Thoughtworks",from:"25 Apr, 2022",to:"09 Jun, 2023",position:"UI Developer - Consultant",location:"Gurugram | India",responsibilities:["Developed serverless web apps with React and AWS, enabling data uploads processed by a machine learning model and managed through AWS Lambda API endpoints.","Created proof-of-concept solutions, gathered requirements, and developed technical specifications to meet client needs.","Implemented FormBuilder React apps and micro frontends using Module Federation for scalable architecture.","Adopted new technologies based on project needs, following TDD practices to write clean, reusable components and standardized setups."]},{id:4,color:"#ffff66",image:"./gartner.webp",name:"Gartner",from:"12 Jun, 2023",to:"present",position:"Software Engineer 2",location:"Gurugram | India",responsibilities:["Migrated serverless codebase to a Next.js monorepo for improved development and maintainability.","Contributed to the development of a high-impact application generating the majority of revenue for the business unit.","Led A/B experiments using LaunchDarkly to assess feature performance and deploy high-performing variants.","Utilized Contentful to design and implement dynamic blog pages for easy content management and updates.","Leveraged Datadog and FullStory to monitor and optimize the performance of newly released features."]}],E=e=>{let{data:t}=e;return(0,n.jsx)("ul",{className:"text-overpass text-theme-md with-bullets font-overpass",children:t.responsibilities.map((e,t)=>(0,n.jsx)("li",{children:e},t))})},D=e=>{let{className:t,width:r,height:s}=e;return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-clock ".concat(t),children:[(0,n.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,n.jsx)("polyline",{points:"12 6 12 12 16 14"})]})},L=e=>{let{className:t,width:r,height:s}=e;return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-phone-call ".concat(t),children:[(0,n.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),(0,n.jsx)("circle",{cx:"12",cy:"10",r:"3"})]})},I=e=>{let{data:t}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"flex flex-col items-center",children:[(0,n.jsx)("div",{className:"text-theme-2xl",children:t.position}),(0,n.jsx)("hr",{className:"w-full my-5 shadow-theme-gray shadow-theme-spread-lg text-theme-gray bg-theme-gray h-0.5"})]}),(0,n.jsxs)("div",{className:"flex items-center  gap-10",children:[(0,n.jsx)(D,{height:16,width:16,className:"text-theme-gray"}),t.from,"\xa0-\xa0",t.to]}),(0,n.jsxs)("div",{className:"flex items-center  gap-10",children:[(0,n.jsx)(L,{height:16,className:"text-theme-gray",width:16}),t.location]})]})};r(411);let T=s.memo(e=>{let{data:t,className:r}=e,[a,c]=(0,s.useState)(!1),[d,h]=(0,s.useState)(!1),m=(0,s.useRef)(null),x=(0,s.useRef)(null),p=(0,s.useRef)(null),{isMobile:f}=(0,i.T)();(0,s.useEffect)(()=>{l.Ay.set([x.current,p.current],{backfaceVisibility:"hidden"})},[]);let g=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];d?(l.Ay.to(m.current,{rotationY:0,duration:.6,ease:"power2.inOut",onComplete:()=>{c(!a)}}),h(!1)):(c(e),l.Ay.to(m.current,{rotationY:180,duration:.6,ease:"power2.inOut"}),h(!0))};return(0,n.jsx)("div",{className:"w-screen grid place-items-center p-5 stackingcard pt-25 lg:p-25 h-screen",children:(0,n.jsx)("div",{className:"w-full lg:w-6/7 card-container  h-full ".concat(r),children:(0,n.jsxs)("div",{ref:m,className:" relative card w-full h-full",children:[(0,n.jsxs)("div",{ref:x,className:"card-front bg-theme-black absolute bg-theme w-full h-full rounded-2xl overflow-hidden flex",children:[(0,n.jsxs)("div",{className:(0,o.A)("relative h-full",{"w-1/2":!f,"w-full":f}),children:[(0,n.jsx)("div",{className:"relative w-full h-full",children:(0,n.jsx)(u.default,{src:t.image,alt:"".concat(t.name," office"),fill:!0,className:"object-cover object-center  opacity-50",style:{filter:"grayscale(50%)"}})}),(0,n.jsx)("div",{className:(0,o.A)("absolute  left-1/2 -translate-1/2 text-theme-white text-4xl md:text-6xl font-montserrat text-center",{"top-1/2":!f,"top-1/6":f}),children:t.name})]}),f&&(0,n.jsx)("div",{className:"absolute bottom-10 left-1/2 -translate-x-1/2",children:(0,n.jsx)(y,{className:"min-w-[300px]",onClick:()=>g(!0),children:"Know More"})}),!f&&(0,n.jsxs)("div",{className:"w-1/2 h-full  bg-theme-ivory text-theme-black p-15 flex flex-col justify-between",children:[(0,n.jsx)("div",{children:(0,n.jsx)(I,{data:t})}),(0,n.jsx)(y,{className:"max-w-[300px] self-center relative",onClick:()=>g(),children:"My Duties"})]})]}),(0,n.jsx)("div",{ref:p,className:"card-back absolute w-full h-full bg-theme-ivory text-theme-black rounded-2xl overflow-hidden",children:(0,n.jsxs)("div",{className:"h-full flex flex-col gap-5 p-10",children:[a?(0,n.jsx)(I,{data:t}):(0,n.jsx)(E,{data:t}),(0,n.jsx)(y,{onClick:a?()=>{l.Ay.to(m.current,{rotationY:0,duration:.6,ease:"power2.inOut",onComplete:()=>{c(!1),l.Ay.to(m.current,{rotationY:-180,duration:.6,ease:"power2.inOut"})}})}:()=>g(),className:"self-center mt-auto min-w-[300px]",children:a?"My Duties":"Back"})]})})]})})})}),z=s.memo(()=>{let e=(0,s.useRef)(null),t=(0,s.useRef)(null);return(0,b.L)(()=>{l.Ay.utils.toArray(".stackingcard").forEach((e,t)=>{let r=t%2==1?-1:1;l.Ay.to(e,{scale:()=>.8+.035*t,rotate:()=>2*r,ease:"power2.inOut",scrollTrigger:{trigger:e,start:"top-=".concat(40*t," 0"),end:"top 20%",scrub:1}}),g.u.create({trigger:e,start:"top-=".concat(0*t," 0"),end:"top center",endTrigger:".end-element",pin:!0,pinSpacing:!1,markers:!1,id:"card-".concat(t)})})}),(0,n.jsxs)("div",{ref:e,className:"h-[500vh]",children:[(0,n.jsx)("div",{ref:t,className:"relative",children:C.map(e=>(0,n.jsx)(T,{data:e},e.id))}),(0,n.jsx)("div",{className:"end-element"})]})});var R=r(2283),B=r(5028);let M=e=>{let{className:t,width:r,height:s}=e;return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-linkedin ".concat(t),children:[(0,n.jsx)("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),(0,n.jsx)("rect",{x:"2",y:"9",width:"4",height:"12"}),(0,n.jsx)("circle",{cx:"4",cy:"4",r:"2"})]})},O=e=>{let{className:t,width:r,height:s}=e;return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-mail ".concat(t),children:[(0,n.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,n.jsx)("polyline",{points:"22,6 12,13 2,6"})]})},P=e=>{let{className:t,width:r,height:s}=e;return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-phone-call ".concat(t),children:(0,n.jsx)("path",{d:"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})})},W=e=>{let{label:t,value:r,onChange:l,className:a="",type:o="text",placeholder:i="",validate:c=()=>"",multiline:d=!1,rows:u=7}=e,[h,m]=(0,s.useState)(""),[x,p]=(0,s.useState)(!1),f=e=>{let{value:t}=e.target;l(t),x&&c&&m(c(t))},g=()=>{p(!0)},v=()=>{c&&m(c(r))};return(0,n.jsxs)("div",{className:"mb-4 ".concat(a),children:[(0,n.jsx)("label",{htmlFor:t,className:"block text-sm font-medium text-theme-black",children:t}),d?(0,n.jsx)("textarea",{id:t,value:r,onChange:f,onFocus:g,onBlur:v,placeholder:i,rows:u,className:"mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ".concat(h?"border-red-500":"border-gray-300"," focus:ring-0")}):(0,n.jsx)("input",{type:o,id:t,value:r,onChange:f,onFocus:g,onBlur:v,placeholder:i,className:"mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none ".concat(h?"border-red-500":"border-gray-300"," focus:ring-0")}),h&&x&&(0,n.jsx)("p",{className:"mt-2 text-sm text-red-500",children:h})]})},F=s.memo(e=>{let{pinTriggerContact:t}=e,r="reveal",[a,o]=(0,s.useState)(""),[c,d]=(0,s.useState)(""),[u,h]=(0,s.useState)(""),{isMobile:m}=(0,i.T)();(0,b.L)(()=>{l.Ay.timeline({scrollbindTrigger:{bindTrigger:".".concat(t),start:"top",markers:!0}}).to(".".concat(r),{position:"fixed",top:0,left:0,ease:"power2.out"})});let x=e=>{if((null==e?void 0:e.length)===0)return"This field cannot be empty."},p=e=>{if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e))return"Invalid Email Address"};return(0,n.jsx)("div",{className:"w-screen h-screen font-overpass",id:"education",children:(0,n.jsxs)("div",{className:"relative h-full items-center gap-20 mb-10 px-10 md:gap-10 w-screen flex-col flex lg:flex-row justify-evenly  ".concat(r),children:[(0,n.jsxs)("div",{className:"flex items-center  flex-col pt-15  ",children:[(0,n.jsx)("h1",{className:"text-2xl md:text-3xl text-center text-theme-red font-luckiest-guy mb-5 md:mb-15 ",children:"Let's build awesome things together!"}),(0,n.jsxs)("div",{className:"grid grid-cols-2 gap-5  ",children:[(0,n.jsx)(W,{label:"Email address:",value:a,type:"email",onChange:e=>o(e),validate:p}),(0,n.jsx)(W,{label:"Name:",value:c,onChange:e=>d(e),validate:x}),(0,n.jsx)(W,{label:"Your Message",value:u,className:"col-span-2",onChange:e=>h(e),multiline:!0}),(0,n.jsx)(y,{className:"col-span-2 py-2 px-10 font-semibold mx-auto",onClick:()=>{p(a)||x(c)||console.log("submitted")},children:"Send"})]})]}),(0,n.jsxs)("div",{className:"",children:[(0,n.jsx)("h1",{className:"text-2xl md:text-3xl text-theme-red font-luckiest-guy  lg:mb-15 ",children:"Get in touch with me!"}),(0,n.jsxs)("div",{className:"flex gap-5  justify-self-center py-5 ",children:[(0,n.jsx)(k(),{href:"mailto:varindersingh14.vs@gmail.com",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(O,{width:m?36:60,height:m?36:60,className:"hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"})}),(0,n.jsx)(k(),{href:"https://in.linkedin.com/in/varinder-singh-2317b8150",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(M,{height:m?36:60,width:m?36:60,className:"hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"})}),(0,n.jsx)(k(),{href:"tel:+917696134521",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(P,{height:m?36:60,width:m?36:60,className:"hover:text-theme-red border-2 border-theme-gray text-theme-gray p-2 rounded-lg hover:border-theme-red"})})]})]})]})})}),Y=(0,B.default)(()=>Promise.all([r.e(26),r.e(619),r.e(852)]).then(r.bind(r,4852)),{loadableGenerated:{webpack:()=>[4852]}});function _(){l.Ay.registerPlugin(g.u),l.Ay.registerPlugin(b.L),l.Ay.registerPlugin(R.J);let e="pinTrigger",[t,r]=(0,s.useState)(!1),[a,o]=(0,s.useState)(h.About),d=".loading",u=(0,s.useRef)({[h.About]:null,[h.Experience]:null,[h.Skills]:null,[h.Contact]:null});return(0,b.L)(()=>{l.Ay.to(d,{yPercent:-100,display:"none",delay:.2})}),(0,s.useEffect)(()=>{var e,n;let s=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&!t&&r(!0)})});(null==u?void 0:null===(e=u.current)||void 0===e?void 0:e[h.Skills])&&s.observe(null==u?void 0:null===(n=u.current)||void 0===n?void 0:n[h.Skills])},[]),(0,s.useEffect)(()=>{var e;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&o(e.target.id)})},{threshold:.1});return null===(e=Object.values(null==u?void 0:u.current))||void 0===e||e.forEach(e=>t.observe(e)),()=>{var e;null===(e=Object.values(null==u?void 0:u.current))||void 0===e||e.forEach(e=>t.unobserve(e))}},[]),(0,n.jsxs)(i.k,{children:[(0,n.jsxs)("div",{className:" bg-theme-black bg-theme-grainy font-overpass text-theme-ivory rounded-b-4xl md:rounded-b-8xl relative z-20 ",children:[(0,n.jsx)(c,{}),(0,n.jsx)(f,{refs:u,setActiveTab:o,activeTab:a}),(0,n.jsx)("div",{className:" w-screen h-screen bg-theme-red grid place-items-center absolute z-50 ".concat(d.replace(".","")),children:"Loading..."}),(0,n.jsxs)("div",{className:"flex flex-col gap-15",children:[(0,n.jsx)("div",{className:"w-full col-span-3",ref:e=>{u.current[h.About]=e},id:h.About,children:(0,n.jsx)(A,{scrollToContact:()=>{var e,t;return null===(t=u.current)||void 0===t?void 0:null===(e=t[h.Contact])||void 0===e?void 0:e.scrollIntoView({behavior:"smooth"})}})}),(0,n.jsxs)("div",{className:"w-full col-span-3",ref:e=>{u.current[h.Experience]=e},id:h.Experience,children:[(0,n.jsx)("div",{className:"h-[200vh]",children:(0,n.jsxs)(v,{triggerClass:"experience",children:["Let's begin with the"," ",(0,n.jsx)("span",{className:"italic text-theme-sandy",children:"people"})," \uD83E\uDDD1‍\uD83D\uDCBB\uD83E\uDDD1\uD83C\uDFFB‍\uD83D\uDCBB I have ",(0,n.jsx)("span",{className:"semibold text-theme-gray",children:"Worked"}),"\uD83C\uDFE2 with"]})}),(0,n.jsx)("div",{className:"w-full",children:(0,n.jsx)(z,{})})]}),(0,n.jsxs)("div",{className:"w-screen  ".concat(e),ref:e=>{u.current[h.Skills]=e},id:h.Skills,children:[(0,n.jsx)("div",{className:"h-[200vh]",children:(0,n.jsxs)(v,{triggerClass:"skills",children:["And,"," ",(0,n.jsxs)("span",{className:"text-theme-sandy",children:["'The Technical Skills'"," "]})," ","I gathered over the years",(0,n.jsx)("span",{className:"text-theme-gray"})]})}),(0,n.jsx)("div",{className:"w-screen h-[120vh]",children:t&&(0,n.jsx)(Y,{})})]})]})]}),(0,n.jsx)("div",{ref:e=>{u.current[h.Contact]=e},id:h.Contact,className:"w-screen h-screen",children:(0,n.jsx)(F,{pinTriggerContact:e})})]})}},5860:(e,t,r)=>{Promise.resolve().then(r.bind(r,5380))},9197:(e,t,r)=>{"use strict";r.d(t,{T:()=>o,k:()=>a});var n=r(5155),s=r(2115);let l=(0,s.createContext)(void 0),a=e=>{let{children:t}=e,[r,a]=(0,s.useState)(0),[o,i]=(0,s.useState)(0),[c,d]=(0,s.useState)(!1),[u,h]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let e=()=>{a(window.innerWidth),i(window.innerHeight),d(window.innerWidth<768)};return h("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),(0,n.jsx)(l.Provider,{value:{isMobile:c,isTouchDevice:u,viewportWidth:r,viewportHeight:o},children:t})},o=()=>{let e=(0,s.useContext)(l);if(!e)throw Error("useViewport must be used within a ViewportProvider");return e}}},e=>{var t=t=>e(e.s=t);e.O(0,[41,592,209,441,684,358],()=>t(5860)),_N_E=e.O()}]);