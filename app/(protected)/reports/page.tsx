import { getCurrentUser } from "@/lib/actions/auth.action";
import { getReportByUserId } from "@/lib/actions/general.action";
import ConsultationHistory from "@/components/ConsultationHistory";
import { redirect } from "next/navigation";

export default async function ReportsPage() {
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login if not authenticated
    redirect("/sign-in");
  }

  const consultationHistory = await getReportByUserId(user.id);

  return (
    <div className="max-w-6xl mx-auto px-8 mt-15">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Consultation History
        </h1>
        <p className="text-slate-600">
          View all your past consultations and reports
        </p>
      </div>

      {consultationHistory.length > 0 ? (
        <ConsultationHistory consultations={consultationHistory} showFullHistory={true} />
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500">No consultation history yet.</p>
        </div>
      )}
    </div>
  );
}
