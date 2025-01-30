// import { Viewer, Worker, DocumentLoadEvent } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { useLocation } from "react-router-dom";
// import { useFile } from "../contexts/UseFileContext";

// const FileViewer = () => {
//   const location = useLocation();
//   const { setFileContent } = useFile();

//   const queryParams = new URLSearchParams(location.search);
//   const fileUrl = queryParams.get("file_url") || '';

//   console.log(fileUrl);

//   const handleDocumentLoad = (e: DocumentLoadEvent) => {
//     setFileContent({
//       fileUrl,
//       fileType: "pdf",
//       pageNum: e.doc.numPages,
//     });
//   };

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//         <Viewer fileUrl={fileUrl} onDocumentLoad={handleDocumentLoad} />
//       </Worker>
//     </div>
//   );
// };

// export default FileViewer;


import React from 'react'

const Lll = () => {
  return (
    <div>
      
    </div>
  )
}

export default Lll


// import { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js`;

// const FileViewer = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const pdfUrl = queryParams.get('file_url') || '';

//   useEffect(() => {
//     const loadPdf = async () => {
//       const loadingTask = pdfjs.getDocument(pdfUrl);
//       const pdf = await loadingTask.promise;
//       const page = await pdf.getPage(1);
//       const viewport = page.getViewport({ scale: 1.5 });

//       if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         if (context) {
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;
//           await page.render({ canvasContext: context, viewport }).promise;
//         }
//       }
//     };

//     if (pdfUrl) {
//       loadPdf();
//     }
//   }, [pdfUrl]);

//   return <canvas ref={canvasRef}></canvas>;
// };

// export default FileViewer;