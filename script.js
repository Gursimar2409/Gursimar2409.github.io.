// This function is called when the "Generate PDF Invoice" button is clicked.
function generatePDF() {
    // Show the hidden invoice template so html2canvas can capture it.
    const invoiceTemplate = document.getElementById('invoice-template');
    invoiceTemplate.style.display = 'block';

    // Get the input values from the form.
    const patientName = document.getElementById('patientName').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const treatment = document.getElementById('treatment').value;
    const medications = document.getElementById('medications').value;
    const billAmount = document.getElementById('billAmount').value;
    
    // Get the current date and format it
    const currentDate = new Date().toLocaleDateString('en-GB'); // Format: DD/MM/YYYY

    // Populate the PDF template with the input values.
    document.getElementById('pdf-patientName').innerText = patientName;
    document.getElementById('pdf-invoiceNumber').innerText = invoiceNumber;
    document.getElementById('pdf-currentDate').innerText = currentDate;
    document.getElementById('pdf-treatment').innerText = treatment;
    document.getElementById('pdf-medications').innerText = medications;
    // Format the bill amount as currency in Rupees.
    document.getElementById('pdf-billAmount').innerText = `₹${parseFloat(billAmount).toFixed(2)}`;

    // Use html2canvas to capture the invoice template div as an image.
    html2canvas(invoiceTemplate, {
        scale: 2 // Increase scale for better quality.
    }).then(canvas => {
        // Create a new jsPDF instance. A4 size, portrait orientation.
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Get the image data from the canvas.
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add the image to the PDF.
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Save the PDF with a dynamic filename.
        pdf.save(`Invoice-${invoiceNumber}-${patientName}.pdf`);

        // Hide the invoice template again after the PDF is generated.
        invoiceTemplate.style.display = 'none';
    });
}
