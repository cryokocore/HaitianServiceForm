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

  const [data, setData] = useState([
    {
      key: Date.now(),
      partNumber: "",
      description: "",
      quantity: "",
      note: "",
    },
  ]);

  const handleInputChange = (key, field, value) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setData(updatedData);
  };

  const handleAddRow = () => {
    setData([
      ...data,
      {
        key: Date.now(),
        partNumber: "",
        description: "",
        quantity: "",
        note: "",
      },
    ]);
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

  const columns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      key: "partNumber",
      render: (_, record) => (
        <Input
          value={record.partNumber}
          onChange={(e) =>
            handleInputChange(record.key, "partNumber", e.target.value)
          }
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <Input
          value={record.description}
          onChange={(e) =>
            handleInputChange(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1} // Prevents negative or zero values
          value={record.quantity}
          onChange={(value) => handleInputChange(record.key, "quantity", value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (_, record) => (
        <Input
          value={record.note}
          onChange={(e) =>
            handleInputChange(record.key, "note", e.target.value)
          }
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={handleAddRow}>
            Add
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteRow(record.key)}
            disabled={data.length === 1} // Disables delete button if only one row exists
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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

  const generatePDF = (formData, checkboxValues, partsUsed) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // ✅ Move this to the top
    let pageNumber = 1; // Start page numbering
    const bottomMargin = 30;
    const headerPadding = 10;

    const addPageNumber = () => {
      doc.setFontSize(10);
      doc.text(
        `Page ${pageNumber}`,
        doc.internal.pageSize.width / 2,
        pageHeight - 10,
        { align: "center" }
      );
      pageNumber++; // Increment for next page
    };

    // Function to check if a new page is needed
    const checkPageLimit = (currentY) => {
      if (currentY + bottomMargin > pageHeight) {
        addPageNumber();
        doc.addPage();
        resetHeader();

        return 20 + headerPadding;
      }
      return currentY;
    };
    const resetHeader = () => {
      // doc.setFont("helvetica", "normal");
      // doc.setFontSize(14);
      // doc.text("Service Report", 90, 10);
      // doc.setDrawColor(0, 0, 0);
      // doc.setLineWidth(0.5);
      // doc.line(20, 15, 190, 15);
      doc.addImage(HaitianLogo, "PNG", 18, 1, 50, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text("Service No", 160, 12);
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(20, 22, 190, 22);
    };

    let nextY = 35 + headerPadding; // Start Y position
    resetHeader();
    // Ensure nextY is properly updated before adding content
    nextY = checkPageLimit(nextY);

    const getBase64Image = (imgUrl, callback) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imgUrl;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        callback(dataURL);
      };
    };

    getBase64Image(HaitianLogo, (base64Image) => {
      // doc.addImage(base64Image, "PNG", 18, 1, 50, 20);
      // doc.setFont("helvetica", "normal");

      // // Header
      // doc.setFontSize(12);
      // doc.text("Service No", 160, 12);
      // doc.setDrawColor(0, 0, 0);
      // doc.setLineWidth(0.5);
      // doc.line(20, 22, 190, 22);

      let nextY = 35; // Starting Y position

      // Function to add text fields dynamically
      const addField = (label, value, x, y, extraSpace = 12) => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(label, x, y);
        doc.setFont("helvetica", "normal");
        doc.text(value?.toString() || "N/A", x, y + 6);
        return y + extraSpace;
      };

      nextY = addField("Customer Name", formData.customerName, 20, 30, 16);
      nextY = addField("Machine Type", formData.machineType, 150, 30, 16);

      // Address and Serial Number
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Address", 20, nextY);
      doc.text("Serial Number", 150, nextY);

      doc.setFont("helvetica", "normal");

      const maxWidth = 80;
      const addressLines = doc.splitTextToSize(
        formData.address?.toString() || "N/A",
        maxWidth
      );

      let addressStartY = nextY + 6;
      let addressLineHeight = 7;

      addressLines.forEach((line, index) => {
        doc.text(line, 20, addressStartY + index * addressLineHeight);
      });

      doc.text(formData.serialNumber?.toString() || "N/A", 150, nextY + 6);

      let addressHeight = addressLines.length * addressLineHeight;
      nextY += addressHeight + 12;

      // Contact and Installation Date
      const formattedInstallDate = formData.installationDate
        ? new Date(formData.installationDate).toLocaleDateString()
        : "N/A";

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Contact", 20, nextY);
      doc.text("Installation Date", 150, nextY);

      doc.setFont("helvetica", "normal");
      doc.text(formData.contact?.toString() || "N/A", 20, nextY + 6);
      doc.text(formattedInstallDate, 150, nextY + 6);

      nextY += 15;

      // Telephone and Work Time
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Telephone", 20, nextY);
      doc.text("Work Time", 150, nextY);

      doc.setFont("helvetica", "normal");
      doc.text(formData.telephone?.toString() || "N/A", 20, nextY + 6);
      doc.text(formData.workTime?.toString() || "N/A", 150, nextY + 6);

      nextY += 15;

      // Service Technician, Departure Date, Return Date
      const formattedDepartureDate = formData.departureDate
        ? new Date(formData.departureDate).toLocaleDateString()
        : "N/A";

      const formattedReturnDate = formData.returnDate
        ? new Date(formData.returnDate).toLocaleDateString()
        : "N/A";

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Service Technician", 20, nextY);
      doc.text("Departure Date", 150, nextY);

      doc.setFont("helvetica", "normal");
      doc.text(formData.serviceTechnician?.toString() || "N/A", 20, nextY + 6);
      doc.text(formattedDepartureDate, 150, nextY + 6);

      nextY += 15; // Move to the next row for Return Date

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Return Date", 20, nextY);

      doc.setFont("helvetica", "normal");
      doc.text(formattedReturnDate, 20, nextY + 6);

      nextY += 15; // Space before Report Type

      // ✅ Fix Report Type Section (Same Line, Proper Checkmarks)
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Report Type", 20, nextY);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      const reportOptions = [
        "Installation",
        "Maintenance",
        "Defect",
        "Customer Visit",
      ];

      let optionX = 20;
      const spaceBetweenOptions = 40;

      console.log("checkboxValues:", checkboxValues); // Debugging checkbox values

      reportOptions.forEach((option) => {
        const isChecked = checkboxValues[option]; // Check if the option is selected in checkboxValues
        if (isChecked) {
          // Draw a border around the checkbox
          doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
        } else {
          doc.rect(optionX + 1, nextY + 4.5, 4.5, 4.5); // Adjust values as needed
        }
        // Set font for checkbox symbols
        doc.setFont("Zapfdingbats"); // Set Zapfdingbats font

        // Use symbol for checked ('4') and unchecked ('o')
        const symbol = isChecked ? "4" : ""; // '4' for tick, 'o' for empty
        doc.text(`${symbol}`, optionX + 1.3, nextY + 8);

        doc.setFont("helvetica", "normal");

        doc.text(option, optionX + 6, nextY + 8);
        optionX += spaceBetweenOptions;
      });

      // let nextY = 35; // Start Y position

      // Render content dynamically
      // nextY = checkPageLimit(nextY); // Ensure space before adding content

      nextY += 18;
      // nextY = checkPageLimit(nextY);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Description of work/of defect/failure mode", 20, nextY);

      const maxDescriptionWidth = 170;
      doc.setFont("helvetica", "normal");
      const description = doc.splitTextToSize(
        formData.description?.toString() || "N/A",
        maxDescriptionWidth
      );
      let descriptionStartY = nextY + 6;
      let descriptionLineHeight = 7;
      doc.setFont("helvetica", "normal");

      // description.forEach((line, index) => {
      //   doc.text(line, 20, descriptionStartY + index * descriptionLineHeight);
      // });
      description.forEach((line, index) => {
        nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
        doc.text(line, 20, nextY);
      });

      // Ensure 'nextY' is updated dynamically after the description section
      // nextY =
      //   descriptionStartY + description.length * descriptionLineHeight + 3; // Add extra space
      nextY += 10;

      // Check if the notes section fits on the current page

      if (nextY + 20 > pageHeight) {
        doc.addPage(); // Add a new page if there's not enough space
        nextY = 15; // Reset Y position for new page
        addPageNumber();
      }
      nextY = checkPageLimit(nextY, 30);

      // Now add the Notes section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Notes/Further action required", 20, nextY);

      // Ensure notes are properly split into lines
      const maxNotesWidth = 170;
      doc.setFont("helvetica", "normal");

      const notesText = formData.notes?.toString() || "N/A";

      const notesLines = doc.splitTextToSize(notesText, maxNotesWidth);

      let notesStartY = nextY + 6; // Add extra space below the title
      let notesLineHeight = 7;

      // Render each line dynamically
      // notesLines.forEach((line, index) => {
      //   doc.text(line, 20, notesStartY + index * notesLineHeight);
      // });

      notesLines.forEach((line, index) => {
        nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
        doc.text(line, 20, nextY);
      });

      nextY += 10;

      // Check if the notes section fits on the current page

      if (nextY + 20 > pageHeight) {
        doc.addPage(); // Add a new page if there's not enough space
        nextY = 15; // Reset Y position for new page
        addPageNumber();
      }
      nextY = checkPageLimit(nextY, 30);

      // Now add the Notes section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Cause of Failure", 20, nextY);

      // Ensure notes are properly split into lines
      const maxcauseOfFailureWidth = 170;
      doc.setFont("helvetica", "normal");

      const causeOfFailureText = formData.causeOfFailure?.toString() || "N/A";

      const causeOfFailureLines = doc.splitTextToSize(
        causeOfFailureText,
        maxcauseOfFailureWidth
      );

      let causeOfFailureStartY = nextY + 6; // Add extra space below the title
      let causeOfFailureLineHeight = 7;

      // Render each line dynamically
      // notesLines.forEach((line, index) => {
      //   doc.text(line, 20, notesStartY + index * notesLineHeight);
      // });

      causeOfFailureLines.forEach((line, index) => {
        nextY = checkPageLimit(nextY + 7); // Check if it fits, else add new page
        doc.text(line, 20, nextY);
      });

      nextY += 10;

      if (nextY + 20 > pageHeight) {
        doc.addPage(); // Add a new page if there's not enough space
        nextY = 15; // Reset Y position for new page
        addPageNumber();
      }
      nextY = checkPageLimit(nextY, 30);

      // Now add the Notes section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Parts Used", 20, nextY);

      partsUsed.forEach((part) => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Part Number", 20, nextY + 10);
        doc.setFont("helvetica", "normal");
      
        doc.text(part.partNumber, 20, nextY + 16); // ✅ Fix: Make sure part exists
        doc.text(part.description, 60, nextY + 16); // Example: Add part description
        doc.text(part.quantity.toString(), 120, nextY + 16); // Example: Add quantity
      
        nextY += 10; // Move Y down for the next part
      });
      

      resetHeader();
      addPageNumber();

      doc.save();
    });
  };

  const handleSubmit = async (values) => {
    try {
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
        customerName: values.customerName,
        machineType: values.machineType,
        address: values.address,
        serialNumber: values.serialNumber,
        contact: values.contact,
        installationDate: values.installationDate,
        telephone: values.telephone,
        workTime: values.workTime,
        serviceTechnician: values.serviceTechnician,
        departureDate: values.departureDate,
        returnDate: values.returnDate,
        description: values["description of work/of defect/failure mode"],
        notes: values["notes/further action required"],
        causeOfFailure: values["cause of failure"],
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
        "https://script.google.com/macros/s/AKfycbz4NDitu_BrIShQABbstm4vf9sA4FkREwoj-rbGT4COQ68bfpCkeM5qe28oY22jC3JU1A/exec",
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
        // setData([
        //   {
        //     key: Date.now(),
        //     partNumber: "",
        //     description: "",
        //     quantity: "",
        //     note: "",
        //   },
        // ]);
        sigTechnician.current?.clear();
        sigManager.current?.clear();
        sigCustomer.current?.clear();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container border border-danger mt-3 pt-3 mb-5 pb-5">
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
            </div>
          </div>
        </div>
        <div className="container border border-primary mt-3">
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
                          message: "Only letters, spaces, and '.' are allowed",
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
                      <TextArea placeholder="Enter address" />
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
                          message: "Only letters, spaces, and '.' are allowed",
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
                      <TextArea placeholder="Enter serial number" />
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
                          message: "Only letters, spaces, and '.' are allowed",
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
                    <TextArea
                      rows={4}
                      placeholder="Enter the description of work/of defect/failure mode"
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
                    <TextArea
                      rows={4}
                      placeholder="Enter the notes/further action required"
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
                    <TextArea
                      rows={4}
                      placeholder="Enter the cause of failure"
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

                  <div className="col-12 col-lg-4 mt-2">
                    <Form.Item label="Signature of service technician" required>
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
                        >
                          Save Signature
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={clearTechnicianSignature}
                        >
                          Clear
                        </Button>
                      </div>
                    </Form.Item>
                  </div>

                  {/* Service Manager Signature */}
                  <div className="col-12 col-lg-4 mt-2">
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
                        <Button type="primary" onClick={saveManagerSignature}>
                          Save Signature
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={clearManagerSignature}
                        >
                          Clear
                        </Button>
                      </div>
                    </Form.Item>
                  </div>

                  {/* Customer Signature */}
                  <div className="col-12 col-lg-4 mt-2">
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
                        <Button type="primary" onClick={saveCustomerSignature}>
                          Save Signature
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={clearCustomerSignature}
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
    </>
  );
}
