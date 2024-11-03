import {config} from "dotenv"
config()
import OpenAI from "openai";
import fs from 'fs';
const filePath = './data.json';
function setItem(key, value){
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')|| '{}');
    data[key]= value;
    fs.writeFileSync (filePath, JSON.stringify(data));
}
const urlB = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/220px-Pink_lady_and_cross_section.jpg";

async function rungpt(urlA){
    const openai = new OpenAI({apiKey: process.env.API_KEY});
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "is the object in this image edible? reply only with true or false, no punctuation" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": urlA,
                        },
                    }
                ],
            },
            
        ],
    });
    if("true"==completion.choices[0].message.content){
        const fruit = await openai.chat.completions.create({
            model: "gpt-4o",
            messages:[
        {
            role: "user", content:[
                { type:"text", text: "What is this object in the photo?, reply with the fewest possible words while still being accurate"},
                {
                type:"image_url", 
                image_url: {
                    "url":urlA, 
                },
            
                }   
                ]
            }
            ]
        });
        const recipes = await openai.chat.completions.create({
            model: "gpt-4o",
            messages:[
        {
            role: "user", content:[
                { type:"text", text: "Find 3 recipes using " + fruit.choices[0].message.content+" reply in the following format: (the name of the recipe #URL of the recipe#) do this for all 3 recipes, do not reply with anything else"},   
                ]
            }
            ]
        });
        console.log(fruit.choices[0].message.content);
        console.log(recipes.choices[0].message.content);
        let text = (recipes.choices[0].message.content);
        let x = 0;
        let y = 0;
        y = text.indexOf("#");
        let recipeName1 = text.substring(x,y);
        setItem("rName1", recipeName1);
        text = text.substring(y+1);
        console.log(recipeName1);
        y = text.indexOf("#");
        let recipelink1 = text.substring(x,y);
        setItem("rLink1", recipelink1);
        text = text.substring(y+1);
        y = text.indexOf("#");
        let recipeName2 = text.substring(x,y);
        setItem("rName2", recipeName2);
        text = text.substring(y+1);
        y = text.indexOf("#");
        let recipelink2 = text.substring(x,y);
        setItem("rLink2", recipelink2);
        text = text.substring(y+1);
        y = text.indexOf("#");
        let recipeName3 = text.substring(x,y);
        setItem("rName3", recipeName3);
        text = text.substring(y+1);
        y = text.indexOf("#");
        let recipelink3 = text.substring(x,y);
        setItem("rLink3", recipelink3);
        text = text.substring(y+1);
       
    }
    else{
        setItem("notFood",0);
    }
}
export function setUrl(link){
    urlB = link; 
}
rungpt(urlB);



