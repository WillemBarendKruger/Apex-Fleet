"use client";

import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import {
    Upload,
    Button,
    Input,
    Typography,
    Image,
    message,
    Spin,
} from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";

const { Title, Paragraph } = Typography;

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const OfficeBot: React.FC = () => {
    const { styles } = useStyles();

    const [prompt, setPrompt] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [responseText, setResponseText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = (file: File) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            message.error("Only JPEG, PNG, and WebP images are supported.");
            return false;
        }

        if (file.size > maxSize) {
            message.error("Image must be under 5MB.");
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
        if (!prompt.trim()) {
            message.error("Please enter a question.");
            return;
        }

        const isRelevant = /printer|scanner|monitor|copier|fax|toner|paper|office/i.test(prompt);
        if (!isRelevant) {
            message.warning("This bot only answers questions about office equipment.");
            return;
        }

        setLoading(true);
        try {
            const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
                {
                    text:
                        "You are an expert assistant that only answers questions related to office equipment such as printers, scanners, monitors, copiers, and related hardware. Politely decline unrelated queries.",
                },
                { text: prompt },
            ];

            if (imageFile) {
                const base64Image = await readImageAsBase64(imageFile);
                parts.push({
                    inlineData: {
                        mimeType: imageFile.type,
                        data: base64Image,
                    },
                });
            }

            const result = await ai.models.generateContent({
                model: "gemini-1.5-pro",
                contents: [{ role: "user", parts }],
            });

            const description = result.text?.trim() || "No response received.";
            setResponseText(description);
            message.success("AI response generated.");
        } catch (error) {
            console.error(error);
            setResponseText("Error generating response.");
            message.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.aiContainer}>
                <Title level={4}>Office Equipment AI Bot</Title>
                <Paragraph>
                    Ask anything about printers, scanners, monitors, or upload an image for analysis.
                </Paragraph>

                <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={handleUpload}
                >
                    <Button icon={<UploadOutlined />}>Upload Image (Optional)</Button>
                </Upload>

                {imagePreviewUrl && (
                    <Image
                        src={imagePreviewUrl}
                        alt="Uploaded preview"
                        className={styles.imagePreview}
                    />
                )}

                <Input.TextArea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Why is my printer printing faded pages?"
                    className={styles.promptInput}
                />

                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSubmit}
                    loading={loading}
                    className={styles.analyzeButton}
                >
                    Ask AI
                </Button>

                {loading && <Spin style={{ marginTop: 16 }} />}

                {responseText && (
                    <div className={styles.responseSection}>
                        <Title level={5}>AI Response:</Title>
                        <Paragraph>{responseText}</Paragraph>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfficeBot;