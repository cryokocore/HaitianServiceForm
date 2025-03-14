import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Checkbox,
  Space,
  Table,
  Tag,
  InputNumber,
} from "antd";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import HaitianLogo from "./Images/HaitianLogo.png";
import "./App.css";
import TextArea from "antd/es/input/TextArea";

message.config({
  duration: 3,
  maxCount: 3,
});

// const reportOptions = [
//   { label: "Installation", value: "Installation" },
//   { label: "Maintenance", value: "Maintenance" },
//   { label: "Defect", value: "Defect" },
//   { label: "Customer Visit", value: "Customer Visit" },
// ];

// const serviceOptions = [
//   { label: "F.O.C Commissioning", value: "F.O.C Commissioning" },
//   { label: "F.O.C Maintenance", value: "F.O.C Maintenance" },
//   { label: "Guarantee", value: "Guarantee" },
//   { label: "Chargeable Commissioning", value: "Chargeable Commissioning" },
//   { label: "Customer Visit", value: "Customer Visit" },
//   { label: "Service contract", value: "Service contract" },
//   { label: "Goodwill", value: "Goodwill" },
// ];

const reportOptions = [
  "Installation",
  "Maintenance",
  "Defect",
  "Customer Visit",
];

const serviceOptions = [
  "F.O.C Commissioning",
  "F.O.C Maintenance",
  "Guarantee",
  "Chargeable Commissioning",
  "Customer Visit",
  "Service contract",
  "Goodwill",
];

export default function FormComponent() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  //   const sigCanvas = useRef();
  //   const [signatureData, setSignatureData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionText, setDescriptionText] = useState(""); 
  const [causeOfFailure, setcauseOfFailure] = useState(""); 
  const [notes, setNotes] = useState(""); 
  const [address, setAddress] = useState("");
  const [serialNumber, setSerialNumber] = useState(""); 
  const [srn, setSRN] = useState(null);
  



  const [data, setData] = useState([
    {
      key: Date.now(),
      partNumber: "",
      description: "",
      quantity: "",
      note: "",
    },
  ]);

  // const handleInputChange = (key, field, value) => {
  //   const updatedData = data.map((row) =>
  //     row.key === key ? { ...row, [field]: value } : row
  //   );
  //   setData(updatedData);
  // };

  // const handleDescriptionTextChange = (e) => {
  //   let value = e.target.value;
  //   let lines = value.split("\n");

  //   // Strictly limit to 4 lines
  //   if (lines.length > 5) {
  //     message.warning("Input is limited to 5 rows. Any text beyond the 5th row will not be added.");
  //     return;
  //   }

  //   // Strictly limit to 200 characters
  //   if (value.length > 200) {
  //     message.warning("Maximum 200 characters allowed!");
  //     return;
  //   }

  //   setDescriptionText(value); // Update state only if within limits
  // };

  
  const handleSerialNumberChange = (e) => {
    let value = e.target.value;
    let lines = value.split("\n");
  
    // Limit strictly to 5 rows
    if (lines.length > 3 || value.length > 100) {
      message.warning("Input limited to 3 lines, 100 characters. Excess text won't be included.");
      value = lines.slice(0, 5).join("\n"); // Trim excess lines
    }
  
    // Limit strictly to 200 characters
    // if (value.length > 200) {
    //   message.warning("Maximum 200 characters allowed!");
    //   value = value.substring(0, 200); // Trim excess characters
    // }
  
    setSerialNumber(value); // Update state only if within limits
  };

  const handleAddressChange = (e) => {
    let value = e.target.value;
    let lines = value.split("\n");
  
    // Limit strictly to 5 rows
    if (lines.length > 4 || value.length > 120) {
      message.warning("Input limited to 4 lines, 120 characters. Excess text won't be included.");
      value = lines.slice(0, 4).join("\n"); // Trim excess lines
    }
  
    // Limit strictly to 200 characters
    // if (value.length > 200) {
    //   message.warning("Maximum 200 characters allowed!");
    //   value = value.substring(0, 200); // Trim excess characters
    // }
  
    setAddress(value); // Update state only if within limits
  };

const handleDescriptionTextChange = (e) => {
  let value = e.target.value;
  let lines = value.split("\n");

  // Limit strictly to 5 rows
  if (lines.length > 5 || value.length > 200) {
    message.warning("Input limited to 5 lines, 200 characters. Excess text won't be included.");
    value = lines.slice(0, 5).join("\n"); // Trim excess lines
  }

  // Limit strictly to 200 characters
  // if (value.length > 200) {
  //   message.warning("Maximum 200 characters allowed!");
  //   value = value.substring(0, 200); // Trim excess characters
  // }

  setDescriptionText(value); // Update state only if within limits
};

const handleCauseTextChange = (e) => {
  let value = e.target.value;
  let lines = value.split("\n");

  // Limit strictly to 5 rows
  if (lines.length > 3 || value.length >100) {
    message.warning("Input limited to 3 lines, 100 characters. Excess text won't be included.");
    value = lines.slice(0, 3).join("\n"); // Trim excess lines
  }

  // Limit strictly to 200 characters
  // if (value.length > 200) {
  //   message.warning("Maximum 200 characters allowed!");
  //   value = value.substring(0, 200); // Trim excess characters
  // }

  setcauseOfFailure(value); // Update state only if within limits
};

