import IClub from "@/models/IClub.ts";
import ApiClient from "@/services/ApiClient.ts";
import IAthlete from "@/models/IAthlete.ts";
import { IPagination } from "@/models/IPagination.ts";
import { TAthleteRequest } from "@/components/forms/AthleteForm.tsx";

class AthletesEndpoint {
	static async createAthlete(payload: TAthleteRequest): Promise<IAthlete[]> {
		const resp = await new ApiClient().Post<IAthlete[], TAthleteRequest>("athletes", payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value ?? [];
	}

	static async getAthletes(params: URLSearchParams): Promise<IPagination<IAthlete>> {
		const resp = await new ApiClient().Get<IPagination<IAthlete>>("athletes", params);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value!;
	}

	static async deleteAthlete(athleteId: number) {
		const resp = await new ApiClient().Delete<IAthlete>(`athletes/${athleteId}`);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}

	static async updateAthlete(athleteId: number, payload: TAthleteRequest) {
		const resp = await new ApiClient().Put<IAthlete, TAthleteRequest>(`athletes/${athleteId}`, payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}
}

export default AthletesEndpoint;