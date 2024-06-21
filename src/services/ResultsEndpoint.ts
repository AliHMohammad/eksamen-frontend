import ApiClient from "@/services/ApiClient.ts";
import { IPagination } from "@/models/IPagination.ts";
import IDetailedResult from "@/models/IDetailedResult.ts";
import IAthlete from "@/models/IAthlete.ts";
import { TAthleteRequest } from "@/components/forms/AthleteForm.tsx";
import { TResultRequest } from "@/components/forms/ResultForm.tsx";

class ResultsEndpoint {
	static async getResults(params: URLSearchParams): Promise<IPagination<IDetailedResult>> {
		const resp = await new ApiClient().Get<IPagination<IDetailedResult>>("results", params);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value!;
	}

	static async deleteResult(resultId: number) {
		const resp = await new ApiClient().Delete<IAthlete>(`results/${resultId}`);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}

	static async updateResult(athleteId: number, payload: TResultRequest) {
		const resp = await new ApiClient().Put<IDetailedResult, TResultRequest>(`results/${athleteId}`, payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}

	static async createResult(payload: TResultRequest) {
		const resp = await new ApiClient().Post<IDetailedResult, TResultRequest>(`results`, payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}

}

export default ResultsEndpoint;