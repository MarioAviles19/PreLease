import jsPDF from 'jspdf';



export const GET = async({request, locals, cookies})=>{
    
    let doc = new jsPDF()

    const centerOfPage = doc.internal.pageSize.width / 2;
    

    // Create Resume Template


    doc.setFont('')
    doc.setFontSize(45);
    doc.text('John Doe', centerOfPage, 18,{align:'center'});

    doc.setFontSize(12);
    doc.text('123 Main St, City, Country | johndoe@example.com | (123) 456-7890', centerOfPage, 25, {align:'center'});
    doc.line(10, 26, doc.internal.pageSize.width - 10,26)

    doc.setFont("", 'bold');
    doc.setFontSize(18);
    doc.text("Objective", 10, 40, {align:'left'});
    doc.setFontSize(14);
    doc.setFont("", 'normal');
    let splitText = doc.splitTextToSize('I am a weembus looking for gongus. My ideal weembo is a 6 person glombus wrapped inside of a fully tiles beengie wingie and also miso is there', doc.internal.pageSize.width - 20)
    doc.text(splitText, 10, 50) 
    
    

    let url = doc.output('dataurlstring');

    return new Response(url);
}