import pytesseract
import os
import sys
from pdf2image import convert_from_path

def pdf_to_images(pdf_file, output_dir, pages):
    # Convert specific pages
    pages_to_convert = [pages[i] - 1 for i in range(len(pages))]  # Adjust page numbers to 0-based index
    pages = convert_from_path(f"/app/books/{pdf_file}", 300, first_page=min(pages), last_page=max(pages))
    
    for i, page_num in enumerate(pages_to_convert):
        pages[page_num].save(os.path.join(output_dir, f"PDFimg{page_num}.jpg"), 'JPEG')

def extract_text(output_dir, pages):
    my_config = r"--psm 0 --oem 1"
    text = ''
    for page_num in pages:
        text += pytesseract.image_to_string(os.path.join(output_dir, f'PDFimg{page_num - 1}.jpg'), config=my_config)  # Adjust page number to 0-based index
    return text

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_text.py <pdf_file_path> <page1> <page2> ...")
        sys.exit(1)

    pdf_file_path = sys.argv[1]
    #pages = [int(page) for page in sys.argv[2:]]  # Convert page arguments to integers
    pages = [1, 5]

    # Temporary directory to store images
    output_dir = "PDFImages"

    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Convert specified PDF pages to images
    pdf_to_images(pdf_file_path, output_dir, pages)

    # Extract text from the specified pages
    extracted_text = extract_text(output_dir, pages)

    print(extracted_text)
