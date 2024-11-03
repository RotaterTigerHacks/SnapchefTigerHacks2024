import {config} from "dotenv"
config()
import OpenAI from "openai";

var urlB = "https://i5.walmartimages.com/seo/Fresh-Gala-Apple-Each_f46d4fa7-6108-4450-a610-cc95a1ca28c5_3.38c2c5b2f003a0aafa618f3b4dc3cbbd.jpeg"
var recipeName1;
var recipeName2;
var recipeName3;
var recipelink1;
var recipelink2;
var recipelink3;


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
        recipeName1 = text.substring(x,y);
        text = text.substring(y+1);
   
        y = text.indexOf("#");
        recipelink1 = text.substring(x,y);
        text = text.substring(y+1);
  
        y = text.indexOf("#");
        recipeName2 = text.substring(x,y);
        text = text.substring(y+1);
    
        y = text.indexOf("#");
        recipelink2 = text.substring(x,y);
        text = text.substring(y+1);
      
        y = text.indexOf("#");
        recipeName3 = text.substring(x,y);
        text = text.substring(y+1);
      
        y = text.indexOf("#");
        recipelink3 = text.substring(x,y);
        text = text.substring(y+1);
        
    }
    else{
        
    }
}
rungpt(urlB);
