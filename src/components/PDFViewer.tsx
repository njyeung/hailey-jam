import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker - use local file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  filePath: string;
  title: string;
}

export default function PDFViewer({ filePath, title }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="bg-white dark:bg-pink-400 p-3 rounded-full text-xl font-chewy text-zinc-800 dark:text-white mb-4 text-center">
        {title}
      </h3>
      {loading && (
        <span className="text-zinc-700 dark:text-zinc-400">Loading PDF...</span>
      )}
      
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
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
  );
}