// Options the user could type in
const prompts = [
  ["best private engineering college in kolkata"],
  ["date"],
  ["weather"],
  ["connor"],
  ["the term recruitment means"], ["difference between selection and recruitment"], ["top ten recruitment companies in india"], ["total nit count", "nit"], ["best nit"], ["total iit count", "iit"], ["best iit"], ["best it company"], ["most frequently asked question in interview"], ["best engineering course"], ["top career options after engineering"], ["most necessary quality to get an it job"], ["average btech engineer salary"], ["best internship websites in india"], ["five best programming languages to learn"], ["five best institutions for gate preperation"], ["top mtech entrance exams"], ["top five mba entrance exams in india"], ["average academic score to pursue pg degree in engineering"], ["necessary requirements for phd"],
  ["who created you", "who are your parents"],
  ["hi", "hey", "hello", "good morning", "good afternoon", "your mom"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no","not sure","maybe","no thanks"],
  [""],
  ["haha","ha","lol","hehe","funny","joke", "xD", "lmao"]

]

// Possible responses, in corresponding order

const replies = [
  ["Institute of Engineering & Management is regarded as the best private college in West Bengal due to its top notch faculty and promising placements."],
  ["25th of November, 2022"],
  ["Mostly clear sky with an average of 48% humidity and chilling winds in Kolkata"],
  ["Happy birthday!"],
  ["Recruitment is basically the process of linking employees with the employers. It consists of identifying, short listing and selecting suitable candidates to fill in vacant positions within a firm."], ["Recruitment is a process that searches for talent on broad basis while selection can be referred to as screening the eligible candidates to find the most suitable one. Recruitment process attracts as many candidates as possible while the selection process helps in eliminating unfit or in-eligible candidates from consideration."], ["ABC job placement, Zigsaw Consultancy, Randstad, TeamLease Services, Kelly Services, Adecco India, United HR Solutions, Brain Behind Brand, Sutra HR, Career Net"], ["There are 31 nits"], ["nit Tiruchirappalli has always been the best nit since a very long time"], ["There are 23 IITs"], ["IIT-Madras is currently the best IIT as per the latest NIRF rankings"], ["Microsoft Corporation"], ["Tell me something about yourself"], ["Aerospace Engineering, Higher Studies, Public Service Undertakings, Management, Entrepreneurship, Campus Placements, Become an Expert, Civil Services"], ["Higher Studies, Public Service Undertakings Management, Entrepreneurship, Campus Placements, Become an Expert, Civil Services, Look for internships, Enter the private sector, Get a certification, Join the Indian Armed Forces"], ["Communication skills."], ["BTech Engineer salary in India ranges between ₹ 0.2 Lakhs to ₹ 4.7 Lakhs with an average annual salary of ₹ 2.4 Lakhs."], ["Internshala"], ["Python, Java, C/C++, JavaScript, Golang "], ["Made Easy, The Gate Academy, T.I.M.E., GateForum, ACE Engineering Academy"], ["The top MTech entrance exams are GATE, IPU CET, BHU PET, and TANCET."], ["CAT, XAT, GMAT, MAT, CMAT"], ["Generally, the required average academic score to pursue postgraduate degree in engineering is 60% (and above). However, top ranking universities will require scores of 80% and above."], ["The required minimum qualification for admission to a phd Program shall normally be a two years Master’s OR M.Phil Degree from any accredited Indian or Foreign University in the relevant field. She/he must have obtained 55% marks or Equivalent Grade in the Master’s or M.Phil Degree."],
  ["Sinchan & Didhiti", "Didhiti & Sinchan"],
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am infinite though i was built on May 2nd, 2022"],
  ["I am a bot but I do have feelings", "I am a bot. What are you?"],
  ["The one true God, JavaScript"],
  ["My name is Connor", "I am Connor"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza"],
  ["Bro!"],
  ["Great question"],
  ["That's ok","I understand","What do you want to talk about?"],
  ["Please say something :("],
  ["Haha!","Good one!"]


]

// Random for any other user input

const alternative = [
  "sorry, try another question",
  "Go on...",
  "A more relevant question may be?",
  "Try again",
  "I'm listening...",
  "I don't understand :/",
  "give it another try"
]

// Whatever else you want :)

const coronavirus = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"]
