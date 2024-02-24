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

const notesString =` <note>- The alliance between the US, Britain, and the Soviet Union against the Axis powers was always an uneasy one due to ideological differences and mistrust\n- Emphasize how the US and Britain were democratic, capitalist states while the Soviet Union was a communist dictatorship - these opposing systems made cooperation difficult\n- Discuss the mutual need to defeat the immediate threat of Germany and Japan that united them despite their differences\n- Have students debate/discuss whether the alliance could have survived long-term after the war given the inherent tensions\n- Additional activity: Have groups of students role play diplomatic negotiations between the Allies to highlight conflicting postwar goals'</note><note>- Point out that WWII created the unusual situation of an alliance between the capitalist USA and communist USSR against their common enemy Nazi Germany. This set the stage for future Cold War tensions.  \n\n- Contrast the differing ideologies and systems:\n    - USA: Promoted free market economics and multiparty democracy\n    - USSR: Relied on central economic planning and single party authoritarian rule\n\n- Discussion questions:\n    - Why do you think these very different countries allied together against the Nazis? What was the greater threat?\n    - What advantages and disadvantages did the economic and governmental systems of the USA and USSR have? \n    - How might their different ideologies contribute to future conflicts, even though they were allies in WWII?\n\n- Activity: \n    - In small groups, have students research the different perspectives of the USA and USSR on economics and governance during WWII. \n    - Ask them to present a short summary of the key differences and what they think the future implications might be.'</note><note>Key Points:\n- The US and USSR were allies of convenience during WWII to defeat their common enemy, Nazi Germany.  \n- After the war ended, tensions and rivalry emerged between the two new superpowers as they competed for global influence. This marked the start of the Cold War.\n\nElaboration:\n- Despite ideological differences, the US and USSR recognized the need to work together to defeat Hitler. The alliance was always an uneasy one though.\n- In the postwar years, conflicts emerged over the future of Eastern Europe, arms control, etc. By 1947, the Cold War had begun.\n\nDiscussion Questions:\n- What factors led the US and USSR to ally during WWII, despite their differences?\n- In what ways did the postwar goals of the two nations conflict? What were their competing visions? \n- How might leaders on both sides have worked harder to sustain cooperation? Or was Cold War conflict inevitable?\n\nActivity Idea:\n- Have students research key events from the alliance in WWII to the breakdown in relations postwar. Create a timeline highlighting the shift.'</note><note>- Winston Churchill was deeply suspicious of Soviet ambitions following WWII. Highlight his "Iron Curtain" speech that warned of Soviet expansionism.\n\n- Churchill wanted the Allies to take a hardline stance against allowing the USSR to extend its influence over Eastern European countries. However, he was overruled. Ask students why Churchill\'s perspective was ignored.\n\n- Churchill saw Stalin and the communists as simply replacing one dictator and oppressive ideology (Hitler and the Nazis) with another. Have students debate whether this was an accurate characterization. \n\n- As an exercise, have students research the postwar goals of the Allies and the conflicting perspectives that led to rising tensions with the Soviets. Ask them to write a short summary from Churchill\'s point of view explaining his opposition to Soviet actions in Eastern Europe.'</note><note>This slide discusses Franklin D. Roosevelt\'s hopes for building a friendly relationship with the Soviet Union and Joseph Stalin after World War II. Some key points to cover:\n\n- FDR was optimistic that the US and USSR could cooperate post-war. He hoped to bring Stalin and the Soviets into the "community of nations" rather than having tensions continue.\n\n- However, some historians argue FDR was too optimistic about Stalin\'s willingness to cooperate. The Soviet leader had his own vision for communism and post-war Europe that conflicted with Western ideals of democracy and self-determination.\n\nDiscussion questions:\n\n- Do you think FDR should have been more skeptical of Stalin\'s intentions? Why or why not?\n\n- In retrospect, was cooperation between the post-war superpowers of the US and USSR a realistic possibility? What were the biggest obstacles to cooperation?\n\n- How might history have been different if FDR had lived longer instead of dying in April 1945? Would he have been able to shape post-war policies with Stalin in a way later presidents could not?\n\nActivities:\n\n- Have students research and debate whether FDR\'s death significantly impacted the beginning of the Cold War tensions with the USSR.\n\n- Create a simulation where groups of students role play US and USSR leaders at the Yalta and Potsdam conferences near the end of WWII. Have them negotiate post-war plans based on their country\'s interests.'</note><note>- Stalin felt Russia needed a buffer zone in Eastern Europe to protect itself from potential Western aggression. Emphasize Stalin's deep mistrust of the West and desire to defend communism and Soviet power at all costs.\n\n- Have students debate whether Stalin's actions were primarily defensive or offensive. What evidence supports each view? What were the implications of his policies?\n\n- Compare and contrast Stalin's perspectives to those of Western leaders at the time. Did they aim to undermine communism? How might different worldviews have contributed to tensions during the early Cold War period?\n\n- Optional activity: Have students role play a meeting between Stalin and Truman, articulating each leader's perspectives, concerns, and demands. Then have them try to find common ground and negotiate a mutually acceptable agreement."</note><note>- Context: This meeting occurred in 1943 during WWII. The Allies (US, UK, Soviet Union) were coordinating strategy against their common enemy Germany, but also had some competing interests.\n\n- Key points: \n   - Stalin was demanding the Allies open a "second front" in Western Europe to divert German forces from the Eastern Front, where the Soviets were fighting.  \n   - The West needed Soviet help fighting Japan in the Pacific after defeating Germany. \n\n- The leaders agreed to prioritize defeating Germany first before negotiating their differences. This temporary unity helped the Allies prevail.  \n\n- Discussion questions:  \n   - Why was Stalin demanding a second front? What were some pros and cons from the Western perspective?\n   - What conflicting goals did the Allies need to manage while working together?\n   - How did postponing negotiations until after Hitler\'s defeat help the Allies?\n\nLet me know if you would like me to modify or add anything to these teaching notes. I aimed to summarize key context and themes to assist with communicating this slide.'</note><note>- The Big Three allied leaders (US, UK, Soviet Union) met at Yalta in February 1945 near the end of WWII to make plans for post-war Europe.\n\n- They agreed on plans for:\n    - Occupying and rebuilding Germany \n    - Promoting "free elections" in Eastern European countries occupied by Soviet troops  \n\n- However, they actually had very different interpretations of terms like "free elections" and "independence" for Eastern Europe:\n    - Stalin saw Eastern Europe as a Soviet sphere of influence and promoted communist regimes there\n    - Roosevelt/Churchill envisioned democratic self-determination \n\n- The compromises made at Yalta temporarily smoothed over conflicts to finish defeating Hitler, but laid the foundations for emerging Cold War tensions between communist East and capitalist West in the post-war era.\n\nDiscussion questions:\n- What were the different visions that the Allied leaders brought to Yalta? Why was this a source of conflict later on?\n- How might the settlements made at Yalta have looked different if leaders could have foreseen the coming Cold War?'</note>`


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
