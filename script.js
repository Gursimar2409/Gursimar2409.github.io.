// --- 1. GET FORM VALUES ---
const patientName = document.getElementById('patientName').value;
const appointmentDate = document.getElementById('appointmentDate').value;
const treatment = document.getElementById('treatment').value;
const medications = document.getElementById('medications').value;
const billAmountInput = document.getElementById('billAmount').value;

// --- VALIDATION STEP ---
const submitButton = document.querySelector('#invoiceForm .btn');
const originalButtonText = 'Generate PDF Invoice';
const billAmount = parseFloat(billAmountInput);

if (isNaN(billAmount)) {
console.error("Invalid or empty bill amount. PDF generation stopped.");
submitButton.textContent = 'Please enter a valid amount!';
submitButton.style.backgroundColor = '#e74c3c'; // Red color for error

 setTimeout(() => {
     submitButton.textContent = originalButtonText;
     submitButton.style.backgroundColor = '#00a99d'; // Original color
 }, 3000);

 return; // Stop the function
}

// --- 2. DEFINE THE LOGO (SVG as Base64) ---
// This SVG is encoded so it can be embedded directly into the PDF.
const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMTUgNDUgQzE1IDIwLCA4NSAyMCwgODUgNDUgTDg1IDgwIEM4NSA5NSwgNjUgMTEwLCA1MCAxMTAgQzM1IDExMCwgMTUgOTUsIDE1IDgwIFoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwOWU3NiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSIzMyIgY3k9IjU1IiByPSI1IiBmaWxsPSIjMDA5ZTc2Ii8+CiAgICA8Y2lyY2xlIGN4PSI2NyIgY3k9IjU1IiByPSI1IiBmaWxsPSIjMDA5ZTc2Ii8+CiAgICA8cGF0aCBkPSJNMzUgNzUgUTUwIDkwIDY1IDc1IiBzdHJva2U9IiMwMDllNzYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==';

// --- 3. DEFINE PDF STRUCTURE AND CONTENT ---
const docDefinition = {
pageSize: 'A4',
pageMargins: [40, 60, 40, 60],
// The header includes the logo and clinic name
header: function() {
return {
columns: [
{ image: logoBase64, width: 60, alignment: 'left', margin: [40, 20, 0, 0] },
{ text: 'The Dental Cure Clinic', style: 'headerTitle', alignment: 'right', margin: [0, 35, 40, 0] }
]
};
},
footer: {
text: 'Thank you for choosing The Dental Cure Clinic.',
style: 'footer',
alignment: 'center'
},
content: [
{ text: 'Patient Invoice', style: 'invoiceTitle', alignment: 'center', margin: [0, 0, 0, 20] },
{
columns: [
{
stack: [
{ text: 'Bill To:', style: 'subheader' },
{ text: patientName, style: 'normalText' }
]
},
{
stack: [
{ text: 'Appointment Date:', style: 'subheader' },
{ text: appointmentDate ? new Date(appointmentDate).toLocaleDateString('en-GB') : 'N/A', style: 'normalText' }
],
alignment: 'right'
}
],
margin: [0, 0, 0, 30]
},
{ text: 'Treatment(s) Performed:', style: 'subheader', margin: [0, 0, 0, 5] },
{ text: treatment || 'N/A', style: 'normalText', margin: [0, 0, 0, 20] },
{ text: 'Medications Prescribed:', style: 'subheader', margin: [0, 0, 0, 5] },
{ text: medications || 'N/A', style: 'normalText', margin: [0, 0, 0, 40] },
{ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#cccccc' }] },
{
columns: [
{ text: 'Total Amount Due', style: 'totalLabel', alignment: 'right', margin: [0, 10, 0, 0] },
{ text: ₹ ${billAmount.toFixed(2)}, style: 'totalAmount', alignment: 'right', margin: [0, 10, 0, 0], width: 'auto' }
]
},
{ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#cccccc' }] }
],
// All the styles for the PDF are defined here
styles: {
headerTitle: { fontSize: 24, bold: true, color: '#005f73' },
invoiceTitle: { fontSize: 28, bold: true, color: '#333333' },
subheader: { fontSize: 12, bold: true, color: '#005f73', margin: [0, 0, 0, 5] },
normalText: { fontSize: 11, color: '#495057' },
totalLabel: { fontSize: 14, bold: true, color: '#333333' },
totalAmount: { fontSize: 16, bold: true, color: '#00a99d' },
footer: { fontSize: 10, italics: true, color: '#6c757d' }
}
};

// --- 4. CREATE AND DOWNLOAD THE PDF ---
pdfMake.createPdf(docDefinition).download(Invoice-${patientName.replace(/\s/g, '_')}.pdf);
}