const handleNotesChange = (e) => {
  let value = e.target.value;
  let lines = value.split("\n");

  // Limit strictly to 5 rows
  if (lines.length > 3 || value.length >100) {
    message.warning("Input limited to 3 lines, 100 characters. Excess text won't be included.");
    value = lines.slice(0, 3).join("\n"); // Trim excess lines
  }

  // Limit strictly to 200 characters
  // if (value.length > 200) {
  //   message.warning("Maximum 200 characters allowed!");  
  //   value = value.substring(0, 200); // Trim excess characters
  // }

  setNotes(value); // Update state only if within limits
};

  // const handleInputChange = (key, field, value) => {
  //   const maxLengths = {
  //     partNumber: 50,
  //     description: 70,
  //     note: 70,
  //   };
  //   const fieldNames = {
  //     partNumber: "Part Number",
  //     description: "Description",
  //     note: "Note",
  //   };

  //   // Check if value exceeds the limit
  //   if (value.length >= maxLengths[field]) {
  //     message.warning(
  //       `${fieldNames[field]} cannot exceed more than ${maxLengths[field]} characters.`
  //     );
  //   }

  //   // Update the state
  //   const updatedData = data.map((row) =>
  //     row.key === key ? { ...row, [field]: value } : row
  //   );
  //   setData(updatedData);
  // };

  const handleInputChange = (key, field, value) => {
    // Directly update numeric values (e.g., Quantity)
    if (field === "quantity") {
      const updatedData = data.map((row) =>
        row.key === key ? { ...row, [field]: value } : row
      );
      setData(updatedData);
      return; // Exit function early for numeric inputs
    }
  
    // Ensure text inputs are handled correctly
    let stringValue = typeof value === "string" ? value : value?.toString() || "";
  
    const maxLengths = {
      partNumber: 30,
      description: 60,
      note: 60,
    };
  
    const maxRows = {
      partNumber: 1,
      description: 1,
      note: 1,
    };
  
    const fieldMessages = {
      partNumber: "Input limited to 1 line, 30 characters. Excess text won't be included.",
      description: "Input limited to 1 line, 60 characters. Excess text won't be included.",
      note: "Input limited to 1 line, 60 characters. Excess text won't be included.",
    };
  
    let lines = stringValue.split("\n");
  
    // Enforce row limits
    if (lines.length > maxRows[field]) {
      message.warning(fieldMessages[field]);
      stringValue = lines.slice(0, maxRows[field]).join("\n");
    }
  
    // Enforce character limits
    if (stringValue.length > maxLengths[field]) {
      message.warning(fieldMessages[field]);
      stringValue = stringValue.substring(0, maxLengths[field]);
    }
  
    // Update the state
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [field]: stringValue } : row
    );
    setData(updatedData);
  };
  
  

  // const handleAddRow = () => {
  //   setData([
  //     ...data,
  //     {
  //       key: Date.now(),
  //       partNumber: "",
  //       description: "",
  //       quantity: "",
  //       note: "",
  //     },
  //   ]);
  // };

  const handleAddRow = () => {
    if (data.length < 4) {
      const newRow = {
        key: (data.length + 1).toString(),
        partNumber: "",
        description: "",
        quantity: "",
        note: "",
      };
      setData([...data, newRow]);
    } else {
      message.warning("Rows cannot exceed more than 4!");
    }
  };

  const handleDeleteRow = (key) => {
    if (data.length > 1) {
      setData(data.filter((row) => row.key !== key)); // Removes row by key
    }
  };

  const validateFields = () => {
    for (const row of data) {
      if (
        !row.partNumber ||
        !row.description ||
        row.quantity === "" ||
        !row.note
      ) {
        message.error("Please fill all required fields!");
        return false;
      }
    }
    return true;
  };

  // const columns = [
  //   {
  //     title: "Part Number",
  //     dataIndex: "partNumber",
  //     key: "partNumber",
  //     render: (_, record) => (
  //       <Input
  //         value={record.partNumber}
  //         onChange={(e) =>
  //           handleInputChange(record.key, "partNumber", e.target.value)
  //         }
  //       />
  //     ),
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //     render: (_, record) => (
  //       <Input
  //         value={record.description}
  //         onChange={(e) =>
  //           handleInputChange(record.key, "description", e.target.value)
  //         }
  //       />
  //     ),
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //     render: (_, record) => (
  //       <InputNumber
  //         min={1} // Prevents negative or zero values
  //         value={record.quantity}
  //         onChange={(value) => handleInputChange(record.key, "quantity", value)}
  //         style={{ width: "100%" }}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Note",
  //     dataIndex: "note",
  //     key: "note",
  //     render: (_, record) => (
  //       <Input
  //         value={record.note}
  //         onChange={(e) =>
  //           handleInputChange(record.key, "note", e.target.value)
  //         }
  //       />
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <Button type="primary" onClick={handleAddRow}>
  //           Add
  //         </Button>
  //         <Button
  //           type="primary"
  //           danger
  //           onClick={() => handleDeleteRow(record.key)}
  //           disabled={data.length === 1} // Disables delete button if only one row exists
  //         >
  //           Delete
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      key: "partNumber",
      width: "25%", // Adjust as needed
      render: (_, record) => (
        <Input
          value={record.partNumber}
          onChange={(e) =>
            handleInputChange(record.key, "partNumber", e.target.value)
          }
          placeholder="Enter the part number"
          maxLength={50}
          // showCount
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "35%", // Increased size
      render: (_, record) => (
        <TextArea
          value={record.description}
          onChange={(e) =>
            handleInputChange(record.key, "description", e.target.value)
          }
          rows={1}
          placeholder="Enter the description"
          maxLength={100}
          // showCount
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%", // Reduced size
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleInputChange(record.key, "quantity", value)}
          style={{ width: "100%" }}
          placeholder="Qty"
        />
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "30%", // Increased size
      render: (_, record) => (
        <TextArea
          value={record.note}
          onChange={(e) =>
            handleInputChange(record.key, "note", e.target.value)
          }
          placeholder="Enter the note"
          maxLength={100}
          // showCount
          rows={1}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "15%", // Reduced size
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={handleAddRow} disabled={isSubmitting}>
            Add
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteRow(record.key)}
            disabled={isSubmitting || data.length === 1}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];


  // const fetchSRN = async () => {
  //   const response = await fetch("https://script.google.com/macros/s/AKfycbxXxFiz19o9ZcIoZQJzOdmTfzPlmmnoSJKwtpztPclLm68221hH0KgJk2FBrYqHHc8G/exec");
  //   const result = await response.json();
  //   setSRN(result.srn || 1); // Set SRN in the UI
  // };

  const sigTechnician = useRef();
  const sigManager = useRef();
  const sigCustomer = useRef();

  // Separate state for each signature
  const [signatureTechnician, setSignatureTechnician] = useState("");
  const [signatureManager, setSignatureManager] = useState("");
  const [signatureCustomer, setSignatureCustomer] = useState("");

  const updateCanvasSize = () => {
    setCanvasSize({ width: window.innerWidth < 768 ? 300 : 400, height: 200 });
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Separate functions for saving and clearing each signature

  // Service Technician Signature
  const saveTechnicianSignature = () => {
    if (sigTechnician.current && !sigTechnician.current.isEmpty()) {
      setSignatureTechnician(
        sigTechnician.current.getCanvas().toDataURL("image/png")
      );
      message.success("Technician Signature saved successfully!");
    } else {
      message.error("Please draw a signature before saving.");
    }
  };
  const clearTechnicianSignature = () => {
    sigTechnician.current.clear();
    setSignatureTechnician("");
  };

  // Service Manager Signature
  const saveManagerSignature = () => {
    if (sigManager.current && !sigManager.current.isEmpty()) {
      setSignatureManager(
        sigManager.current.getCanvas().toDataURL("image/png")
      );
      message.success("Manager Signature saved successfully!");
    } else {
      message.error("Please draw a signature before saving.");
    }
  };
  const clearManagerSignature = () => {
    sigManager.current.clear();
    setSignatureManager("");
  };

  // Customer Signature
  const saveCustomerSignature = () => {
    if (sigCustomer.current && !sigCustomer.current.isEmpty()) {
      setSignatureCustomer(
        sigCustomer.current.getCanvas().toDataURL("image/png")
      );
      message.success("Customer Signature saved successfully!");
    } else {
      message.error("Please draw a signature before saving.");
    }
  };
  const clearCustomerSignature = () => {
    sigCustomer.current.clear();
    setSignatureCustomer("");
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     // Validate form fields
  //     await form.validateFields();

  //     // Check if the table has at least one row filled
  //     if (data.length === 0) {
  //       message.error("Please add at least one part in the table.");
  //       return;
  //     }

  //     // Check if all table fields are filled
  //     const isTableValid = data.every(
  //       (row) =>
  //         row.partNumber &&
  //         row.partNumber.trim() !== "" &&
  //         row.description &&
  //         row.description.trim() !== "" &&
  //         row.quantity !== "" &&
  //         !isNaN(row.quantity) && // Ensure quantity is a valid number
  //         row.note &&
  //         row.note.trim() !== ""
  //     );

  //     if (!isTableValid) {
  //       message.error(
  //         "Please fill all required fields in the table correctly."
  //       );
  //       return;
  //     }

  //     if (!signatureTechnician) {
  //       message.error(
  //         "Please provide the Service Technician signature and click 'Save Signature'."
  //       );
  //       return;
  //     }
  //     if (!signatureManager) {
  //       message.error(
  //         "Please provide the Service Manager signature and click 'Save Signature'."
  //       );
  //       return;
  //     }
  //     if (!signatureCustomer) {
  //       message.error(
  //         "Please provide the Customer signature and click 'Save Signature'."
  //       );
  //       return;
  //     }

  //     // Prepare final form data
  //     const formData = {
  //       ...values,
  //       partsUsed: data.map((row) => ({
  //         partNumber: row.partNumber.trim(),
  //         description: row.description.trim(),
  //         quantity: Number(row.quantity),
  //         note: row.note.trim(),
  //       })),
  //       signatures: {
  //         technician: signatureTechnician,
  //         manager: signatureManager,
  //         customer: signatureCustomer,
  //       },
  //     };

  //     console.log("Final Submission Data:", formData);

  //     // Simulate API call
  //     // await axios.post("/api/submit", formData);
  //     message.success("Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Validation Error:", error);
  //     message.error("Please complete all required fields before submitting.");
  //   }
  // };

  const getBase64Image = (imgUrl, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Important for external images
    img.src = imgUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png"); // Convert to Base64
      callback(dataURL);
    };
  };

  // const generatePDF = (formData, checkboxValues, partsUsed) => {
  //   const doc = new jsPDF();
  //   const startX = 20; // Left margin
  //   const colWidths = [40, 60, 20, 50]; // Column widths
  //   const rowHeight = 8; // Row height
  //   const pageHeight = doc.internal.pageSize.height; // ✅ Move this to the top
  //   let pageNumber = 1; // Start page numbering
  //   const bottomMargin = 30;
  //   const headerPadding = 10;

  //   const addPageNumber = () => {
  //     doc.setFontSize(10);
  //     doc.text(
  //       `Page ${pageNumber}`,
  //       doc.internal.pageSize.width / 2,
  //       pageHeight - 10,
  //       { align: "center" }
  //     );
  //     pageNumber++; // Increment for next page
  //   };

  //   // Function to check if a new page is needed
  //   const checkPageLimit = (currentY) => {
  //     if (currentY + bottomMargin > pageHeight) {
  //       addPageNumber();
  //       doc.addPage();
  //       resetHeader();

  //       return 20 + headerPadding;
  //     }
  //     return currentY;
  //   };
  //   const resetHeader = () => {
  //     // doc.setFont("helvetica", "normal");
  //     // doc.setFontSize(14);
  //     // doc.text("Service Report", 90, 10);
  //     // doc.setDrawColor(0, 0, 0);
  //     // doc.setLineWidth(0.5);
  //     // doc.line(20, 15, 190, 15);
  //     doc.addImage(HaitianLogo, "PNG", 18, 1, 50, 20);
  //     doc.setFont("helvetica", "normal");
  //     doc.setFontSize(14);
  //     doc.text("Service No", 160, 12);
  //     doc.setDrawColor(0, 0, 0);
  //     doc.setLineWidth(0.5);
  //     doc.line(20, 22, 190, 22);
  //   };

  //   let nextY = 35 + headerPadding; // Start Y position
  //   resetHeader();
  //   // Ensure nextY is properly updated before adding content
  //   nextY = checkPageLimit(nextY);

  //   const getBase64Image = (imgUrl, callback) => {
  //     const img = new Image();
  //     img.crossOrigin = "Anonymous";
  //     img.src = imgUrl;
  //     img.onload = function () {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       const dataURL = canvas.toDataURL("image/png");
  //       callback(dataURL);
  //     };
  //   };

  //   getBase64Image(HaitianLogo, (base64Image) => {
  //     // doc.addImage(base64Image, "PNG", 18, 1, 50, 20);
  //     // doc.setFont("helvetica", "normal");

  //     // // Header
  //     // doc.setFontSize(12);
  //     // doc.text("Service No", 160, 12);
  //     // doc.setDrawColor(0, 0, 0);
  //     // doc.setLineWidth(0.5);
  //     // doc.line(20, 22, 190, 22);

  //     let nextY = 35; // Starting Y position

  //     // Function to add text fields dynamically
  //     const addField = (label, value, x, y, extraSpace = 12) => {
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       doc.text(label, x, y);
  //       doc.setFont("helvetica", "normal");
  //       doc.text(value?.toString() || "N/A", x, y + 6);
  //       return y + extraSpace;
  //     };

  //     nextY = addField("Customer Name", formData.customerName, 20, 30, 16);
  //     nextY = addField("Machine Type", formData.machineType, 150, 30, 16);

  //     // Address and Serial Number
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Address", 20, nextY);
  //     doc.text("Serial Number", 150, nextY);

  //     doc.setFont("helvetica", "normal");

  //     const maxAddressWidth = 80;
  //     const addressLines = doc.splitTextToSize(
  //       formData.address?.toString() || "N/A",
  //       maxAddressWidth
  //     );

  //     let addressStartY = nextY + 6;
  //     let addressLineHeight = 7;

  //     addressLines.forEach((line, index) => {
  //       doc.text(line, 20, addressStartY + index * addressLineHeight);
  //     });

  //     doc.text(formData.serialNumber?.toString() || "N/A", 150, nextY + 6);

  //     let addressHeight = addressLines.length * addressLineHeight;
  //     nextY += addressHeight + 12;

  //     // Contact and Installation Date
  //     const formattedInstallDate = formData.installationDate
  //       ? new Date(formData.installationDate).toLocaleDateString()
  //       : "N/A";

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Contact", 20, nextY);
  //     doc.text("Installation Date", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.contact?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formattedInstallDate, 150, nextY + 6);

  //     nextY += 15;

  //     // Telephone and Work Time
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Telephone", 20, nextY);
  //     doc.text("Work Time", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.telephone?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formData.workTime?.toString() || "N/A", 150, nextY + 6);

  //     nextY += 15;

  //     // Service Technician, Departure Date, Return Date
  //     const formattedDepartureDate = formData.departureDate
  //       ? new Date(formData.departureDate).toLocaleDateString()
  //       : "N/A";

  //     const formattedReturnDate = formData.returnDate
  //       ? new Date(formData.returnDate).toLocaleDateString()
  //       : "N/A";

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");

  //     doc.text("Service Technician", 20, nextY);
  //     doc.text("Departure Date", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.serviceTechnician?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formattedDepartureDate, 150, nextY + 6);

  //     nextY += 15; // Move to the next row for Return Date

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Return Date", 20, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formattedReturnDate, 20, nextY + 6);

  //     nextY += 15;

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Report Type", 20, nextY);

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");

  //     const reportOptions = [
  //       "Installation",
  //       "Maintenance",
  //       "Defect",
  //       "Customer Visit",
  //     ];

  //     let optionX = 20;
  //     const spaceBetweenOptions = 40;

  //     console.log("checkboxValues:", checkboxValues); // Debugging checkbox values

  //     reportOptions.forEach((option) => {
  //       const isChecked = checkboxValues[option]; // Check if the option is selected in checkboxValues
  //       if (isChecked) {
  //         // Draw a border around the checkbox
  //         doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
  //       } else {
  //         doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
  //       }
  //       // Set font for checkbox symbols
  //       doc.setFont("Zapfdingbats"); // Set Zapfdingbats font

  //       // Use symbol for checked ('4') and unchecked ('o')
  //       const symbol = isChecked ? "4" : ""; // '4' for tick, 'o' for empty
  //       doc.text(`${symbol}`, optionX + 1.3, nextY + 8);

  //       doc.setFont("helvetica", "normal");

  //       doc.text(option, optionX + 6, nextY + 8);
  //       optionX += spaceBetweenOptions;
  //     });

  //     // let nextY = 35; // Start Y position

  //     // Render content dynamically
  //     // nextY = checkPageLimit(nextY); // Ensure space before adding content

  //     nextY += 18;
  //     // nextY = checkPageLimit(nextY);
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Description of work/of defect/failure mode", 20, nextY);
  //     nextY -= 1;
  //     const maxDescriptionWidth = 170;
  //     doc.setFont("helvetica", "normal");
  //     const description = doc.splitTextToSize(
  //       formData.description?.toString() || "N/A",
  //       maxDescriptionWidth
  //     );
  //     let descriptionStartY = nextY + 6;
  //     let descriptionLineHeight = 7;
  //     doc.setFont("helvetica", "normal");

  //     // description.forEach((line, index) => {
  //     //   doc.text(line, 20, descriptionStartY + index * descriptionLineHeight);
  //     // });
  //     description.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     // Ensure 'nextY' is updated dynamically after the description section
  //     // nextY =
  //     //   descriptionStartY + description.length * descriptionLineHeight + 3; // Add extra space
  //     nextY += 10;

  //     // Check if the notes section fits on the current page

  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 30);

  //     // Now add the Notes section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Notes/Further action required", 20, nextY);
  //     nextY -= 1;

  //     // Ensure notes are properly split into lines
  //     const maxNotesWidth = 170;
  //     doc.setFont("helvetica", "normal");

  //     const notesText = formData.notes?.toString() || "N/A";

  //     const notesLines = doc.splitTextToSize(notesText, maxNotesWidth);

  //     let notesStartY = nextY + 6; // Add extra space below the title
  //     let notesLineHeight = 7;

  //     // Render each line dynamically
  //     // notesLines.forEach((line, index) => {
  //     //   doc.text(line, 20, notesStartY + index * notesLineHeight);
  //     // });

  //     notesLines.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     nextY += 10;

  //     // Check if the notes section fits on the current page

  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 30);

  //     // Now add the Notes section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Cause of Failure", 20, nextY);
  //     nextY -= 1;

  //     // Ensure notes are properly split into lines
  //     const maxcauseOfFailureWidth = 170;
  //     doc.setFont("helvetica", "normal");

  //     const causeOfFailureText = formData.causeOfFailure?.toString() || "N/A";

  //     const causeOfFailureLines = doc.splitTextToSize(
  //       causeOfFailureText,
  //       maxcauseOfFailureWidth
  //     );

  //     let causeOfFailureStartY = nextY + 6; // Add extra space below the title
  //     let causeOfFailureLineHeight = 7;

  //     // Render each line dynamically
  //     // notesLines.forEach((line, index) => {
  //     //   doc.text(line, 20, notesStartY + index * notesLineHeight);
  //     // });

  //     causeOfFailureLines.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     // nextY += 10;

  //     // if (nextY + 20 > pageHeight) {
  //     //   doc.addPage(); // Add a new page if there's not enough space
  //     //   nextY = 15; // Reset Y position for new page
  //     //   addPageNumber();
  //     // }
  //     // nextY = checkPageLimit(nextY, 30);

  //     // // Now add the Notes section
  //     // doc.setFontSize(14);
  //     // doc.setFont("helvetica", "bold");
  //     // doc.text("Parts Used", 20, nextY);

  //     // partsUsed.forEach((part) => {
  //     //   doc.setFontSize(14);
  //     //   doc.setFont("helvetica", "bold");
  //     //   doc.text("Part Number", 20, nextY + 10);
  //     //   doc.setFont("helvetica", "normal");

  //     //   doc.text(part.partNumber, 20, nextY + 16); // ✅ Fix: Make sure part exists
  //     //   doc.text(part.description, 60, nextY + 16); // Example: Add part description
  //     //   doc.text(part.quantity.toString(), 120, nextY + 16); // Example: Add quantity

  //     //   nextY += 10; // Move Y down for the next part
  //     // });

  //     const addPageNumber = () => {
  //       doc.setFontSize(10);
  //       doc.setFont("helvetica", "normal");

  //       doc.text(
  //         `Page ${pageNumber}`,
  //         doc.internal.pageSize.width / 2,
  //         pageHeight - 10,
  //         { align: "center" }
  //       );
  //       pageNumber++;
  //       doc.setFont("helvetica", "normal");
  //     };

  //     // Function to draw table headers
  //     const drawTableHeaders = () => {
  //       doc.setFontSize(12);
  //       doc.setFont("helvetica", "bold");

  //       doc.text("Part Number", startX + 2, nextY + 5);
  //       doc.text("Description", startX + colWidths[0] + 2, nextY + 5);
  //       doc.text(
  //         "Quantity",
  //         startX + colWidths[0] + colWidths[1] + 2,
  //         nextY + 5
  //       );
  //       doc.text(
  //         "Note",
  //         startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
  //         nextY + 5
  //       );

  //       doc.rect(startX, nextY, colWidths[0], rowHeight);
  //       doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
  //       doc.rect(
  //         startX + colWidths[0] + colWidths[1],
  //         nextY,
  //         colWidths[2],
  //         rowHeight
  //       );
  //       doc.rect(
  //         startX + colWidths[0] + colWidths[1] + colWidths[2],
  //         nextY,
  //         colWidths[3],
  //         rowHeight
  //       );

  //       nextY += rowHeight;
  //     };

  //     // **Ensure space before table starts**
  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage();
  //       doc.setFont("helvetica", "normal");
  //       nextY = 25;
  //       resetHeader();
  //       addPageNumber();
  //     }
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Parts Used", startX, nextY + 10);
  //     nextY += 13;
  //     drawTableHeaders();

  //     doc.setFont("helvetica", "normal");

  //     // **Loop Through Parts and Print Rows**
  //     // partsUsed.forEach((part) => {
  //     //   let partNumberLines = doc.splitTextToSize(
  //     //     part.partNumber || "N/A",
  //     //     colWidths[0] - 5
  //     //   );
  //     //   let descriptionLines = doc.splitTextToSize(
  //     //     part.description || "N/A",
  //     //     colWidths[1] - 5
  //     //   );
  //     //   let quantityLines = doc.splitTextToSize(
  //     //     part.quantity.toString() || "N/A",
  //     //     colWidths[2] - 5
  //     //   );
  //     //   let noteLines = doc.splitTextToSize(
  //     //     part.note || "N/A",
  //     //     colWidths[3] - 5
  //     //   );

  //     //   let maxLines = Math.max(
  //     //     partNumberLines.length,
  //     //     descriptionLines.length,
  //     //     quantityLines.length,
  //     //     noteLines.length
  //     //   );
  //     //   let rowHeightTotal = maxLines * rowHeight;

  //     //   // **Ensure the full row fits on the current page**
  //     //   if (nextY + rowHeightTotal > pageHeight - 30) {
  //     //     addPageNumber(); // Add page number before adding a new page
  //     //     doc.setFont("helvetica", "normal");
  //     //     doc.addPage();
  //     //     nextY = 25;
  //     //     resetHeader();
  //     //     drawTableHeaders();
  //     //   }
  //     //   doc.setFont("helvetica", "normal");

  //     //   // **Print each wrapped line dynamically**
  //     //   // for (let i = 0; i < maxLines; i++) {
  //     //   //   if (partNumberLines[i])
  //     //   //     doc.text(partNumberLines[i], startX + 2, nextY + 5);
  //     //   //   if (descriptionLines[i])
  //     //   //     doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
  //     //   //   if (quantityLines[i])
  //     //   //     doc.text(
  //     //   //       quantityLines[i],
  //     //   //       startX + colWidths[0] + colWidths[1] + 2,
  //     //   //       nextY + 5
  //     //   //     );
  //     //   //   if (noteLines[i])
  //     //   //     doc.text(
  //     //   //       noteLines[i],
  //     //   //       startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
  //     //   //       nextY + 5
  //     //   //     );
  //     //   //   nextY += rowHeight;
  //     //   // }

  //     //   for (let i = 0; i < maxLines; i++) {
  //     //     // ✅ **Check if we need to add a new page before printing each line**
  //     //     if (nextY + rowHeight > pageHeight - 30) {
  //     //       addPageNumber();
  //     //       doc.addPage();
  //     //       nextY = 25;
  //     //       resetHeader();
  //     //       drawTableHeaders();
  //     //     }

  //     //     // ✅ **Now print the text in the correct column positions**
  //     //     if (partNumberLines[i]) doc.text(partNumberLines[i], startX + 2, nextY + 5);
  //     //     if (descriptionLines[i]) doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
  //     //     if (quantityLines[i]) doc.text(quantityLines[i], startX + colWidths[0] + colWidths[1] + 2, nextY + 5);
  //     //     if (noteLines[i]) doc.text(noteLines[i], startX + colWidths[0] + colWidths[1] + colWidths[2] + 2, nextY + 5);

  //     //     nextY += rowHeight; // Move Y position down
  //     //   }

  //     //   // **Draw Borders Around Each Row**
  //     //   doc.rect(startX, nextY - rowHeightTotal, colWidths[0], rowHeightTotal);
  //     //   doc.rect(
  //     //     startX + colWidths[0],
  //     //     nextY - rowHeightTotal,
  //     //     colWidths[1],
  //     //     rowHeightTotal
  //     //   );
  //     //   doc.rect(
  //     //     startX + colWidths[0] + colWidths[1],
  //     //     nextY - rowHeightTotal,
  //     //     colWidths[2],
  //     //     rowHeightTotal
  //     //   );
  //     //   doc.rect(
  //     //     startX + colWidths[0] + colWidths[1] + colWidths[2],
  //     //     nextY - rowHeightTotal,
  //     //     colWidths[3],
  //     //     rowHeightTotal
  //     //   );
  //     // });

  //     //100% Working code

  //     partsUsed.forEach((part) => {
  //       let partNumberLines = doc.splitTextToSize(
  //         part.partNumber || "N/A",
  //         colWidths[0] - 5
  //       );
  //       let descriptionLines = doc.splitTextToSize(
  //         part.description || "N/A",
  //         colWidths[1] - 5
  //       );
  //       let quantityLines = doc.splitTextToSize(
  //         part.quantity.toString() || "N/A",
  //         colWidths[2] - 5
  //       );
  //       let noteLines = doc.splitTextToSize(
  //         part.note || "N/A",
  //         colWidths[3] - 5
  //       );

  //       let maxLines = Math.max(
  //         partNumberLines.length,
  //         descriptionLines.length,
  //         quantityLines.length,
  //         noteLines.length
  //       );
  //       let rowHeightTotal = maxLines * rowHeight;

  //       // **Ensure bottom margin of 30px is maintained**
  //       if (nextY + rowHeightTotal > pageHeight - 30) {
  //         addPageNumber();
  //         doc.addPage();
  //         nextY = 25;
  //         resetHeader();
  //         drawTableHeaders();
  //       }

  //       // **Print each wrapped line dynamically**
  //       // for (let i = 0; i < maxLines; i++) {
  //       //   // ✅ **Check if we need to add a new page before printing each line**
  //       //   if (nextY + rowHeight > pageHeight - 30) {
  //       //     addPageNumber();
  //       //     doc.addPage();
  //       //     nextY = 25;
  //       //     resetHeader();
  //       //     drawTableHeaders();
  //       //   }

  //       // ✅ **Now print the text in the correct column positions**
  //       //   if (partNumberLines[i]) doc.text(partNumberLines[i], startX + 2, nextY + 5);
  //       //   if (descriptionLines[i]) doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
  //       //   if (quantityLines[i]) doc.text(quantityLines[i], startX + colWidths[0] + colWidths[1] + 2, nextY + 5);
  //       //   if (noteLines[i]) doc.text(noteLines[i], startX + colWidths[0] + colWidths[1] + colWidths[2] + 2, nextY + 5);

  //       //   nextY += rowHeight; // Move Y position down
  //       // }

  //       // ✅ **Draw Borders Around Each Row AFTER ensuring it fits within the page**
  //       // doc.rect(startX, nextY - rowHeightTotal, colWidths[0], rowHeightTotal);
  //       // doc.rect(startX + colWidths[0], nextY - rowHeightTotal, colWidths[1], rowHeightTotal);
  //       // doc.rect(startX + colWidths[0] + colWidths[1], nextY - rowHeightTotal, colWidths[2], rowHeightTotal);
  //       // doc.rect(startX + colWidths[0] + colWidths[1] + colWidths[2], nextY - rowHeightTotal, colWidths[3], rowHeightTotal);

  //       // ✅ Print each wrapped line dynamically with borders
  //       for (let i = 0; i < maxLines; i++) {
  //         // ✅ Check if we need to add a new page before printing each line
  //         if (nextY + rowHeight > pageHeight - 30) {
  //           doc.setFontSize(12);
  //           doc.setFont("helvetica", "normal");
  //           addPageNumber();
  //           doc.addPage();
  //           nextY = 25;
  //           resetHeader();
  //           drawTableHeaders();
  //         }
  //         doc.setFontSize(12);
  //         doc.setFont("helvetica", "normal");

  //         // ✅ Print the text in the correct column positions
  //         if (partNumberLines[i])
  //           doc.text(partNumberLines[i], startX + 2, nextY + 5);
  //         if (descriptionLines[i])
  //           doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
  //         if (quantityLines[i])
  //           doc.text(
  //             quantityLines[i],
  //             startX + colWidths[0] + colWidths[1] + 2,
  //             nextY + 5
  //           );
  //         if (noteLines[i])
  //           doc.text(
  //             noteLines[i],
  //             startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
  //             nextY + 5
  //           );

  //         // ✅ Draw borders for the current line
  //         doc.rect(startX, nextY, colWidths[0], rowHeight);
  //         doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
  //         doc.rect(
  //           startX + colWidths[0] + colWidths[1],
  //           nextY,
  //           colWidths[2],
  //           rowHeight
  //         );
  //         doc.rect(
  //           startX + colWidths[0] + colWidths[1] + colWidths[2],
  //           nextY,
  //           colWidths[3],
  //           rowHeight
  //         );

  //         nextY += rowHeight; // Move Y position down
  //       }
  //     });

  //     // nextY += 9;
  //     // if (nextY + 20 > pageHeight) {
  //     //   doc.addPage(); // Add a new page if there's not enough space
  //     //   nextY = 15; // Reset Y position for new page
  //     //   addPageNumber();
  //     // }
  //     // nextY = checkPageLimit(nextY, 30);

  //     // doc.setFontSize(14);
  //     // doc.setFont("helvetica", "bold");
  //     // doc.text("Service Type", 20, nextY);
  //     // nextY -= 2;

  //     // doc.setFontSize(12);
  //     // doc.setFont("helvetica", "normal");

  //     // const serviceOptions = [
  //     //   "F.O.C Commissioning",
  //     //   "F.O.C Maintenance",
  //     //   "Guarantee",
  //     //   "Chargeable Commissioning",
  //     //   "Customer Visit",
  //     //   "Service contract",
  //     //   "Goodwill",
  //     // ];

  //     // let optionServiceX = 20;
  //     // const spaceBetweenServiceOptions = 65; // ✅ Adjusted for better spacing
  //     // const checkboxSize = 4.5; // ✅ Standardized checkbox size

  //     // serviceOptions.forEach((option, index) => {
  //     //   if (index % 3 === 0 && index !== 0) {
  //     //     nextY += 8; // ✅ Move to the next line after 3 checkboxes
  //     //     optionServiceX = 20; // Reset X position
  //     //   }

  //     //   const isChecked = checkboxValues[option] || false; // ✅ Ensure it handles undefined values

  //     //   // Draw the checkbox border
  //     //   doc.rect(optionServiceX + 1, nextY + 4.5, checkboxSize, checkboxSize);

  //     //   // Draw the checkmark inside the box (if selected)
  //     //   if (isChecked) {
  //     //     doc.setFont("Zapfdingbats"); // ✅ Ensures proper checkmark rendering
  //     //     doc.text("4", optionServiceX + 1.5, nextY + 8);
  //     //     doc.setFont("helvetica", "normal"); // Reset font after checkmark
  //     //   }

  //     //   // Draw the text next to the checkbox
  //     //   doc.text(option, optionServiceX + checkboxSize + 2, nextY + 8);

  //     //   optionServiceX += spaceBetweenServiceOptions; // Move to the next option position
  //     // });

  //     // Move down for spacing before the section
  //     //

  //     // Service Options Array (Defined Early)
  //     const serviceOptions = [
  //       "F.O.C Commissioning",
  //       "F.O.C Maintenance",
  //       "Guarantee",
  //       "Chargeable Commissioning",
  //       "Customer Visit",
  //       "Service contract",
  //       "Goodwill",
  //     ];

  //     // Move down for spacing before the section
  //     nextY += 12;

  //     // Calculate total height for the Service Type section
  //     const serviceTypeTitleHeight = 14; // Title height
  //     const checkboxLineHeight = 7; // Height for each line of checkboxes
  //     const numberOfLines = Math.ceil(serviceOptions.length / 3); // Calculate how many lines of checkboxes are needed
  //     const estimatedHeight =
  //       serviceTypeTitleHeight + numberOfLines * checkboxLineHeight + 5; // Extra space

  //     // Check if the entire "Service Type" section will fit on the current page
  //     if (nextY + estimatedHeight > pageHeight - 30) {
  //       addPageNumber(); // ✅ Add page number before a new page
  //       doc.addPage(); // ✅ Add a new page if there's not enough space
  //       nextY = 25; // ✅ Reset Y position for new page
  //       resetHeader(); // ✅ Reset the header on the new page
  //     }

  //     // Service Type Section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Service Type", 20, nextY + 5);
  //     nextY += 4; // Space after the title

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");

  //     let optionServiceX = 20;
  //     const spaceBetweenServiceOptions = 65;
  //     const checkboxSize = 4.5;

  //     serviceOptions.forEach((option, index) => {
  //       // Check for line break after every 3 options
  //       if (index % 3 === 0 && index !== 0) {
  //         nextY += 7; // Move down for the next line of options
  //         optionServiceX = 20;

  //         // Ensure the entire line fits within the page
  //         if (nextY + 20 > pageHeight - 30) {
  //           addPageNumber(); // ✅ Add page number before a new page
  //           doc.addPage(); // ✅ Add a new page if there's not enough space
  //           nextY = 25; // ✅ Reset Y position for new page
  //           resetHeader(); // ✅ Reset the header on the new page
  //           doc.setFontSize(14);
  //           doc.setFont("helvetica", "bold");
  //           doc.text("Service Type (Continued)", 20, nextY); // ✅ Continued title
  //           nextY += 4;
  //         }
  //       }

  //       // Draw the checkbox border
  //       doc.rect(optionServiceX + 1, nextY + 4.5, checkboxSize, checkboxSize);

  //       // Draw the checkmark inside the box (if selected)
  //       const isChecked = checkboxValues[option] || false;
  //       if (isChecked) {
  //         doc.setFont("Zapfdingbats");
  //         doc.text("4", optionServiceX + 1.5, nextY + 8);
  //         doc.setFont("helvetica", "normal");
  //       }

  //       // Draw the text next to the checkbox
  //       doc.text(option, optionServiceX + checkboxSize + 2, nextY + 8);

  //       optionServiceX += spaceBetweenServiceOptions;
  //     });

  //     // Add Signatures Section
  //     nextY += 9;
  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 10);

  //     // const addSignatures = (signatures, nextY) => {
  //     //   doc.setFontSize(12);
  //     //   doc.setFont("helvetica", "bold");
  //     //   // doc.text("Signatures:", 20, nextY);
  //     //   nextY += 0; // Adjust spacing

  //     //   let signatureHeight = 20; // Signature box height
  //     //   let signatureWidth = 50; // Signature box width
  //     //   let signatureSpacing = 65; // Space between signatures
  //     //   let baseY = nextY + 5; // Adjusted position for images

  //     //   // Column positions
  //     //   let col1X = 20;   // Left column (Technician)
  //     //   let col2X = 90;   // Center column (Manager)
  //     //   let col3X = 160;  // Right column (Customer)

  //     //   // Technician Signature
  //     //   if (signatures.technician) {
  //     //     doc.text("Service Technician:", col1X, nextY);
  //     //     doc.addImage(signatures.technician, "PNG", col1X, baseY, signatureWidth, signatureHeight);
  //     //   }

  //     //   // Manager Signature
  //     //   if (signatures.manager) {
  //     //     doc.text("Service Manager:", col2X, nextY);
  //     //     doc.addImage(signatures.manager, "PNG", col2X, baseY, signatureWidth, signatureHeight);
  //     //   }

  //     //   // Customer Signature
  //     //   if (signatures.customer) {
  //     //     doc.text("Customer Signature:", col3X, nextY);
  //     //     doc.addImage(signatures.customer, "PNG", col3X, baseY, signatureWidth, signatureHeight);
  //     //   }

  //     //   return baseY + signatureHeight + 10; // Ensure next section is correctly positioned
  //     // };

  //     // const addSignatures = (signatures, nextY) => {
  //     //   doc.setFontSize(12);
  //     //   doc.setFont("helvetica", "bold");
  //     //   // doc.text("Signatures:", 20, nextY);
  //     //   nextY += 10; // Adjust spacing

  //     //   let signatureHeight = 30; // Default signature height
  //     //   let signatureWidth = 60; // Signature width
  //     //   let baseY = nextY + 5; // Adjusted Y position for images

  //     //   // Column positions
  //     //   let col1X = 20; // Left column (Technician)
  //     //   let col2X = 110; // Right column (Manager)
  //     //   let col3X = 65; // Centered for Customer in the next row

  //     //   let maxHeightRow1 = signatureHeight; // Track tallest signature in row 1

  //     //   // Row 1: Technician and Manager Signatures
  //     //   if (signatures.technician) {
  //     //     doc.text("Signature of service technician:", col1X, nextY);
  //     //     doc.addImage(
  //     //       signatures.technician,
  //     //       "PNG",
  //     //       col1X,
  //     //       baseY,
  //     //       signatureWidth,
  //     //       signatureHeight
  //     //     );
  //     //   }

  //     //   if (signatures.manager) {
  //     //     doc.text("Signature of service manager:", col2X, nextY);
  //     //     doc.addImage(
  //     //       signatures.manager,
  //     //       "PNG",
  //     //       col2X,
  //     //       baseY,
  //     //       signatureWidth,
  //     //       signatureHeight
  //     //     );
  //     //   }

  //     //   // Dynamically adjust height for row 1 (whichever signature is taller)
  //     //   let technicianHeight = signatures.technician ? signatureHeight : 0;
  //     //   let managerHeight = signatures.manager ? signatureHeight : 0;
  //     //   maxHeightRow1 = Math.max(technicianHeight, managerHeight);

  //     //   nextY = baseY + maxHeightRow1 + 10; // Move to the next row with extra spacing

  //     //   // Row 2: Customer Signature
  //     //   if (signatures.customer) {
  //     //     doc.text("Customer signature:", col3X, nextY);
  //     //     doc.addImage(
  //     //       signatures.customer,
  //     //       "PNG",
  //     //       col3X,
  //     //       nextY + 5,
  //     //       signatureWidth,
  //     //       signatureHeight
  //     //     );
  //     //     nextY += signatureHeight + 10; // Move down for the next section
  //     //   }

  //     //   return nextY; // Return updated Y position for further content
  //     // };

  //     // // Before saving the PDF, call addSignatures()
  //     // nextY = addSignatures(formData.signatures, nextY);

  //     const addSignatures = (signatures, nextY) => {
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");

  //       // Title for Signatures Section
  //       const signatureHeight = 30; // Signature height
  //       const signatureWidth = 60;  // Signature width
  //       const spacing = 5;         // Space between rows and signatures
  //       const titleHeight = 14;     // Height for the title

  //       // Estimate the total height needed for the signature section
  //       const estimatedHeight = titleHeight + signatureHeight * 2 + spacing * 3;

  //       // Check if the entire signature section fits on the current page
  //       if (nextY + estimatedHeight > pageHeight - 30) {
  //           addPageNumber(); // Add page number before creating a new page
  //           doc.addPage();   // Create a new page
  //           nextY = 25;      // Reset Y position for new page
  //           resetHeader();   // Reset header for the new page
  //       }

  //       // Print the Signatures title
  //       nextY += spacing;

  //       // Column positions for the signatures
  //       const col1X = 20;   // Technician signature position
  //       const col2X = 110;  // Manager signature position
  //       const col3X = 20;   // Customer signature position (centered below)

  //       let baseY = nextY + 5; // Adjusted Y position for images
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       // Row 1: Technician and Manager Signatures
  //       if (signatures.technician) {
  //           doc.text("Signature of service technician:", col1X, nextY);
  //           doc.addImage(signatures.technician, "PNG", col1X, baseY, signatureWidth, signatureHeight);
  //       }
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       if (signatures.manager) {
  //           doc.text("Signature of service manager:", col2X, nextY);
  //           doc.addImage(signatures.manager, "PNG", col2X, baseY, signatureWidth, signatureHeight);
  //       }

  //       // Adjust Y for the next row based on the tallest signature in Row 1
  //       nextY = baseY + signatureHeight + spacing;
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       // Row 2: Customer Signature
  //       if (signatures.customer) {
  //           // Check if the customer signature fits on the current page
  //           if (nextY + signatureHeight + spacing > pageHeight - 30) {
  //               addPageNumber(); // Add page number before breaking
  //               doc.addPage();   // Add new page if space is insufficient
  //               nextY = 25;      // Reset Y position for new page
  //               resetHeader();   // Reset header for the new page
  //           }

  //           doc.text("Customer signature:", col3X, nextY);
  //           doc.addImage(signatures.customer, "PNG", col3X, nextY + 5, signatureWidth, signatureHeight);
  //           nextY += signatureHeight + spacing;
  //       }

  //       return nextY; // Return updated Y position for further content
  //   };

  //   // Call the function to add signatures
  //   nextY = addSignatures(formData.signatures, nextY);

  //     resetHeader();
  //     addPageNumber();

  //     doc.save();
  //   });
  // };

  // const generatePDF = (formData, checkboxValues, partsUsed) => {
  //   const doc = new jsPDF();
  //   const startX = 10; // Left margin
  //   const colWidths = [40, 60, 20, 50]; // Column widths
  //   const rowHeight = 8; // Row height
  //   const pageHeight = doc.internal.pageSize.height; // ✅ Move this to the top
  //   let pageNumber = 1; // Start page numbering
  //   const bottomMargin = 30;
  //   const headerPadding = 10;
  //   const addPageNumber = () => {
  //     doc.setFontSize(10);
  //     doc.text(
  //       `Page ${pageNumber}`,
  //       doc.internal.pageSize.width / 2,
  //       pageHeight - 10,
  //       { align: "center" }
  //     );
  //     pageNumber++; // Increment for next page
  //   };
  //   const checkPageLimit = (currentY) => {
  //     if (currentY + bottomMargin > pageHeight) {
  //       addPageNumber();
  //       doc.addPage();
  //       resetHeader();

  //       return 20 + headerPadding;
  //     }
  //     return currentY;
  //   };
  //   const resetHeader = () => {
  //     doc.addImage(HaitianLogo, "PNG", 18, 1, 50, 20);
  //     doc.setFont("helvetica", "normal");
  //     doc.setFontSize(14);
  //     doc.text("Service No", 160, 12);
  //     doc.setDrawColor(0, 0, 0);
  //     doc.setLineWidth(0.5);
  //     doc.line(20, 22, 190, 22);
  //   };

  //   let nextY = 35 + headerPadding; // Start Y position
  //   resetHeader();
  //   nextY = checkPageLimit(nextY);
  //   const getBase64Image = (imgUrl, callback) => {
  //     const img = new Image();
  //     img.crossOrigin = "Anonymous";
  //     img.src = imgUrl;
  //     img.onload = function () {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       const dataURL = canvas.toDataURL("image/png");
  //       callback(dataURL);
  //     };
  //   };

  //   getBase64Image(HaitianLogo, (base64Image) => {
  //     let nextY = 35; // Starting Y position
  //     const addField = (label, value, x, y, extraSpace = 12) => {
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       doc.text(label, x, y);
  //       doc.setFont("helvetica", "normal");
  //       doc.text(value?.toString() || "N/A", x, y + 6);
  //       return y + extraSpace;
  //     };

  //     nextY = addField("Customer Name", formData.customerName, 20, 30, 16);
  //     nextY = addField("Machine Type", formData.machineType, 150, 30, 16);

  //     // Address and Serial Number
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Address", 20, nextY);
  //     doc.text("Serial Number", 150, nextY);

  //     doc.setFont("helvetica", "normal");

  //     const maxAddressWidth = 80;
  //     const addressLines = doc.splitTextToSize(
  //       formData.address?.toString() || "N/A",
  //       maxAddressWidth
  //     );

  //     let addressStartY = nextY + 6;
  //     let addressLineHeight = 7;

  //     addressLines.forEach((line, index) => {
  //       doc.text(line, 20, addressStartY + index * addressLineHeight);
  //     });

  //     doc.text(formData.serialNumber?.toString() || "N/A", 150, nextY + 6);

  //     let addressHeight = addressLines.length * addressLineHeight;
  //     nextY += addressHeight + 12;

  //     // Contact and Installation Date
  //     const formattedInstallDate = formData.installationDate
  //       ? new Date(formData.installationDate).toLocaleDateString()
  //       : "N/A";

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Contact", 20, nextY);
  //     doc.text("Installation Date", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.contact?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formattedInstallDate, 150, nextY + 6);

  //     nextY += 15;

  //     // Telephone and Work Time
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Telephone", 20, nextY);
  //     doc.text("Work Time", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.telephone?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formData.workTime?.toString() || "N/A", 150, nextY + 6);

  //     nextY += 15;

  //     // Service Technician, Departure Date, Return Date
  //     const formattedDepartureDate = formData.departureDate
  //       ? new Date(formData.departureDate).toLocaleDateString()
  //       : "N/A";

  //     const formattedReturnDate = formData.returnDate
  //       ? new Date(formData.returnDate).toLocaleDateString()
  //       : "N/A";

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");

  //     doc.text("Service Technician", 20, nextY);
  //     doc.text("Departure Date", 150, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formData.serviceTechnician?.toString() || "N/A", 20, nextY + 6);
  //     doc.text(formattedDepartureDate, 150, nextY + 6);

  //     nextY += 15; // Move to the next row for Return Date

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Return Date", 20, nextY);

  //     doc.setFont("helvetica", "normal");
  //     doc.text(formattedReturnDate, 20, nextY + 6);

  //     nextY += 15;

  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Report Type", 20, nextY);

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");

  //     const reportOptions = [
  //       "Installation",
  //       "Maintenance",
  //       "Defect",
  //       "Customer Visit",
  //     ];

  //     let optionX = 20;
  //     const spaceBetweenOptions = 40;

  //     console.log("checkboxValues:", checkboxValues); // Debugging checkbox values

  //     reportOptions.forEach((option) => {
  //       const isChecked = checkboxValues[option]; // Check if the option is selected in checkboxValues
  //       if (isChecked) {
  //         // Draw a border around the checkbox
  //         doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
  //       } else {
  //         doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
  //       }
  //       // Set font for checkbox symbols
  //       doc.setFont("Zapfdingbats"); // Set Zapfdingbats font

  //       // Use symbol for checked ('4') and unchecked ('o')
  //       const symbol = isChecked ? "4" : ""; // '4' for tick, 'o' for empty
  //       doc.text(`${symbol}`, optionX + 1.3, nextY + 8);

  //       doc.setFont("helvetica", "normal");

  //       doc.text(option, optionX + 6, nextY + 8);
  //       optionX += spaceBetweenOptions;
  //     });

  //     nextY += 18;
  //     // nextY = checkPageLimit(nextY);
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Description of work/of defect/failure mode", 20, nextY);
  //     nextY -= 1;
  //     const maxDescriptionWidth = 170;
  //     doc.setFont("helvetica", "normal");
  //     const description = doc.splitTextToSize(
  //       formData.description?.toString() || "N/A",
  //       maxDescriptionWidth
  //     );
  //     let descriptionStartY = nextY + 6;
  //     let descriptionLineHeight = 7;
  //     doc.setFont("helvetica", "normal");

  //     description.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     nextY += 10;

  //     // Check if the notes section fits on the current page

  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 30);

  //     // Now add the Notes section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Notes/Further action required", 20, nextY);
  //     nextY -= 1;

  //     // Ensure notes are properly split into lines
  //     const maxNotesWidth = 170;
  //     doc.setFont("helvetica", "normal");

  //     const notesText = formData.notes?.toString() || "N/A";

  //     const notesLines = doc.splitTextToSize(notesText, maxNotesWidth);

  //     let notesStartY = nextY + 6; // Add extra space below the title
  //     let notesLineHeight = 7;

  //     notesLines.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     nextY += 10;

  //     // Check if the notes section fits on the current page

  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 30);

  //     // Now add the Notes section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Cause of Failure", 20, nextY);
  //     nextY -= 1;

  //     // Ensure notes are properly split into lines
  //     const maxcauseOfFailureWidth = 170;
  //     doc.setFont("helvetica", "normal");

  //     const causeOfFailureText = formData.causeOfFailure?.toString() || "N/A";

  //     const causeOfFailureLines = doc.splitTextToSize(
  //       causeOfFailureText,
  //       maxcauseOfFailureWidth
  //     );

  //     let causeOfFailureStartY = nextY + 6; // Add extra space below the title
  //     let causeOfFailureLineHeight = 7;

  //     causeOfFailureLines.forEach((line, index) => {
  //       nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
  //       doc.text(line, 20, nextY);
  //     });

  //     const addPageNumber = () => {
  //       doc.setFontSize(10);
  //       doc.setFont("helvetica", "normal");

  //       doc.text(
  //         `Page ${pageNumber}`,
  //         doc.internal.pageSize.width / 2,
  //         pageHeight - 10,
  //         { align: "center" }
  //       );
  //       pageNumber++;
  //       doc.setFont("helvetica", "normal");
  //     };

  //     // Function to draw table headers
  //     const drawTableHeaders = () => {
  //       doc.setFontSize(12);
  //       doc.setFont("helvetica", "bold");

  //       doc.text("Part Number", startX + 2, nextY + 5);
  //       doc.text("Description", startX + colWidths[0] + 2, nextY + 5);
  //       doc.text(
  //         "Quantity",
  //         startX + colWidths[0] + colWidths[1] + 2,
  //         nextY + 5
  //       );
  //       doc.text(
  //         "Note",
  //         startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
  //         nextY + 5
  //       );

  //       doc.rect(startX, nextY, colWidths[0], rowHeight);
  //       doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
  //       doc.rect(
  //         startX + colWidths[0] + colWidths[1],
  //         nextY,
  //         colWidths[2],
  //         rowHeight
  //       );
  //       doc.rect(
  //         startX + colWidths[0] + colWidths[1] + colWidths[2],
  //         nextY,
  //         colWidths[3],
  //         rowHeight
  //       );

  //       nextY += rowHeight;
  //     };

  //     // **Ensure space before table starts**
  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage();
  //       doc.setFont("helvetica", "normal");
  //       nextY = 25;
  //       resetHeader();
  //       addPageNumber();
  //     }
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Parts Used", startX, nextY + 10);
  //     nextY += 13;
  //     drawTableHeaders();

  //     doc.setFont("helvetica", "normal");

  //     //100% Working code

  //     partsUsed.forEach((part) => {
  //       let partNumberLines = doc.splitTextToSize(
  //         part.partNumber || "N/A",
  //         colWidths[0] - 5
  //       );
  //       let descriptionLines = doc.splitTextToSize(
  //         part.description || "N/A",
  //         colWidths[1] - 5
  //       );
  //       let quantityLines = doc.splitTextToSize(
  //         part.quantity.toString() || "N/A",
  //         colWidths[2] - 5
  //       );
  //       let noteLines = doc.splitTextToSize(
  //         part.note || "N/A",
  //         colWidths[3] - 5
  //       );

  //       let maxLines = Math.max(
  //         partNumberLines.length,
  //         descriptionLines.length,
  //         quantityLines.length,
  //         noteLines.length
  //       );
  //       let rowHeightTotal = maxLines * rowHeight;

  //       // **Ensure bottom margin of 30px is maintained**
  //       if (nextY + rowHeightTotal > pageHeight - 30) {
  //         addPageNumber();
  //         doc.addPage();
  //         nextY = 25;
  //         resetHeader();
  //         drawTableHeaders();
  //       }

  //       // ✅ Print each wrapped line dynamically with borders
  //       for (let i = 0; i < maxLines; i++) {
  //         // ✅ Check if we need to add a new page before printing each line
  //         if (nextY + rowHeight > pageHeight - 30) {
  //           doc.setFontSize(12);
  //           doc.setFont("helvetica", "normal");
  //           addPageNumber();
  //           doc.addPage();
  //           nextY = 25;
  //           resetHeader();
  //           drawTableHeaders();
  //         }
  //         doc.setFontSize(12);
  //         doc.setFont("helvetica", "normal");

  //         // ✅ Print the text in the correct column positions
  //         if (partNumberLines[i])
  //           doc.text(partNumberLines[i], startX + 2, nextY + 5);
  //         if (descriptionLines[i])
  //           doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
  //         if (quantityLines[i])
  //           doc.text(
  //             quantityLines[i],
  //             startX + colWidths[0] + colWidths[1] + 2,
  //             nextY + 5
  //           );
  //         if (noteLines[i])
  //           doc.text(
  //             noteLines[i],
  //             startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
  //             nextY + 5
  //           );

  //         // ✅ Draw borders for the current line
  //         doc.rect(startX, nextY, colWidths[0], rowHeight);
  //         doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
  //         doc.rect(
  //           startX + colWidths[0] + colWidths[1],
  //           nextY,
  //           colWidths[2],
  //           rowHeight
  //         );
  //         doc.rect(
  //           startX + colWidths[0] + colWidths[1] + colWidths[2],
  //           nextY,
  //           colWidths[3],
  //           rowHeight
  //         );

  //         nextY += rowHeight; // Move Y position down
  //       }
  //     });

  //     const serviceOptions = [
  //       "F.O.C Commissioning",
  //       "F.O.C Maintenance",
  //       "Guarantee",
  //       "Chargeable Commissioning",
  //       "Customer Visit",
  //       "Service contract",
  //       "Goodwill",
  //     ];

  //     // Move down for spacing before the section
  //     nextY += 12;

  //     // Calculate total height for the Service Type section
  //     const serviceTypeTitleHeight = 14; // Title height
  //     const checkboxLineHeight = 7; // Height for each line of checkboxes
  //     const numberOfLines = Math.ceil(serviceOptions.length / 3); // Calculate how many lines of checkboxes are needed
  //     const estimatedHeight =
  //       serviceTypeTitleHeight + numberOfLines * checkboxLineHeight + 5; // Extra space

  //     // Check if the entire "Service Type" section will fit on the current page
  //     if (nextY + estimatedHeight > pageHeight - 30) {
  //       addPageNumber(); // ✅ Add page number before a new page
  //       doc.addPage(); // ✅ Add a new page if there's not enough space
  //       nextY = 25; // ✅ Reset Y position for new page
  //       resetHeader(); // ✅ Reset the header on the new page
  //     }

  //     // Service Type Section
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Service Type", 20, nextY + 5);
  //     nextY += 4; // Space after the title

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");

  //     let optionServiceX = 20;
  //     const spaceBetweenServiceOptions = 65;
  //     const checkboxSize = 4.5;

  //     serviceOptions.forEach((option, index) => {
  //       // Check for line break after every 3 options
  //       if (index % 3 === 0 && index !== 0) {
  //         nextY += 7; // Move down for the next line of options
  //         optionServiceX = 20;

  //         // Ensure the entire line fits within the page
  //         if (nextY + 20 > pageHeight - 30) {
  //           addPageNumber(); // ✅ Add page number before a new page
  //           doc.addPage(); // ✅ Add a new page if there's not enough space
  //           nextY = 25; // ✅ Reset Y position for new page
  //           resetHeader(); // ✅ Reset the header on the new page
  //           doc.setFontSize(14);
  //           doc.setFont("helvetica", "bold");
  //           doc.text("Service Type (Continued)", 20, nextY); // ✅ Continued title
  //           nextY += 4;
  //         }
  //       }

  //       // Draw the checkbox border
  //       doc.rect(optionServiceX + 1, nextY + 4.5, checkboxSize, checkboxSize);

  //       // Draw the checkmark inside the box (if selected)
  //       const isChecked = checkboxValues[option] || false;
  //       if (isChecked) {
  //         doc.setFont("Zapfdingbats");
  //         doc.text("4", optionServiceX + 1.5, nextY + 8);
  //         doc.setFont("helvetica", "normal");
  //       }

  //       // Draw the text next to the checkbox
  //       doc.text(option, optionServiceX + checkboxSize + 2, nextY + 8);

  //       optionServiceX += spaceBetweenServiceOptions;
  //     });

  //     // Add Signatures Section
  //     nextY += 9;
  //     if (nextY + 20 > pageHeight) {
  //       doc.addPage(); // Add a new page if there's not enough space
  //       nextY = 15; // Reset Y position for new page
  //       addPageNumber();
  //     }
  //     nextY = checkPageLimit(nextY, 10);

  //     const addSignatures = (signatures, nextY) => {
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");

  //       // Title for Signatures Section
  //       const signatureHeight = 30; // Signature height
  //       const signatureWidth = 60; // Signature width
  //       const spacing = 5; // Space between rows and signatures
  //       const titleHeight = 14; // Height for the title

  //       const estimatedHeight = titleHeight + signatureHeight * 2 + spacing * 3;

  //       // Check if the entire signature section fits on the current page
  //       if (nextY + estimatedHeight > pageHeight - 30) {
  //         addPageNumber(); // Add page number before creating a new page
  //         doc.addPage(); // Create a new page
  //         nextY = 25; // Reset Y position for new page
  //         resetHeader(); // Reset header for the new page
  //       }

  //       // Print the Signatures title
  //       nextY += spacing;

  //       // Column positions for the signatures
  //       const col1X = 20; // Technician signature position
  //       const col2X = 110; // Manager signature position
  //       const col3X = 20; // Customer signature position (centered below)

  //       let baseY = nextY + 5; // Adjusted Y position for images
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       // Row 1: Technician and Manager Signatures
  //       if (signatures.technician) {
  //         doc.text("Signature of service technician:", col1X, nextY);
  //         doc.addImage(
  //           signatures.technician,
  //           "PNG",
  //           col1X,
  //           baseY,
  //           signatureWidth,
  //           signatureHeight
  //         );
  //       }
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       if (signatures.manager) {
  //         doc.text("Signature of service manager:", col2X, nextY);
  //         doc.addImage(
  //           signatures.manager,
  //           "PNG",
  //           col2X,
  //           baseY,
  //           signatureWidth,
  //           signatureHeight
  //         );
  //       }

  //       // Adjust Y for the next row based on the tallest signature in Row 1
  //       nextY = baseY + signatureHeight + spacing;
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       // Row 2: Customer Signature
  //       if (signatures.customer) {
  //         // Check if the customer signature fits on the current page
  //         if (nextY + signatureHeight + spacing > pageHeight - 30) {
  //           addPageNumber(); // Add page number before breaking
  //           doc.addPage(); // Add new page if space is insufficient
  //           nextY = 25; // Reset Y position for new page
  //           resetHeader(); // Reset header for the new page
  //         }

  //         doc.text("Customer signature:", col3X, nextY);
  //         doc.addImage(
  //           signatures.customer,
  //           "PNG",
  //           col3X,
  //           nextY + 5,
  //           signatureWidth,
  //           signatureHeight
  //         );
  //         nextY += signatureHeight + spacing;
  //       }

  //       return nextY; // Return updated Y position for further content
  //     };

  //     // Call the function to add signatures
  //     nextY = addSignatures(formData.signatures, nextY);

  //     resetHeader();
  //     addPageNumber();

  //     doc.save();
  //   });
  // };

  const generatePDF = (formData, checkboxValues, partsUsed) => {
    const doc = new jsPDF();
    // const startX = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = pageWidth - 20;
    // let nextY = 20;

    const labelWidths = {
      Customer: 35,
      Address: 35,
      Contact: 35,
      Telephone: 35,
      "Service Technician": 35,
      "Machine Type": 30,
      "Serial No.": 30,
      "Work Time": 30,
      "Departure Date": 35,
      "Return Date": 30,
      "Installation Date": 30,
    };

    // const addField = (label, value, x, y) => {
    //   // const labelWidth = 25; // Adjust spacing for consistent alignment
    //   const labelWidth = labelWidths[label] || 30; // Default width if not defined

    //   doc.setFontSize(10);

    //   doc.setFont("helvetica", "bold");
    //   doc.text(`${label}:`, x, y);
    //   doc.setFontSize(10);

    //   doc.setFont("helvetica", "normal");
    //   doc.text(value?.toString() || "N/A", x + labelWidth, y);
    //   const wrappedText = doc.splitTextToSize(
    //     value?.toString() || "N/A",
    //     maxWidth
    //   );
    //   doc.text(wrappedText, x + labelWidth, y);

    //   return wrappedText.length * 5;
    // };

    // const addField = (label, value, x, y, maxWidth = 80) => {
    //   const labelWidth = labelWidths[label] || 30; // Label width based on field type
    //   const wrappedText = doc.splitTextToSize(
    //     value?.toString() || "N/A",
    //     maxWidth
    //   ); // Wrap text

    //   doc.setFontSize(11);
    //   doc.setFont("helvetica", "bold");
    //   doc.text(`${label}:`, x, y);
    //   doc.setFont("helvetica", "normal");
    //   doc.text(wrappedText, x + labelWidth, y); // Print text

    //   return wrappedText.length * 4; // Return space occupied for dynamic adjustments
    // };

    const addField = (
      label,
      value,
      x,
      y,
      maxWidth = 80,
      sameLine = false,
      nextColumnX = null
    ) => {
      const labelWidth = labelWidths[label] || 30; // Label width
      const wrappedText = doc.splitTextToSize(
        value?.toString() || "N/A",
        maxWidth
      ); // Wrap text

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, x, y);

      doc.setFont("helvetica", "normal");

      if (sameLine && nextColumnX) {
        doc.text(wrappedText, nextColumnX, y); // Print in the same row (for Telephone & Installation Date)
      } else {
        doc.text(wrappedText, x + labelWidth, y); // Print in the normal format
      }

      return wrappedText.length * 4; // Return space occupied for dynamic adjustments
    };

    // Define positions
    const startX = 10; // Left side
    const rightX = 110; // Right side for machine details
    let nextY = 25; // Starting Y position

    // Header
    doc.addImage(HaitianLogo, "PNG", startX, 5, 40, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Service Report", pageWidth - 60, 12);
    doc.setFontSize(11);
    doc.text(`No. ${formData.reportNumber || "N/A"}`, pageWidth - 60, 18);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(0, 22, 210, 22);

    nextY += 1;
    // Left Side: Customer Details
    addField("Customer", formData.customerName, startX, nextY);
    addField("Machine Type", formData.machineType, rightX, nextY);
    nextY += 1;

    // addField("Address", formData.address, startX, nextY + 5);
    let addressSpaceUsed = addField(
      "Address",
      formData.address,
      startX,
      nextY + 5,
      60
    );
    // nextY += addressSpaceUsed;

    // addField("Serial No.", formData.serialNumber, rightX, nextY+5);
    // nextY += 6;
    let serialSpaceUsed = addField(
      "Serial No.",
      formData.serialNumber,
      rightX,
      nextY + 5,
      60
    );
    // nextY += serialSpaceUsed + 3; // Move down based on space used
    nextY += Math.max(addressSpaceUsed, serialSpaceUsed) + 3;

    addField("Contact", formData.contact, startX, nextY + 4);
    nextY += 3;
    addField("Installation Date", formData.installationDate, rightX, nextY + 7);
    nextY += 3;

    addField("Telephone", formData.telephone, startX, nextY + 4);
    nextY += 4;

    addField("Work Time", formData.workTime, rightX, nextY + 6);
    nextY += 4;

    addField(
      "Service Technician",
      formData.serviceTechnician,
      startX,
      nextY + 2
    );
    nextY += 5;
    addField("Departure Date", formData.departureDate, startX, nextY + 3);
    nextY += 3;
    addField("Return Date", formData.returnDate, rightX, nextY);

    nextY += 6.5;

    doc.setFont("helvetica", "bold");
    doc.text("Report Type", startX, nextY);
    doc.setFont("helvetica", "normal");

    const reportOptions = [
      "Installation",
      "Maintenance",
      "Defect",
      "Customer Visit",
    ];
    let optionX = startX;
    reportOptions.forEach((option) => {
      // doc.rect(optionX, nextY + 2, 4, 4);
      // if (checkboxValues[option])
      //   doc.setFont("Zapfdingbats");
      //   doc.text("✔", optionX + 1, nextY + 5);
      // doc.text(option, optionX + 5, nextY + 5);
      // optionX += 40;
      const spaceBetweenOptions = 38;
      const isChecked = checkboxValues[option];
      if (isChecked) {
        // Draw a border around the checkbox
        doc.rect(optionX, nextY + 1.5, 4, 4); // Adjust values as needed
      } else {
        doc.rect(optionX, nextY + 1.5, 4, 4); // Adjust values as needed
      }
      doc.setFont("Zapfdingbats");

      const symbol = isChecked ? "4" : ""; // '4' for tick, 'o' for empty
      doc.text(`${symbol}`, optionX + 0.6, nextY + 4.5);

      doc.setFont("helvetica", "normal");

      doc.text(option, optionX + 4.5, nextY + 4.5);
      optionX += spaceBetweenOptions;
    });

    nextY += 12;
    doc.setFont("helvetica", "bold");
    doc.text("Description of Work / Defect / Failure Mode:", startX, nextY);
    doc.setFont("helvetica", "normal");
    nextY += 4;
    const description = doc.splitTextToSize(
      formData.description || "N/A",
      maxWidth
    );
    doc.text(description, startX, nextY);
    nextY += description.length * 4;

    nextY += 1.5;
    doc.setFont("helvetica", "bold");
    doc.text("Cause of failure:", startX, nextY);
    doc.setFont("helvetica", "normal");
    nextY += 4;
    const causeOfFailure = doc.splitTextToSize(
      formData.causeOfFailure || "N/A",
      maxWidth
    );
    doc.text(causeOfFailure, startX, nextY);
    nextY += causeOfFailure.length * 4;

    nextY += 1.5;
    doc.setFont("helvetica", "bold");
    doc.text("Notes/Further action required:", startX, nextY);
    doc.setFont("helvetica", "normal");
    nextY += 4;
    const notes = doc.splitTextToSize(formData.notes || "N/A", maxWidth);
    doc.text(notes, startX, nextY);
    nextY += notes.length * 4;

    // doc.setFont("helvetica", "bold");
    // doc.text("Parts Used:", startX, nextY);
    // doc.setFont("helvetica", "normal");
    // nextY += 5;
    // partsUsed.forEach((part, index) => {
    //   doc.text(
    //     `${part.partNumber} - ${part.description} (Qty: ${part.qty})`,
    //     startX,
    //     nextY
    //   );
    //   nextY += 5;
    // });

    const colWidths = [40, 65, 18, 65]; // Column widths
    const rowHeight = 8; // Row height

    const drawTableHeaders = () => {
      doc.setFont("helvetica", "bold");

      doc.text("Part Number", startX + 2, nextY + 5);
      doc.text("Description", startX + colWidths[0] + 2, nextY + 5);
      doc.text("Quantity", startX + colWidths[0] + colWidths[1] + 2, nextY + 5);
      doc.text(
        "Note",
        startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
        nextY + 5
      );

      doc.rect(startX, nextY, colWidths[0], rowHeight);
      doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
      doc.rect(
        startX + colWidths[0] + colWidths[1],
        nextY,
        colWidths[2],
        rowHeight
      );
      doc.rect(
        startX + colWidths[0] + colWidths[1] + colWidths[2],
        nextY,
        colWidths[3],
        rowHeight
      );

      nextY += rowHeight;
    };

    // **Ensure space before table starts**
    // if (nextY + 20 > pageHeight) {
    //   doc.addPage();
    //   doc.setFont("helvetica", "normal");
    //   nextY = 25;
    //   resetHeader();
    //   addPageNumber();
    // }
    doc.setFont("helvetica", "bold");
    doc.text("Parts Used", startX, nextY + 1.5);
    nextY += 3;
    drawTableHeaders();

    doc.setFont("helvetica", "normal");

    //100% Working code

    // partsUsed.forEach((part) => {
    //   let partNumberLines = doc.splitTextToSize(
    //     part.partNumber || "N/A",
    //     colWidths[0] - 5
    //   );
    //   let descriptionLines = doc.splitTextToSize(
    //     part.description || "N/A",
    //     colWidths[1] - 5
    //   );
    //   let quantityLines = doc.splitTextToSize(
    //     part.quantity.toString() || "N/A",
    //     colWidths[2] - 5
    //   );
    //   let noteLines = doc.splitTextToSize(part.note || "N/A", colWidths[3] - 5);

    //   let maxLines = Math.max(
    //     partNumberLines.length,
    //     descriptionLines.length,
    //     quantityLines.length,
    //     noteLines.length
    //   );
    //   let rowHeightTotal = maxLines * rowHeight;

    //   // **Ensure bottom margin of 30px is maintained**
    //   // if (nextY + rowHeightTotal > pageHeight - 30) {
    //   //   addPageNumber();
    //   //   doc.addPage();
    //   //   nextY = 25;
    //   //   resetHeader();
    //   //   drawTableHeaders();
    //   // }

    //   // ✅ Print each wrapped line dynamically with borders
    //   for (let i = 0; i < maxLines; i++) {
    //     // ✅ Check if we need to add a new page before printing each line
    //     // if (nextY + rowHeight > pageHeight - 30) {
    //     //   doc.setFontSize(12);
    //     //   doc.setFont("helvetica", "normal");
    //     //   addPageNumber();
    //     //   doc.addPage();
    //     //   nextY = 25;
    //     //   resetHeader();
    //     //   drawTableHeaders();
    //     // }
    //     doc.setFont("helvetica", "normal");

    //     // ✅ Print the text in the correct column positions
    //     if (partNumberLines[i])
    //       doc.text(partNumberLines[i], startX + 2, nextY + 5);
    //     if (descriptionLines[i])
    //       doc.text(descriptionLines[i], startX + colWidths[0] + 2, nextY + 5);
    //     if (quantityLines[i])
    //       doc.text(
    //         quantityLines[i],
    //         startX + colWidths[0] + colWidths[1] + 2,
    //         nextY + 5
    //       );
    //     if (noteLines[i])
    //       doc.text(
    //         noteLines[i],
    //         startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
    //         nextY + 5
    //       );

    //     // ✅ Draw borders for the current line
    //     doc.rect(startX, nextY, colWidths[0], rowHeight);
    //     doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
    //     doc.rect(
    //       startX + colWidths[0] + colWidths[1],
    //       nextY,
    //       colWidths[2],
    //       rowHeight
    //     );
    //     doc.rect(
    //       startX + colWidths[0] + colWidths[1] + colWidths[2],
    //       nextY,
    //       colWidths[3],
    //       rowHeight
    //     );

    //     nextY += rowHeight; // Move Y position down
    //   }
    // });

    const maxRows = 12; // Limit to 12 rows
    let rowCount = 0; // Track number of printed rows

    for (let i = 0; i < partsUsed.length; i++) {
      if (rowCount >= maxRows) break; // Stop adding rows after 5

      let part = partsUsed[i];

      let partNumberLines = doc.splitTextToSize(
        part.partNumber || "N/A",
        colWidths[0] - 5
      );
      let descriptionLines = doc.splitTextToSize(
        part.description || "N/A",
        colWidths[1] - 5
      );
      let quantityLines = doc.splitTextToSize(
        part.quantity?.toString() || "N/A",
        colWidths[2] - 5
      );
      let noteLines = doc.splitTextToSize(part.note || "N/A", colWidths[3] - 5);

      let maxLines = Math.max(
        partNumberLines.length,
        descriptionLines.length,
        quantityLines.length,
        noteLines.length
      );

      // Ensure total rows do not exceed 5
      if (rowCount + maxLines > maxRows) break;

      for (let j = 0; j < maxLines; j++) {
        if (rowCount >= maxRows) break; // Stop adding rows after 5

        doc.setFont("helvetica", "normal");

        if (partNumberLines[j])
          doc.text(partNumberLines[j], startX + 2, nextY + 5);
        if (descriptionLines[j])
          doc.text(descriptionLines[j], startX + colWidths[0] + 2, nextY + 5);
        if (quantityLines[j])
          doc.text(
            quantityLines[j],
            startX + colWidths[0] + colWidths[1] + 2,
            nextY + 5
          );
        if (noteLines[j])
          doc.text(
            noteLines[j],
            startX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
            nextY + 5
          );

        // ✅ Draw borders for each row
        doc.rect(startX, nextY, colWidths[0], rowHeight);
        doc.rect(startX + colWidths[0], nextY, colWidths[1], rowHeight);
        doc.rect(
          startX + colWidths[0] + colWidths[1],
          nextY,
          colWidths[2],
          rowHeight
        );
        doc.rect(
          startX + colWidths[0] + colWidths[1] + colWidths[2],
          nextY,
          colWidths[3],
          rowHeight
        );

        nextY += rowHeight; // Move Y position down
        rowCount++; // Increment row count
      }
    }

    // Service Type Section
    // doc.setFont("helvetica", "bold");
    // doc.text("Service Type", 10, nextY + 5);
    // nextY += 6; // Space after the title

    // doc.setFont("helvetica", "normal");
    // doc.setFontSize(9);

    // const serviceStartX = 10;
    // const checkboxSize = 4;
    // let optionServiceX = serviceStartX;
    // const spaceBetweenOptions = 29; // Space between each option
    // const serviceRowHeight = 10; // Height per row (for 2-line text)
    // let maxServiceRowHeight = serviceRowHeight; // Track max row height

    // // Function to split service options into two lines
    // const splitServiceText = (option) => {
    //     const words = option.split(" ");
    //     if (words.length > 1) {
    //         return [words[0], words.slice(1).join(" ")]; // First word on one line, rest on second
    //     } else {
    //         return [option]; // Single-word options remain single-line
    //     }
    // };

    // // **Now, draw checkboxes and text in a single row**
    // serviceOptions.forEach((option) => {
    //     const wrappedText = splitServiceText(option); // Split into two lines

    //     // **Draw checkbox centered to row height**
    //     let checkboxY = nextY + (maxServiceRowHeight / 2 - checkboxSize / 2);
    //     doc.rect(optionServiceX, checkboxY, checkboxSize, checkboxSize);

    //     // **Check if the option is selected**
    //     const isChecked = checkboxValues[option] || false;
    //     if (isChecked) {
    //         doc.setFont("Zapfdingbats");
    //         doc.text("4", optionServiceX + 0.8, checkboxY + 3);
    //         doc.setFont("helvetica", "normal");
    //     }

    //     // **Draw text below the checkbox**
    //     let textY = checkboxY + 2;
    //     wrappedText.forEach((line, index) => {
    //         doc.text(line, optionServiceX + checkboxSize+1, textY + index * 3);
    //     });

    //     // **Move X position for the next checkbox**
    //     optionServiceX += spaceBetweenOptions;
    // });

    // // Move Y to the next section after full row
    // nextY += maxServiceRowHeight + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Service Type", 10, nextY + 5);
    nextY += 6; // Space after the title

    doc.setFont("helvetica", "normal");

    const serviceStartX = 10;
    const checkboxSize = 4;
    let optionServiceX = serviceStartX;
    const serviceRowHeight = 10; // Height per row (for 2-line text)
    let maxServiceRowHeight = serviceRowHeight; // Track max row height

    // Define manual spacing for each option
    const serviceOptionSpacing = {
      "F.O.C Commissioning": 33,
      "F.O.C Maintenance": 28,
      Guarantee: 26,
      "Chargeable Commissioning": 33,
      "Customer Visit": 25,
      "Service contract": 25,
      Goodwill: 25,
    };

    // Function to split service options into two lines
    const splitServiceText = (option) => {
      const words = option.split(" ");
      if (words.length > 1) {
        return [words[0], words.slice(1).join(" ")]; // First word on one line, rest on second
      } else {
        return [option]; // Single-word options remain single-line
      }
    };

    // Now, draw checkboxes and text in a single row
    serviceOptions.forEach((option) => {
      const wrappedText = splitServiceText(option); // Split into two lines
      let optionSpacing = serviceOptionSpacing[option] || 30; // Get manual spacing

      // Center "Guarantee" & "Goodwill" inside the checkbox
      let textX = optionServiceX + checkboxSize + 1;

      // Draw checkbox centered to row height
      let checkboxY = nextY + (maxServiceRowHeight / 2 - checkboxSize / 1.5);
      doc.rect(optionServiceX, checkboxY - 1, checkboxSize, checkboxSize);

      // Check if the option is selected
      const isChecked = checkboxValues[option] || false;
      if (isChecked) {
        doc.setFont("Zapfdingbats");
        doc.text("4", optionServiceX + 0.6, checkboxY + 2);
        doc.setFont("helvetica", "normal");
      }

      // Draw text below the checkbox
      let textY = checkboxY + 1;
      if (option === "Guarantee" || option === "Goodwill") {
        textY += 1; // Adjust to center text manually
      }
      wrappedText.forEach((line, index) => {
        doc.text(line, textX, textY + index * 3.3);
      });

      // Move X position for the next checkbox
      optionServiceX += optionSpacing;
    });

    // Move Y to the next section after full row
    nextY += maxServiceRowHeight + 3;

    const addSignatures = (signatures, nextY) => {
      doc.setFont("helvetica", "bold");

      // Title for Signatures Section
      const signatureHeight = 30; // Signature height
      const signatureWidth = 55; // Signature width
      const spacing = 5; // Space between rows and signatures
      const titleHeight = 14; // Height for the title

      const estimatedHeight = titleHeight + signatureHeight * 2 + spacing * 3;

      // Check if the entire signature section fits on the current page

      // Print the Signatures title

      // Column positions for the signatures
      const col1X = 10; // Technician signature position
      const col2X = 78; // Manager signature position
      const col3X = 145; // Customer signature position (centered below)

      let baseY = nextY + 1; // Adjusted Y position for images
      doc.setFont("helvetica", "bold");
      // Row 1: Technician and Manager Signatures
      if (signatures.technician) {
        doc.text("Signature of service technician:", col1X, nextY);
        doc.addImage(
          signatures.technician,
          "PNG",
          col1X,
          baseY + 1,
          signatureWidth,
          signatureHeight
        );
      }
      doc.setFont("helvetica", "bold");
      if (signatures.manager) {
        doc.text("Signature of service manager:", col2X, nextY);
        doc.addImage(
          signatures.manager,
          "PNG",
          col2X,
          baseY + 1,
          signatureWidth,
          signatureHeight
        );
      }

      // Adjust Y for the next row based on the tallest signature in Row 1
      nextY = baseY;
      doc.setFont("helvetica", "bold");
      // Row 2: Customer Signature
      if (signatures.customer) {
        // Check if the customer signature fits on the current page

        doc.text("Customer signature:", col3X, nextY);
        doc.addImage(
          signatures.customer,
          "PNG",
          col3X,
          nextY + 2,
          signatureWidth,
          signatureHeight
        );
        nextY += signatureHeight + spacing;
      }

      return nextY; // Return updated Y position for further content
    };

    // Call the function to add signatures
    nextY = addSignatures(formData.signatures, nextY);

    // addField("Work Time", formData.workTime, rightX, nextY);
    // nextY += 8;

    // addField("Departure Date", formData.departureDate, startX, nextY);
    // addField("Return Date", formData.returnDate, rightX, nextY);

    // Report Type
    // doc.setFontSize(11);
    // doc.setFont("helvetica", "bold");
    // doc.text("Report Type", startX, nextY);
    // doc.setFont("helvetica", "normal");

    // const reportOptions = ["Installation", "Maintenance", "Defect", "Customer Visit"];
    // let optionX = startX;
    // reportOptions.forEach((option) => {
    //     doc.rect(optionX, nextY + 2, 4, 4);
    //     if (checkboxValues[option]) doc.text("✔", optionX + 1, nextY + 5);
    //     doc.text(option, optionX + 6, nextY + 5);
    //     optionX += 40;
    // });
    // nextY += 10;

    // Work Description
    // doc.setFont("helvetica", "bold");
    // doc.text("Description of Work / Defect / Failure Mode:", startX, nextY);
    // doc.setFont("helvetica", "normal");
    // nextY += 5;
    // const description = doc.splitTextToSize(formData.description || "N/A", maxWidth);
    // doc.text(description, startX, nextY);
    // nextY += description.length * 5;

    // Parts Used
    // doc.setFont("helvetica", "bold");
    // doc.text("Parts Used:", startX, nextY);
    // doc.setFont("helvetica", "normal");
    // nextY += 5;
    // partsUsed.forEach((part, index) => {
    //     doc.text(`${part.partNumber} - ${part.description} (Qty: ${part.qty})`, startX, nextY);
    //     nextY += 5;
    // });

    // Signatures
    // nextY += 10;
    // doc.text("Signature of Service Technician:", startX, nextY);
    // doc.text("Signature of Service Manager:", pageWidth / 3, nextY);
    // doc.text("Customer Signature:", (2 * pageWidth) / 3, nextY);

    // doc.line(startX, nextY + 5, startX + 50, nextY + 5);
    // doc.line(pageWidth / 3, nextY + 5, pageWidth / 3 + 50, nextY + 5);
    // doc.line((2 * pageWidth) / 3, nextY + 5, (2 * pageWidth) / 3 + 50, nextY + 5);

    // nextY = addSignatures(formData.signatures, nextY);

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(11); // Set font size for company name
    // doc.text("Haitian Middle East F2E", doc.internal.pageSize.width / 2, nextY + 10, { align: "center" });

    // doc.setFontSize(9);
    // doc.text("Sharjah - U.A.E", doc.internal.pageSize.width / 2, nextY + 16, { align: "center" });

    // doc.setFontSize(10);
    // doc.text("+971 65 622 238", doc.internal.pageSize.width / 2, nextY + 22, { align: "center" });

    // doc.setFontSize(9);
    // doc.text("Email: cso@haitianme.com", doc.internal.pageSize.width / 2, nextY + 28, { align: "center" });
    // doc.text("Web: www.haitianme.com", doc.internal.pageSize.width / 2, nextY + 34, { align: "center" });

    // const centerX = doc.internal.pageSize.width / 2; // Get center alignment

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(10);
    // doc.text("Haitian Middle East F2E", centerX, nextY + 5, { align: "center" });

    // doc.setFontSize(9);
    // doc.text("Sharjah - U.A.E", centerX, nextY + 10, { align: "center" });

    // doc.setFontSize(10);
    // doc.text("+971 65 622 238", centerX, nextY + 14, { align: "center" });

    // doc.setFontSize(9);
    // doc.text("Email: cso@haitianme.com", centerX, nextY + 18, { align: "center" });
    // doc.text("Web: www.haitianme.com", centerX, nextY + 22, { align: "center" });

    // const centerX = doc.internal.pageSize.width / 2; // Get center alignment
    // const leftAlignX = 80;  // Adjust for left-side text
    // const rightAlignX = doc.internal.pageSize.width - 50;  // Adjust for right-side text

    // // **Company Name - Centered**
    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(10);
    // doc.text("Haitian Middle East F2E", centerX, nextY + 5, { align: "center" });

    // // **Second Row: "Sharjah - U.A.E" (left) and "+971 65 622 238" (right)**
    // doc.setFontSize(9);
    // doc.text("Sharjah - U.A.E", leftAlignX, nextY + 10);
    // doc.text("+971 65 622 238", rightAlignX-43, nextY + 10, { align: "center" });

    // // **Third Row: "Email" (left) and "Web" (right)**
    // doc.text("Email: cso@haitianme.com", leftAlignX-10, nextY + 15);
    // doc.text("Web: www.haitianme.com", rightAlignX-7, nextY + 15, { align: "right" });

    // const pageHeight = doc.internal.pageSize.height; // Get page height
    const footerY = pageHeight - 20; // Adjust footer position from bottom
    const centerX = doc.internal.pageSize.width / 2; // Get center alignment
    const leftAlignX = 40; // Adjust for left-side text
    const rightAlignX = doc.internal.pageSize.width - 80; // Adjust for right-side text

    // **Company Name - Centered**
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Haitian Middle East F2E", centerX, footerY, { align: "center" });

    // **Second Row: "Sharjah - U.A.E" (left) and "+971 65 622 238" (right)**
    doc.setFontSize(9);
    doc.text("Sharjah - U.A.E", leftAlignX + 40, footerY + 6);
    doc.text("+971 65 622 238", rightAlignX, footerY + 6, { align: "right" });

    // **Third Row: "Email" (left) and "Web" (right)**
    doc.text("Email: cso@haitianme.com", leftAlignX + 20, footerY + 12);
    doc.text("Web: www.haitianme.com", rightAlignX + 15, footerY + 12, {
      align: "right",
    });

    doc.save("Service_Report.pdf");
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      await form.validateFields();
      const emptyRows = data.some(
        (row) =>
          !row.partNumber?.trim() || !row.description?.trim() || !row.quantity
      );

      if (data.length === 0 || emptyRows) {
        message.error("Please fill in all fields in the 'Parts Used' table.");
        return; // ✅ Prevent submission
      }

      let checkboxValues = {};
      [...reportOptions, ...serviceOptions].forEach((option) => {
        checkboxValues[option] = false;
      });

      if (values.report) {
        values.report.forEach((option) => {
          checkboxValues[option] = true;
        });
      }

      if (values.serviceType) {
        values.serviceType.forEach((option) => {
          checkboxValues[option] = true;
        });
      }
      console.log("Checkbox Values Before Submission:", checkboxValues);

      // ✅ Process parts used table data
      const partsUsed = data
        .filter((row) => row.partNumber && row.description && row.quantity)
        .map((row) => ({
          partNumber: row.partNumber.trim(),
          description: row.description.trim(),
          quantity: isNaN(Number(row.quantity)) ? 0 : Number(row.quantity),
          note: row.note?.trim() || "",
        }));

      if (partsUsed.length === 0) {
        message.error("Please fill in the fields in the Parts Used table");
        return;
      }

      if (!signatureTechnician) {
        message.error(
          "Please provide the Service Technician signature and click 'Save Signature'."
        );
        return;
      }
      if (!signatureManager) {
        message.error(
          "Please provide the Service Manager signature and click 'Save Signature'."
        );
        return;
      }
      if (!signatureCustomer) {
        message.error(
          "Please provide the Customer signature and click 'Save Signature'."
        );
        return;
      }

      // ✅ Prepare final form data
      const formData = {
        // srn,// ✅ Include SRN

        customerName: values.customerName,
        machineType: values.machineType,
        // address: values.address,
        address: address,

        serialNumber: values.serialNumber,
        contact: values.contact,
        installationDate: values.installationDate,
        telephone: values.telephone,
        workTime: values.workTime,
        serviceTechnician: values.serviceTechnician,
        departureDate: values.departureDate,
        returnDate: values.returnDate,
        // description: values["description of work/of defect/failure mode"],
        description: descriptionText,
        // notes: values["notes/further action required"],
        notes: notes,
        // causeOfFailure: values["cause of failure"],
        causeOfFailure: causeOfFailure,
        partsUsed: partsUsed,
        signatures: {
          technician: sigTechnician.current?.toDataURL(),
          manager: sigManager.current?.toDataURL(),
          customer: sigCustomer.current?.toDataURL(),
        },
        ...checkboxValues, // ✅ Ensures "Yes" for checked and "No" for unchecked
      };

      console.log("Final formData:", JSON.stringify(formData, null, 2)); // ✅ Debugging

      setLoading(true);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxOGdSLswUFmDuQ-o8CRx_IuOv7FRb2pasitK2hugDbEjvf9AQkjMImEbjFfofpCsg/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        message.success("Form submitted successfully!");
        generatePDF(formData, checkboxValues, partsUsed);

        // form.resetFields();
        // setAddress("");
        // setSerialNumber("");
        // setDescriptionText("");
        // setcauseOfFailure("");
        // setNotes("");
        
          // setData([
          //   {
          //     key: Date.now(),
          //     partNumber: "",
          //     description: "",
          //     quantity: "",
          //     note: "",
          //   },
          // ]);
          // sigTechnician.current?.clear();
          // sigManager.current?.clear();
          // sigCustomer.current?.clear();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container pb-1">
        <div className="container border shadow rounded-5  mt-3 pt-3 mb-3 pb-3">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-12 col-lg-6">
                <img
                  src={HaitianLogo}
                  alt="HaitianLogo"
                  className="img-fluid haitianLogo"
                />
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-lg-end">
                <p className="header_Service_Text">Service No</p>
                <p><strong>{srn}</strong></p>
              </div>
            </div>
          </div>
          <div className="container  mt-3">
            <div className="row">
              <div className="col-12">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <div className="row ">
                    <div className="col-12 col-md-6">
                      <Form.Item
                        label="Customer Name"
                        name="customerName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter customer name",
                          },
                          {
                            pattern: /^[A-Za-z. ]+$/,
                            message:
                              "Only letters, spaces, and '.' are allowed",
                          },
                        ]}
                      >
                        <Input placeholder="Enter customer name" />
                      </Form.Item>

                      <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                          { required: true, message: "Please enter address" },
                        ]}
                      >
                        {/* <TextArea placeholder="Enter address" 
                       /> */}
                          <TextArea
                        placeholder="Enter address"
                        value={address}
                        onChange={handleAddressChange}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        maxLength={120}
                        showCount 
                      />
                      </Form.Item>

                      <Form.Item
                        label="Contact"
                        name="contact"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact name",
                          },
                          {
                            pattern: /^[A-Za-z. ]+$/,
                            message:
                              "Only letters, spaces, and '.' are allowed",
                          },
                        ]}
                      >
                        <Input placeholder="Enter contact name" />
                      </Form.Item>

                      <Form.Item
                        label="Telephone"
                        name="telephone"
                        rules={[
                          {
                            required: true,
                            message: "Please enter telephone number",
                          },
                          {
                            pattern: /^[0-9+-]+$/,
                            message: "Only numbers, +, and - are allowed",
                          },
                        ]}
                      >
                        <Input placeholder="Enter telephone number" />
                      </Form.Item>
                    </div>

                    <div className="col-12 col-md-6">
                      <Form.Item
                        label="Machine Type"
                        name="machineType"
                        rules={[
                          {
                            required: true,
                            message: "Please enter machine type",
                          },
                        ]}
                      >
                        <Input placeholder="Enter machine type" />
                      </Form.Item>

                      <Form.Item
                        label="Serial Number"
                        name="serialNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter serial number",
                          },
                        ]}
                      >
                        {/* <TextArea placeholder="Enter serial number" /> */}
                        <TextArea
                        placeholder="Enter serial number"
                        value={serialNumber}
                        onChange={handleSerialNumberChange}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        maxLength={100}
                        showCount 
                      />
                      </Form.Item>

                      <Form.Item
                        label="Installation Date"
                        name="installationDate"
                        rules={[
                          {
                            required: true,
                            message: "Please select the installation date",
                          },
                        ]}
                      >
                        <DatePicker className="w-100" />
                      </Form.Item>

                      <Form.Item
                        label="Work Time"
                        name="workTime"
                        rules={[
                          { required: true, message: "Please enter work time" },
                        ]}
                      >
                        <Input placeholder="Enter work time" />
                      </Form.Item>
                    </div>

                    <div className="col-12 col-lg-4">
                      <Form.Item
                        label="Service Technician"
                        name="serviceTechnician"
                        rules={[
                          {
                            required: true,
                            message: "Please enter service technician",
                          },
                          {
                            pattern: /^[A-Za-z. ]+$/,
                            message:
                              "Only letters, spaces, and '.' are allowed",
                          },
                        ]}
                      >
                        <Input placeholder="Enter service technician name" />
                      </Form.Item>
                    </div>

                    <div className="col-12 col-lg-4">
                      <Form.Item
                        label="Departure Date"
                        name="departureDate"
                        rules={[
                          {
                            required: true,
                            message: "Please select the departure date",
                          },
                        ]}
                      >
                        <DatePicker className="w-100" />
                      </Form.Item>
                    </div>

                    <div className="col-12 col-lg-4">
                      <Form.Item
                        label="Return Date"
                        name="returnDate"
                        rules={[
                          {
                            required: true,
                            message: "Please select the return date",
                          },
                        ]}
                      >
                        <DatePicker className="w-100" />
                      </Form.Item>
                    </div>

                    <div className="col-12">
                      <Form.Item
                        label="Report"
                        name="report"
                        rules={[
                          {
                            required: true,
                            message: "Please select at least one report type",
                          },
                        ]}
                      >
                        <Checkbox.Group options={reportOptions} />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Description of work/of defect/failure mode"
                      name="description of work/of defect/failure mode"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please enter the description of work/of defect/failure mode",
                        },
                      ]}
                    >
                      {/* <TextArea
                      rows={3}
                      placeholder="Enter the description of work/of defect/failure mode"
                      maxLength={200} 
                      showCount 
                    /> */}
                      <TextArea
                        placeholder="Enter the description of work/of defect/failure mode"
                        value={descriptionText}
                        onChange={handleDescriptionTextChange}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        maxLength={200}
                        showCount 
                      />
                    </Form.Item>

                    <Form.Item
                      label="Cause of Failure"
                      name="cause of failure"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the cause of failure",
                        },
                      ]}
                    >
                      {/* <TextArea
                        rows={3}
                        placeholder="Enter the cause of failure"
                        maxLength={100}
                        showCount
                      /> */}
                      <TextArea
                        placeholder="Enter the cause of failure"
                        value={causeOfFailure}
                        onChange={handleCauseTextChange}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        maxLength={100}
                        showCount 
                      />
                    </Form.Item>
                    <Form.Item
                      label="Notes/Further action required"
                      name="notes/further action required"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please enter the notes/further action required",
                        },
                      ]}
                    >
                      {/* <TextArea
                        rows={3}
                        placeholder="Enter the notes/further action required"
                        maxLength={100}
                        showCount
                      /> */}
                        <TextArea
                        placeholder="Enter the notes/further action required"
                        value={notes}
                        onChange={handleNotesChange}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        maxLength={100}
                        showCount 
                      />
                    </Form.Item>

                    {/* <div className="col-12">
                    <h6>Parts Used</h6>
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </div> */}
                    <div className="col-12">
                      <h6>Parts Used</h6>
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                      />
                    </div>

                    {/* <div className="col-12 mt-4">
                    <Form.Item>
                      <Checkbox.Group options={serviceOptions} />
                    </Form.Item>
                  </div> */}

                    <div className="col-12 mt-4">
                      <Form.Item
                        label="Service Type"
                        name="serviceType" // This is the field name
                        rules={[
                          {
                            required: true,
                            message: "Please select at least one report type",
                          },
                        ]}
                      >
                        <Checkbox.Group options={serviceOptions} />
                      </Form.Item>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-4 mt-2">
                      <Form.Item
                        label="Signature of service technician"
                        required
                      >
                        <SignatureCanvas
                          ref={sigTechnician}
                          penColor="black"
                          canvasProps={{
                            width: canvasSize.width,
                            height: canvasSize.height,
                            className: "border rounded border-3",
                          }}
                        />
                        <div className="d-flex justify-content-start gap-2 mt-1">
                          <Button
                            type="primary"
                            onClick={saveTechnicianSignature}
                            disabled={isSubmitting}
                          >
                            Save Signature
                          </Button>
                          <Button
                            type="primary"
                            danger
                            onClick={clearTechnicianSignature}
                            disabled={isSubmitting}
                          >
                            Clear
                          </Button>
                        </div>
                      </Form.Item>
                    </div>

                    {/* Service Manager Signature */}
                    <div className="col-12 col-lg-6 col-xl-4  mt-2">
                      <Form.Item label="Signature of service manager" required>
                        <SignatureCanvas
                          ref={sigManager}
                          penColor="black"
                          canvasProps={{
                            width: canvasSize.width,
                            height: canvasSize.height,
                            className: "border rounded border-3",
                          }}
                        />
                        <div className="d-flex justify-content-start gap-2 mt-1">
                          <Button
                            type="primary"
                            onClick={saveManagerSignature}
                            disabled={isSubmitting}
                          >
                            Save Signature
                          </Button>
                          <Button
                            type="primary"
                            danger
                            onClick={clearManagerSignature}
                            disabled={isSubmitting}
                          >
                            Clear
                          </Button>
                        </div>
                      </Form.Item>
                    </div>

                    {/* Customer Signature */}
                    <div className="col-12 col-lg-6 col-xl-4  mt-2">
                      <Form.Item label="Customer signature" required>
                        <SignatureCanvas
                          ref={sigCustomer}
                          penColor="black"
                          canvasProps={{
                            width: canvasSize.width,
                            height: canvasSize.height,
                            className: "border rounded border-3",
                          }}
                        />
                        <div className="d-flex justify-content-start gap-2 mt-1">
                          <Button
                            type="primary"
                            onClick={saveCustomerSignature}
                            disabled={isSubmitting}
                          >
                            Save Signature
                          </Button>
                          <Button
                            type="primary"
                            danger
                            onClick={clearCustomerSignature}
                            disabled={isSubmitting}
                          >
                            Clear
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                    <div className="text-center mt-4 ">
                      <Button
                        htmlType="submit"
                        className="submitbutton p-3"
                        style={{ fontSize: "1.2rem" }}
                        loading={loading}
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
