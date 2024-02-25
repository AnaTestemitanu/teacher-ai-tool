import pptxgen from "pptxgenjs";
import OpenAI from "openai";
import axios from 'axios';
import fs from 'fs';

const slidesString = `Here are 8 slides summarizing the key information from the text:

<slide>
The Grand Alliance: USA, Soviet Union, and Britain Team Up Against Hitler
During WWII, these unlikely allies united to defeat their common enemy. But tensions emerged about how to govern post-war Europe.
<image>https://oaidalleapiprodscus.blob.core.windows.net/private/org-7OjEzy5e86dAuPBijAI1CNMM/user-kwg4hWVgDbpgLuBi0zMuGGHN/img-PLqXjlsJu75skyhBNVAhGcrS.png?st=2024-02-25T02%3A36%3A07Z&se=2024-02-25T04%3A36%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-24T18%3A04%3A17Z&ske=2024-02-25T18%3A04%3A17Z&sks=b&skv=2021-08-06&sig=DzuEYoRSZhylEqDtMzAJRJktsqy0NT9hzblxtKvFr3I%3D</image>
</slide>

<slide> 
Capitalism vs. Communism: Ideological Differences Emerge
USA and Britain = capitalist democracies 
Soviet Union = communist state
They had very different visions for Europe's future.
</slide>

<slide>
Big Three Leaders: Mutual Distrust 
Churchill didn't trust Stalin. Stalin thought the West wanted to destroy communism. Roosevelt tried to mediate but sides were chosen.
</slide> 

<slide> 
Superpowers Emerge: USA and Soviet Union 
The old European powers declined. Two new superpowers competing for global influence took their place. Like radioactive spider bites giving superpowers!  
</slide>

<slide>
Grand Alliance Agreements: Short Term Unity, Long Term Divisions
They cooperated to win WWII but already planned to promote their ideologies after. Like awkward in-laws at Christmas dinner.
</slide>

<slide>
Iron Curtain Descends
Soviet troops occupied Eastern Europe post-war. Stalin installed communist regimes. Churchill warned of descent of an Iron Curtain dividing Europe.
</slide>

<slide> 
Cold War Begins 
No direct fighting but lots of threats, spying, stockpiling weapons. Like siblings giving each other the silent treatment after a big argument.
</slide>

<slide>
Europe Split into East and West
West = US-aligned capitalism
East = Soviet-dominated communism
A continent divided along ideological lines.
</slide>`;


const rawSlides = slidesString.split(/<\/?slide>/).filter(text => text.trim() !== '');

const slides = rawSlides.map(slide => {
  const text = slide.replace(/<image>.*<\/image>/, '').trim();
  const imageMatch = slide.match(/<image>(.*?)<\/image>/);
  const imageDescription = imageMatch ? imageMatch[1] : '';

  return {
    slide_text: text,
    slide_image: imageDescription
  };
});

slides.slice(1,1);

const pptx = new pptxgen();
const openai = new OpenAI({ apiKey: "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"});

async function downloadImage(imageUrl, outputPath) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading the image:', error);
    throw error;
  }
}

async function deleteImage(imagePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Image successfully deleted: ${imagePath}`);
      }
    });
  });
}

for (const slide of slides) {
  const slideObj = pptx.addSlide();
  slideObj.addText(slide.slide_text, { x: 0.5, y: 0.5, w: 4, h: 3, fontSize: 18, fontFace: 'Tahoma' });

  if (slide.slide_image) {
    try {
      // const response = await openai.images.generate({
      //   model: "dall-e-3",
      //   prompt: slide.slide_image,
      //   n: 1,
      //   size: "1024x1024",
      // });
      //console.log(response.data)
      //await downloadImage(slide.slide_image, "./images/img_1.png");
      slideObj.addImage({ path: "./images/img_2.png", x: 5, y: 0, w: 5, h: 5.63 });
      //await deleteImage("./images/test.png");
    } catch (err) {
      console.log(err)
    }

  }
}

pptx.writeFile("Presentation.pptx").then(() => {
  console.log("Presentation created!");
});
