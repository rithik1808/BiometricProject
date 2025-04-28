import Document from "../models/document.model.js";

export const updateDocument = async (req, res) => {
  try {
    const {
      text,
      biometric,
      bytes,
      originalName,
      secure_url,
      format,
      public_id,
      userId,
    } = req.body;

    const newDocument = new Document({
      text: text,
      biometric: biometric,
      documentName: originalName,
      documentUrl: secure_url,
      documentId: public_id,
      documentFormat: format,
      documentSize: bytes,
      uploadedBy: userId,
    });
    const document = await newDocument.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      document: document,
    });
  } catch (error) {
    console.log("Error in updateDocument controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { biometric } = req.query;
    if (!biometric) {
      return res
        .status(400)
        .json({ success: false, message: "Biometric is required" });
    }
    let documents;
    if (biometric === "all") {
      documents = await Document.find({});
    } else {
      documents = await Document.find({ biometric: biometric });
    }
    res.status(200).json({
      success: true,
      message: "Documents fetched successfully",
      documents: documents,
    });
  } catch (error) {
    console.log("Error in getDocuments controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
