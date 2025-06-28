'use server'

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { db } from "@/firebase/admin";
import { ConsultationData, CreateReportParams } from "@/types";

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
