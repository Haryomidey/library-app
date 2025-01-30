import { Viewer, Worker, DocumentLoadEvent } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useLocation } from "react-router-dom";
import { useFile } from "../contexts/UseFileContext";
import { useState, useEffect } from "react";
import Mammoth from "mammoth";

const FileViewer = () => {
  const location = useLocation();
  const { setFileContent } = useFile();
  const [docxContent, setDocxContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryParams = new URLSearchParams(location.search);
  const fileUrl = queryParams.get("file_url") || "";
  const fileExtension = fileUrl.split(".").pop()?.toLowerCase();
  // const fileUrl = `https://cors-anywhere.herokuapp.com/${proxyUrl}`;

  useEffect(() => {
    if (fileExtension === "docx") {
      fetch(fileUrl)
        .then((res) => res.arrayBuffer())
        .then((data) =>
          Mammoth.convertToHtml({ arrayBuffer: data })
            .then((result: any) => {
              setDocxContent(result.value);
              setLoading(false);
            })
            .catch((error: any) => {
              console.error("Error processing DOCX:", error);
              setLoading(false);
            })
        )
        .catch((error) => {
          console.error("Failed to fetch DOCX file:", error);
          setLoading(false);
        });
    } else if (fileExtension === "pdf") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [fileUrl, fileExtension]);

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setFileContent({
      fileUrl,
      fileType: "pdf",
      pageNum: e.doc.numPages,
    });
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", height: "100vh" }}>
      {loading ? (
        <p>Loading...</p>
      ) : fileExtension === "pdf" ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} onDocumentLoad={handleDocumentLoad} />
        </Worker>
      ) : fileExtension === "docx" && docxContent ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            color: "#333",
            overflowY: "auto",
            height: "100vh",
          }}
          dangerouslySetInnerHTML={{ __html: docxContent }}
        />
      ) : (
        <p>Unsupported file format</p>
      )}
    </div>
  );
};

export default FileViewer;