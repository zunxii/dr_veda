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

export async function CreateReport(params: CreateReportParams) {
  const { userId, formData, transcript, reportId } = params;
  const { name, age, gender, symptoms } = formData;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}`
      )
      .join("\n");

    const { object: reportContent } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false
      }),
      output: "no-schema",
      prompt: `
You are an experienced Ayurvedic doctor and medical AI. Based on the patient’s details and their voice consultation, provide a comprehensive Ayurvedic diagnosis and treatment plan.

🧾 Patient Information:
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Reported Symptoms (via form): ${symptoms}

📜 Voice Consultation Transcript:
"""
${formattedTranscript}
"""

🎯 Your Output Must Include:
1. **Dosha Imbalance Summary** (if applicable): Mention if Vata, Pitta, or Kapha is aggravated based on symptoms and voice context.
2. **Possible Ayurvedic Condition**: What might be the underlying imbalance or named condition?
3. **Personalized Prescription**:
   - Diet Recommendations (foods to eat, avoid)
   - Herbal Remedies (if needed)
   - Lifestyle & Routine Suggestions (wake/sleep, exercise, etc.)
4. **Precautionary Advice**: What the patient should avoid.
5. **Note**: If symptoms are severe or unclear, recommend seeing a certified practitioner.

🎯 Constraints:
- Keep advice specific to the transcript + form data only.
- Keep the language formal, accurate, and medically aware.
- Avoid Western medicine unless absolutely necessary.
- Avoid repeating patient data in your answer.
- Be concise but informative (under 500 words).
      `
    });

    await db.collection("reports").doc(reportId).set({
      userId,
      formData,
      transcript,
      analysis: reportContent,
      createdAt: new Date().toISOString()
    });

    return {sucess: true, reportId: reportId}

  } catch (error) {
    console.error("❌ Failed to generate or store report:", error);
    throw error;
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

export async function finalizeReport(reportId: string, geminiOutput:any){
  try {
    await db.collection('reports').doc(reportId).update({
      analysis : geminiOutput,
      completedAt :  new Date().toISOString,
      updateAt : new Date().toDateString
    })
    return {success : true}
  } catch (error) {
    console.error('Failed to finalize report:', error);
    return { success: false, error: 'Failed to finalize report' };
  }
}