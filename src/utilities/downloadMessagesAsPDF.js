import jsPDF from 'jspdf';

export const downloadMessagesAsPDF = (roomId, messages) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Set background color for Room ID and Downloaded At
    const headerHeight = 20;
    doc.setFillColor(200, 200, 255);
    doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, 'F');

    // Add the text on the left (Room ID)
    doc.setTextColor(0, 0, 0);
    doc.text(`Room ID: ${roomId}`, 10, 15);

    // Add the text on the right (Downloaded At)
    const downloadedAt = `Downloaded At: ${new Date().toLocaleString()}`;
    doc.text(
        downloadedAt,
        doc.internal.pageSize.width - 10 - doc.getTextWidth(downloadedAt),
        15
    );

    let y = 30;
    messages.forEach((msg) => {
        const text = `${msg.senderName || "Unknown"}: ${msg.message}`;
        if (y > 280) {
            doc.addPage();
            y = 8;
        }
        doc.text(text, 8, y);
        y += 8;
    });

    doc.save(`room-${roomId}-messages.pdf`);
};