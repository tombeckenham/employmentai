import PyPDF2

def extract_text_from_pdf(pdf_path, output_txt_path):
    # Open the PDF file in binary read mode
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Initialize a variable to hold all the extracted text
        extracted_text = ""
        
        # Loop through all the pages and extract text
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            extracted_text += page.extract_text()

    # Write the extracted text to a text file
    with open(output_txt_path, 'w') as output_file:
        output_file.write(extracted_text)
    print(f"Text extracted and saved to {output_txt_path}")

# Example usage
pdf_path = "your_pdf_file.pdf"  # Path to the input PDF file
output_txt_path = "output_text_file.txt"  # Path where the text will be saved
extract_text_from_pdf(pdf_path, output_txt_path)
