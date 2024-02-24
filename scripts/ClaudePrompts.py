import anthropic
from PDFtoText import pdf_to_images, extract_text

#API key
client = anthropic.Anthropic(
    api_key="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",
)

image_file = 'DemoImages'

pdf_to_images('Demo.pdf', image_file)
text = extract_text(image_file)

class_level_dict = {1: 'lower ability',
                    2: 'medium ability',
                    3: 'high ability'}

def slide_content_generator(language, pdf_text, class_level, class_age, tone):   
    """
    Parameters
    ----------
    age : integer age of teacher
    years_exp : integer years of teaching experience
    language : language string
    pdf_text : output from text extraction
    class_level: integer from 1 to 3 representing the class ability level
    class_age : integer
    tone : tuple of binary indicators for (humour, analogies)

    Returns
    -------
    Slide text content seperated by XML tags (<slide></slide>)
    """
    tone_dict = {(0,0): '',
                 (1,0): 'Have some humourous moments in the slides, while keeping everything factually accurate',
                 (1,1): 'Have some humorous moments in the slides, and use occasional useful analogies to help explain concepts, while keeping everything factually correct',
                 (0,1): 'Use occasional useful analogies to help explain concepts, while keeping everything factually correct'}
    message = client.messages.create(
        model="claude-2.1",
        max_tokens=1000,
        temperature=0,
        system="You are an expert in summarising text-book content into a format which can be inputted into a PowerPoint in {language}.\n\
                You will be tasked with splitting a large chunk of text into separate slides to build a narrative which will support students in learning the content.\n\
                These slides should start with a title slide and each slide should be seperated by XML tags which are labelled with <slide></slide>. \
                You should prioritise all of the important content being included, over reducing the number of slides\
                You should not introduce or conclude the slides, just output them.",
        messages=[
            {"role": "user", "content": f"{pdf_text} Please start by reading and understanding this text. \
             Turn this text into content for slides suitable for a class of {class_level_dict.get(class_level)} {str(class_age) + '-year-olds'}.\
             Ensure that no valuable content has been missed out.\
             Have each slide cover a certain theme to build a narrative over the slides making the content easier to understand and digest.\
             {tone_dict.get(tone)}"}
        ]
    )
    return message.content

slide_content = str(slide_content_generator('English', text, 3, 15, (1,1))[0])



def keynote_generator(slide_content, language, teacher_age, teacher_exp, class_level, class_age):
    """
    Parameters
    ----------
    slide_content : text for the slide-deck, each slide's text is separated by <slide> XML tags
    language : language string
    teacher_age : integer
    teacher_exp : number of years of experience (teacher)

    Returns
    -------
    Key notes for each slide of the slide-deck separated by XLM tags (<knote></knote>)
    """
    slide_text = []
    #separating each of the slides
    for slide in slide_content.split('<slide>'):
        slide_text.append(slide.split('</slide>')[0] + '\n')
    #removing contentblock text
    slide_text = slide_text[1:]
    key_notes = []
    for slide in slide_text:
        message = client.messages.create(
            model="claude-2.1",
            max_tokens=1000,
            temperature=0,
            system="You are an expert in creating helpful summaries of the content in a presentation's slide.\
                    You should design these summaries to support a teacher in delivering the slide content.\
                        Do not include XML tags",
            messages=[
                {"role": "user", "content": f"{slide} Please understand the content in this slide.\
                 Create a set of notes for a {teacher_age}-year-old teacher with {teacher_exp} years of experience.\
                 These notes should help the teacher communicate the content of the slide more effectively to a class of {class_level_dict.get(class_level)} {class_age}-year-olds.\
                 The notes can also include relevant exercises for students to complete.\
                 Skip the preamble."}
            ]
        )
        key_notes.append(message.content)
    return key_notes
    
key_notes = keynote_generator(slide_content, 'English', 25, 1, 3, 18)

def key_notes_formatter(key_notes):    
    key_notes_txt = ''
    for key_note in key_notes:
        key_note = str(key_note)
        key_note_formatted = '<note>' + key_note.split('\\n\\n',1)[1].split(", type='text')]")[0] + '</note>'
        key_notes_txt = key_notes_txt + key_note_formatted
    return key_notes_txt
    
