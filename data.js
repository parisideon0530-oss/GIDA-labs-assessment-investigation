const students = [
  {
    id:"A", caseNo:"001", name:"Miguel", access:"Spanish print access", folder:"Home Language",
    question:"¿Qué necesitan las plantas para crecer?",
    options:["Agua","Luz solar","Rocas","Aire","Dulces"],
    correct:["Agua","Luz solar","Aire"],
    profile:"Miguel understands classroom science better when allowed to use Spanish and emerging English.",
    interpretation:"A Spanish response can still be valid evidence of science understanding.",
    expertKeys:["coelho","garcia"]
  },
  {
    id:"B", caseNo:"002", name:"Ji-hoon", access:"Korean print access", folder:"Language Access",
    question:"식물이 자라려면 무엇이 필요합니까?",
    options:["물","햇빛","바위","공기","사탕"],
    correct:["물","햇빛","공기"],
    profile:"Ji-hoon may understand the science concept but cannot access an English-only written assessment.",
    interpretation:"Difficulty reading the assessment language cannot automatically be interpreted as a content gap.",
    expertKeys:["cummins"]
  },
  {
    id:"C", caseNo:"003", name:"Sophia", access:"Visual access barrier", folder:"Visual Access",
    question:"¿Qué necesitan las plantas para crecer?",
    options:["Agua","Luz solar","Rocas","Aire","Dulces"],
    correct:["Agua","Luz solar","Aire"],
    visual:true,
    profile:"Sophia is multilingual and may also have an unidentified reading or visual-processing need.",
    interpretation:"For multilingual learners, disability-related needs can be missed when every difficulty is attributed only to language acquisition.",
    expertKeys:["gottlieb"]
  },
  {
    id:"D", caseNo:"004", name:"Aiden", access:"AAC / symbol response", folder:"Communication Mode",
    question:"Which symbols show what plants need?",
    options:["💧 Water","☀️ Sunlight","🪨 Rocks","🌬️ Air","🍬 Candy"],
    correct:["💧 Water","☀️ Sunlight","🌬️ Air"],
    symbols:true,
    profile:"Aiden communicates most clearly with symbols, pointing, or AAC.",
    interpretation:"A student can demonstrate content knowledge without using a spoken or written English sentence.",
    expertKeys:["gottlieb","garcia"]
  },
  {
    id:"E", caseNo:"005", name:"Control Case", access:"English print access", folder:"Traditional Assessment",
    question:"What do plants need to grow?",
    options:["Water","Sunlight","Rocks","Air","Candy"],
    correct:["Water","Sunlight","Air"],
    profile:"This case shows how simple the task feels when language and visual access align with the learner.",
    interpretation:"The science target is stable. The variable across cases is assessment access.",
    expertKeys:["coelho"]
  }
];

const experts = {
  coelho:{
    initials:"EC", name:"Elizabeth Coelho", focus:"Adding English: practical classroom access",
    type:"Text + Resource Archive", bestAfter:"Use after Miguel or before your conclusion.",
    clipTitle:"Two-Minute Presenter Blurb",
    blurb:[
      "Coelho’s practical contribution is the phrase and mindset of adding English. Students are not empty language containers, and they are not abandoning the languages they already have. They are adding English to a linguistic and cultural foundation.",
      "For assessment, this means I should not treat home-language use as avoiding the task. If the content target is science, I can allow drawing, discussion, Spanish labels, bilingual word banks, gestures, or teacher-scribed oral responses while still teaching academic English.",
      "The key classroom move is not lowering expectations. It is separating the content target from unnecessary language barriers so I can see what the student knows and what language support they need next."
    ],
    application:"Give multilingual learners ways to show content knowledge while intentionally adding English vocabulary and structures over time.",
    links:[
      ["Open Adding English resource page","https://books.google.com/books/about/Adding_English.html?id=YeqeAAAAMAAJ"],
      ["Open Coelho interview","https://channelviewpublications.wordpress.com/2012/07/09/an-interview-with-elizabeth-coelho/"]
    ]
  },
  cummins:{
    initials:"JC", name:"Jim Cummins", focus:"Multilingualism, identity, and literacy",
    type:"Video Link + Archive Summary", bestAfter:"Use after Ji-hoon, the Korean access case.",
    clipTitle:"Suggested Video Connection",
    blurb:[
      "Cummins helps explain why a student’s first language is not a problem to overcome. Home-language knowledge can support literacy, identity, and academic development.",
      "In this lab, Ji-hoon may know the science but cannot access the written assessment language. That does not mean the learner lacks cognition or content knowledge.",
      "The assessment implication is that I need additional evidence: oral explanation, drawing, home-language support, family input, observation, and progress over time."
    ],
    application:"Use the student’s strongest language and identity resources as bridges to academic English rather than treating them as interference.",
    links:[
      ["Open Jim Cummins video: Benefits of Multilingual Literacy","https://www.youtube.com/watch?v=kGKdm3ntr7g"],
      ["Open Jim Cummins video: Language and Identity","https://www.youtube.com/watch?v=ebQ2p8072M0"]
    ]
  },
  garcia:{
    initials:"OG", name:"Ofelia García", focus:"Translanguaging",
    type:"Video Link + Archive Summary", bestAfter:"Use after Miguel or the final reveal.",
    clipTitle:"Suggested Video Connection",
    blurb:[
      "García gives us the language of translanguaging: multilingual students use their full linguistic repertoires to make meaning.",
      "In assessment, translanguaging can be evidence. A student who labels agua, points to the sun, explains in Spanish, and repeats key words in English may be showing real science understanding.",
      "The teacher’s job is to design assessment conditions that reveal understanding while still supporting growth toward academic English."
    ],
    application:"Let students use multiple languages strategically, then document what they know and what academic English they are ready to add.",
    links:[
      ["Open Ofelia García interview: Translanguaging","https://www.youtube.com/watch?v=5Ljr4C9velU"],
      ["Open Language on the Move interview page","https://languageonthemove.com/translanguaging-ofelia-garcia-in-interview/"]
    ]
  },
  gottlieb:{
    initials:"MG", name:"Margo Gottlieb", focus:"Meaningful multilingual assessment",
    type:"Video/Article Link + Archive Summary", bestAfter:"Use after Sophia, Aiden, or the conclusion.",
    clipTitle:"Suggested Video/Reading Connection",
    blurb:[
      "Gottlieb’s work is the strongest conclusion voice for this lab because she focuses directly on multilingual assessment.",
      "Her lens pushes us to ask what evidence the assessment produces and whether that evidence is culturally and linguistically sustaining.",
      "For multilingual learners, one written English response is rarely enough. Classroom assessment should include multiple opportunities, multiple language domains, student reflection, and evidence of growth."
    ],
    application:"Use assessment as a way to discover what multilingual learners can do, not just as a tool for recording what they cannot yet express in English.",
    links:[
      ["Open Margo Gottlieb video: Meaningful Multilingual Assessment","https://www.youtube.com/watch?v=X2fOjgGsWgo"],
      ["Open CAL article by Margo Gottlieb","https://www.cal.org/publications/how-can-multilingual-learners-and-their-teachers-make-a-difference-in-classroom-assessment/"],
      ["Open Ellevation collaborative assessment session","https://ellevationeducation.com/video/empowering-multilingual-learners-through-collaborative-assessment-dr-margo-gottlieb-and-dr"]
    ]
  }
};