'use server'

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { db } from "@/firebase/admin";
import { ConsultationData, CreateReportParams } from "@/types";
import { getCurrentUser } from "./auth.action";
import { v4 as uuidv4 } from 'uuid';

export async function getReportByUserId(userId: string): Promise<ConsultationData[]> {
  const reports = await db.collection("reports")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return reports.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ConsultationData[];
}

export async function generateGeminiReport(reportId: string) {
  try {
    const docRef = db.collection('reports').doc(reportId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error('Report not found');
    }

    const data = doc.data() as {
  formData: {
    name: string;
    age: string;
    gender: string;
    symptoms: string;
  };
  transcript: { role: string; content: string }[];
};
    const { formData, transcript } = data;

    const formattedTranscript = (transcript || [])
      .map((msg: { role: string; content: string }) => `- ${msg.role}: ${msg.content}`)
      .join('\n');

    const { object: geminiOutput } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      output: "no-schema",
      prompt: `
You are an experienced Ayurvedic doctor and medical AI. Based on the patient’s details and their voice consultation, provide a comprehensive Ayurvedic diagnosis and treatment plan.

🧾 Patient Information:
- Name: ${formData.name}
- Age: ${formData.age}
- Gender: ${formData.gender}
- Reported Symptoms: ${formData.symptoms}

📜 Voice Consultation Transcript:
"""
${formattedTranscript}
"""

🎯 Your Output Must Include:
1. **Dosha Imbalance Summary**
2. **Possible Ayurvedic Condition**
3. **Personalized Prescription**
4. **Precautionary Advice**
5. **Note**
`
    });

    return { success: true, geminiOutput };

  } catch (error) {
    console.error('Failed to generate Gemini report:', error);
    return { success: false, error: 'Failed to generate Gemini report' };
  }
}

export async function submitFormData(formData : FormData){
  try {
    const user = await getCurrentUser();
    if(!user){
      return {success : false, message : 'Unauthorized'};
    }

    const reportId = uuidv4();

    await db.collection('reports').doc(reportId).set({
      userId : user.id,
      formData,
      createdAt : new Date().toISOString(),
      uploadReport:{
        analysisStatus: 'pending',
      }
    })

    return {
      success : true,
      reportId,
      message : 'Form data saved successfully'
    }

  } catch (error) {
     console.error('Error saving form data:', error);
    return {
      success: false,
      message: 'Failed to save form data. Please try again.',};
  }
}

export async function uploadOCRData(reportId:string,ocrData:any){
  try {
    await db.collection('reports').doc(reportId).update({
      ocrData,
      updatedAt : new Date().toISOString(),
    })
    return {
      succees : true,
    }
  } catch (error) {
    console.error('Failed to upload OCR data:', error);
    return { success: false, error: 'Failed to upload OCR data' };
  }
}

export async function appendTranscription(reportId:string,message: { role: string, content: string }){
  try {
    const docRef = db.collection('reports').doc(reportId);
    const doc = await docRef.get();

    if(!doc.exists){
      return { success : false, error : 'Report not found'}
    }

    const currentTranscript = doc.data()?.transcript || [];

    await docRef.update({
      transcript: [...currentTranscript, message],
      updatedAt : new Date().toISOString(),
    })
    return {success : true}

  } catch (error) {
    console.error('Failed to append transcript:', error);
    return { success: false, error: 'Failed to append transcript' };
  }
}

export async function finalizeReport(reportId: string, geminiOutput: any) {
  try {
    await db.collection('reports').doc(reportId).update({
      analysis: geminiOutput,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true };

  } catch (error) {
    console.error('Failed to finalize report:', error);
    return { success: false, error: 'Failed to finalize report' };
  }
}