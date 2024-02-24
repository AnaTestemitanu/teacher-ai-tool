import pytesseract
import os
from pdf2image import convert_from_path

def pdf_to_images(pdf_file, image_file): 
    pages = convert_from_path(pdf_file, 300)

    for count, page in enumerate(pages):
        page.save(os.path.join(image_file,f"PDFimg{count}.jpg"), 'JPEG')

def extract_text(image_file):
    my_config = r"--psm 0 --oem 1"
    text =''
    for i in range(len(os.listdir('PDFImages')))[:-1]:
        text = text + pytesseract.image_to_string(os.path.join(image_file,f'PDFimg{i}.jpg'))
    return text

     
    