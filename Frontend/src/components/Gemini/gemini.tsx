"use client";

import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { useStyles } from "@/components/Gemini/style/styles";
import { Upload, Button, Input, Typography, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

interface Props {
  onDescriptionGenerated?: (desc: string) => void;
}

const GeminiImageAnalysis: React.FC<Props> = ({ onDescriptionGenerated }) => {
  const { styles } = useStyles();

  const [prompt, setPrompt] = useState("Describe the issue with this equipment based on the image.");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      return false;
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error('File size must be less than 5MB');
      return false;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
    return false;
  };

  const readImageAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string)?.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !imageFile) return;

    setLoading(true);
    try {
      const base64Image = await readImageAsBase64(imageFile);

      const result = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      const description = result.text?.trim() || "No response text received.";
      setResponseText(description);
      if (onDescriptionGenerated) {
        onDescriptionGenerated(description);
      }
      message.success("AI-generated description added");
    } catch (error) {
      console.error(error);
      setResponseText("Error analyzing the image.");
      message.error("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.aiContainer}>
      <Title level={4}>Upload Image for AI Analysis</Title>

      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={handleUpload}
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      {imagePreviewUrl && (
        <Image
          src={imagePreviewUrl}
          alt="Uploaded preview"
          className={styles.imagePreview}
        />
      )}

      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className={styles.promptInput}
        disabled={!imageFile}
      />

      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!imageFile}
        loading={loading}
        className={styles.analyzeButton}
      >
        Analyze Image
      </Button>

      {responseText && (
        <div className={styles.responseBox}>
          <Title level={5}>Gemini Analysis:</Title>
          <Paragraph>{responseText}</Paragraph>
        </div>
      )}
    </div>
  );
};

export default GeminiImageAnalysis;