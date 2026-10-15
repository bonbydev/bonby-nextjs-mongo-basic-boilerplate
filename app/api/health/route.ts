import { apiError, apiSuccess, AppError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return apiSuccess({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (_error) {
    return apiError(new AppError("Service unavailable", 503, "SERVICE_UNAVAILABLE"));
  }
}
