// let apikey="AIzaSyDj7RmWP1R-ZZHjO_TQhbH3-olcJPqTqiM"

// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI=new GoogleGenerativeAI(apikey);
// const model=genAI.getGenerativeModel({model:'gemini-3-flash-preview'});
// const generationConfig={
//     temerature:1,
//     topP:0.95,
//     top:40,
//     maxOutputTokens:20,
//     responseMimeType:"text/plain"
// }
// export async function run(prompt) {
//     const chatSession=model.startChat({
//         generationConfig,
//         history:[
//         ],
//     })
//     const result=await chatSession.sendMessage(prompt);
//     return result.response.text();    
// }

// export default run;



import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyDj7RmWP1R-ZZHjO_TQhbH3-olcJPqTqiM"
);

const model = genAI.getGenerativeModel({
 model: "gemini-3-flash-preview", 
  generationConfig: {
    maxOutputTokens: 7000,   
    temperature: 0.4,    
  },
});


export async function run(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

