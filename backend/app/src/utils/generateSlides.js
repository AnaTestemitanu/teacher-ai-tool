import pptxgen from "pptxgenjs";
import OpenAI from "openai";

const slidesString = `Here are 8 slides summarizing the key information from the text:

<slide>
The Grand Alliance: USA, Soviet Union, and Britain Team Up Against Hitler
During WWII, these unlikely allies united to defeat their common enemy. But tensions emerged about how to govern post-war Europe.
<image>The Grand Alliance: USA, Soviet Union, and Britain </image>
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

for (const slide of slides) {
  const slideObj = pptx.addSlide();
  slideObj.addText(slide.slide_text, { x: 0.5, y: 0.5, fontSize: 18, color: '000000' });

  if (slide.slide_image) {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: slide.slide_image,
      n: 1,
      size: "1024x1024",
    });
    slideObj.addImage({ path: response.data[0].url, x: 1, y: 1, w: 5, h: 3 });
  }
}

pptx.writeFile("Presentation.pptx").then(() => {
  console.log("Presentation created!");
});


console.log(slides);
