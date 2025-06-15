// server/routes/documents.js
const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const Document = require('../models/Document');
const router = express.Router();

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Azure Blob Storage config
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || 'documents';

// POST /api/documents - Upload a document
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { user_id, metadata } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Upload to Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    await containerClient.createIfNotExists();
    const blobName = Date.now() + '-' + file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
    const file_url = blockBlobClient.url;

    // Save document metadata in MongoDB
    const doc = await Document.create({
      user_id,
      file_name: file.originalname,
      file_url,
      metadata: metadata ? JSON.parse(metadata) : {},
      upload_status: 'success',
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// GET /api/documents - List all documents
router.get('/', async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
});

// GET /api/documents/:id - Get a document by ID
router.get('/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

// PATCH /api/documents/:id - Update a document
router.patch('/:id', async (req, res) => {
  const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

// DELETE /api/documents/:id - Delete a document
router.delete('/:id', async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
