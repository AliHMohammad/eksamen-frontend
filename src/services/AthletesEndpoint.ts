import IClub from "@/models/IClub.ts";
import ApiClient from "@/services/ApiClient.ts";
import IAthlete from "@/models/IAthlete.ts";
import { TAthleteRequest } from "@/components/forms/RegisterAthleteForm.tsx";

class AthletesEndpoint {
	static async createAthlete(payload: TAthleteRequest): Promise<IAthlete[]> {
		const resp = await new ApiClient().Post<IAthlete[], TAthleteRequest>("athletes", payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value ?? [];
	}
}

export default AthletesEndpoint;