(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[657],{9555:function(e,n,t){Promise.resolve().then(t.bind(t,2929))},2929:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var i=t(7437),s=t(1669);function r(){return(0,i.jsxs)("div",{className:"min-h-screen bg-[#0A0A0A]",children:[(0,i.jsx)(s.Z,{}),(0,i.jsx)("main",{className:"pt-32 pb-20 px-4",children:(0,i.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,i.jsx)("h1",{className:"text-4xl font-bold mb-8",children:"Allgemeine Gesch\xe4ftsbedingungen"}),(0,i.jsxs)("div",{className:"space-y-8 text-gray-300",children:[(0,i.jsxs)("section",{children:[(0,i.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"1. Geltungsbereich"}),(0,i.jsx)("div",{className:"bg-[#0A0A0A] p-6 rounded-lg border border-[#C8A97E]/10 space-y-4",children:(0,i.jsx)("p",{children:'Diese Allgemeinen Gesch\xe4ftsbedingungen gelten f\xfcr alle Vertr\xe4ge \xfcber Gesangsunterricht zwischen Melanie Wainwright (nachfolgend "Lehrerin") und dem Sch\xfcler.'})})]}),(0,i.jsxs)("section",{children:[(0,i.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"2. Unterrichtszeiten und -ort"}),(0,i.jsx)("div",{className:"bg-[#0A0A0A] p-6 rounded-lg border border-[#C8A97E]/10 space-y-4",children:(0,i.jsx)("p",{children:"Der Unterricht findet zu den vereinbarten Zeiten statt. Bei Verhinderung ist eine Absage mindestens 24 Stunden vor dem Termin erforderlich."})})]}),(0,i.jsxs)("section",{children:[(0,i.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"3. Honorar und Zahlungsbedingungen"}),(0,i.jsx)("div",{className:"bg-[#0A0A0A] p-6 rounded-lg border border-[#C8A97E]/10 space-y-4",children:(0,i.jsx)("p",{children:"Das Honorar ist im Voraus zu entrichten. Bei nicht rechtzeitiger Absage ist das volle Honorar zu zahlen."})})]}),(0,i.jsxs)("section",{children:[(0,i.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"4. K\xfcndigung"}),(0,i.jsx)("div",{className:"bg-[#0A0A0A] p-6 rounded-lg border border-[#C8A97E]/10 space-y-4",children:(0,i.jsx)("p",{children:"Die K\xfcndigungsfrist betr\xe4gt 4 Wochen zum Monatsende. Die K\xfcndigung muss schriftlich erfolgen."})})]}),(0,i.jsxs)("section",{children:[(0,i.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"5. Haftung"}),(0,i.jsx)("div",{className:"bg-[#0A0A0A] p-6 rounded-lg border border-[#C8A97E]/10 space-y-4",children:(0,i.jsx)("p",{children:"Die Lehrerin haftet nur f\xfcr Vorsatz und grobe Fahrl\xe4ssigkeit. Eine weitergehende Haftung ist ausgeschlossen."})})]})]})]})})]})}},6205:function(e,n,t){"use strict";t.d(n,{ZK:function(){return o},ZP:function(){return c},iL:function(){return l}});var i=t(7437),s=t(2265),r=t(3949);t(6544);let a=(0,s.createContext)(void 0);function l(e){let{children:n}=e,{i18n:t}=(0,r.$G)(),[l,o]=(0,s.useState)("de"),[c,d]=(0,s.useState)(!1);(0,s.useEffect)(()=>{(async()=>{try{let e=localStorage.getItem("language")||"de";await t.changeLanguage(e),o(e),document.documentElement.lang=e,d(!0)}catch(e){console.error("Failed to initialize language:",e),o("de"),document.documentElement.lang="de",d(!0)}})()},[t]),(0,s.useEffect)(()=>{let e=e=>{o(e),document.documentElement.lang=e};return t.on("languageChanged",e),()=>{t.off("languageChanged",e)}},[t]);let u=async()=>{try{let e="de"===l?"en":"de";await t.changeLanguage(e),localStorage.setItem("language",e),o(e),document.documentElement.lang=e,window.dispatchEvent(new Event("languageChanged"))}catch(e){console.error("Failed to change language:",e)}};return c?(0,i.jsx)(a.Provider,{value:{currentLang:l,toggleLanguage:u},children:n}):null}function o(){let e=(0,s.useContext)(a);if(void 0===e)throw Error("useLanguage must be used within a LanguageProvider");return e}function c(){let{currentLang:e,toggleLanguage:n}=o(),{t}=(0,r.$G)();return(0,i.jsx)("button",{onClick:n,className:"text-white hover:text-[#C8A97E] transition-colors px-4 py-2 rounded","aria-label":t("common:switchLanguage"),children:e.toUpperCase()})}},1669:function(e,n,t){"use strict";t.d(n,{Z:function(){return h}});var i=t(7437),s=t(2265),r=t(7648),a=t(3145),l=t(9376),o=t(8614),c=t(4516),d=t(6205),u=t(3949);function h(){let[e,n]=(0,s.useState)(!1),[t,h]=(0,s.useState)(!1),g=(0,l.usePathname)(),m=(0,l.useRouter)(),{currentLang:f}=(0,d.ZK)(),{t:b,i18n:x}=(0,u.$G)();(0,s.useEffect)(()=>{let t=()=>{n(e)};return window.addEventListener("languageChanged",t),()=>{window.removeEventListener("languageChanged",t)}},[e]);let v=[{href:"/#services",label:b("nav.services")},{href:"/#about",label:b("nav.about")},{href:"/#references",label:b("nav.references")},{href:"/#testimonials",label:b("nav.testimonials")},{href:"/#contact",label:b("nav.contact")}];(0,s.useEffect)(()=>{let e=!0,n=()=>{e&&h(window.scrollY>50)};return window.addEventListener("scroll",n),()=>{e=!1,window.removeEventListener("scroll",n)}},[]);let p=()=>{n(!1),document.body.style.overflow="unset"},j=(e,n)=>{if(e.preventDefault(),p(),"/"===g){let e=document.querySelector(n.href.split("#")[1]?"#".concat(n.href.split("#")[1]):"body");if(e){let n=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:n-100,behavior:"smooth"})}}else m.push("/".concat(n.href))};return(0,i.jsxs)("nav",{className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300 ".concat(t?"bg-black/90 backdrop-blur-sm":"bg-transparent"),children:[(0,i.jsx)("div",{className:"container mx-auto px-4",children:(0,i.jsxs)("div",{className:"flex items-center justify-between h-20",children:[(0,i.jsx)(r.default,{href:"/",onClick:e=>{e.preventDefault(),"/"!==g?m.push("/"):window.scrollTo({top:0,behavior:"smooth"})},className:"relative w-28 h-10 transition-all duration-300",children:(0,i.jsx)("div",{className:"relative w-full h-full",children:(0,i.jsx)(a.default,{src:"/vocal-coaching/images/logo/ml-logo.PNG",alt:"Mel jazz",fill:!0,className:"object-contain brightness-0 invert hover:opacity-80 transition-opacity",priority:!0})})}),(0,i.jsxs)("div",{className:"hidden md:flex items-center space-x-8",children:[v.map(e=>(0,i.jsx)(r.default,{href:e.href,onClick:n=>j(n,e),className:"text-white/80 hover:text-white transition-colors",children:e.label},e.label)),(0,i.jsx)(d.ZP,{})]}),(0,i.jsx)("button",{onClick:()=>{n(!e),document.body.style.overflow=e?"unset":"hidden"},className:"md:hidden text-white focus:outline-none","aria-label":b("nav.toggleMenu"),children:(0,i.jsx)("svg",{className:"w-6 h-6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:e?(0,i.jsx)("path",{d:"M6 18L18 6M6 6l12 12"}):(0,i.jsx)("path",{d:"M4 6h16M4 12h16M4 18h16"})})})]})}),(0,i.jsx)(o.M,{children:e&&(0,i.jsx)(c.E.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm",children:(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center h-full space-y-8",children:[v.map(e=>(0,i.jsx)(r.default,{href:e.href,onClick:n=>j(n,e),className:"text-white/80 hover:text-white transition-colors text-lg",children:e.label},e.label)),(0,i.jsx)(d.ZP,{})]})})})]})}t(6544)},6544:function(e,n,t){"use strict";var i=t(6550),s=t(3949),r=t(9427);i.ZP.use(r.Z).use(s.Db).init({resources:{de:{translation:{nav:{home:"Start",services:"Unterricht",about:"\xdcber mich",references:"Referenzen & Kooperationen",testimonials:"Erfahrungen",contact:"Kontakt"},hero:{title:"Entdecke deine Stimme",subtitle:"Professionelles Vocal Coaching in Berlin",cta:"Jetzt buchen"},music:{title:"Meine Musik"},video:{title:"Einblicke"},services:{title:"Angebote",singing:{title:"Gesangsunterricht",description:"Individueller Unterricht f\xfcr alle Level",features:["Stimmbildung","Atemtechnik","Interpretation","B\xfchnenpr\xe4senz"],details:{includes:["Stimmanalyse","Individueller Trainingsplan","Aufnahmen","\xdcbe-Material"],suitable:["Anf\xe4nger","Fortgeschrittene","Profis","Alle Genres"],duration:"60-90 min",location:"Online & Studio Berlin"}}},about:{title:"\xdcber mich",intro:"Professionelle S\xe4ngerin & Vocal Coach",expanded:"Mit jahrelanger Erfahrung im Gesangsunterricht...",projects:{title:"Aktuelle Projekte",description:"Entdecken Sie meine aktuellen musikalischen Projekte"},more:"Mehr erfahren",less:"Weniger anzeigen"},references:{title:"Referenzen & Kooperationen"},testimonials:{title:"Erfahrungen"},contact:{title:"Kontakt",form:{name:"Name",email:"E-Mail",message:"Nachricht",send:"Senden"}}}},en:{translation:{nav:{home:"Home",services:"Lessons",about:"About",references:"References & Collaborations",testimonials:"Testimonials",contact:"Contact"},hero:{title:"Discover Your Voice",subtitle:"Professional Vocal Coaching in Berlin",cta:"Book Now"},music:{title:"My Music"},video:{title:"Insights"},services:{title:"Services",singing:{title:"Singing Lessons",description:"Individual lessons for all levels",features:["Voice Training","Breathing Technique","Interpretation","Stage Presence"],details:{includes:["Voice Analysis","Individual Training Plan","Recordings","Practice Material"],suitable:["Beginners","Advanced","Professionals","All Genres"],duration:"60-90 min",location:"Online & Studio Berlin"}}},about:{title:"About Me",intro:"Professional Singer & Vocal Coach",expanded:"With years of experience in vocal training...",projects:{title:"Current Projects",description:"Discover my current musical projects"},more:"Learn More",less:"Show Less"},references:{title:"References & Collaborations"},testimonials:{title:"Testimonials"},contact:{title:"Contact",form:{name:"Name",email:"Email",message:"Message",send:"Send"}}}}},lng:"de",fallbackLng:"de",supportedLngs:["de","en"],debug:!0,interpolation:{escapeValue:!1},detection:{order:["querystring","localStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupLocalStorage:"language",caches:["localStorage"]},react:{useSuspense:!1}})},9376:function(e,n,t){"use strict";var i=t(5475);t.o(i,"usePathname")&&t.d(n,{usePathname:function(){return i.usePathname}}),t.o(i,"useRouter")&&t.d(n,{useRouter:function(){return i.useRouter}})}},function(e){e.O(0,[516,101,437,971,117,744],function(){return e(e.s=9555)}),_N_E=e.O()}]);