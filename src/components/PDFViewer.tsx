import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker - use local file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  filePath: string;
  title: string;
}

export default function PDFViewer({ filePath, title }: PDFViewerProps) {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = title + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="bg-white dark:bg-pink-400 px-4 py-3 rounded-full text-lg sm:text-xl font-chewy text-zinc-800 dark:text-white mb-4 text-center">
        {title}
      </h3>
      
      <div 
        onClick={handleDownload}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        title="Click to download PDF"
      >
        <Document
          file={filePath}
          className="max-w-full"
        >
          <Page
            pageNumber={1}
            width={Math.min(600, window.innerWidth - 40)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}