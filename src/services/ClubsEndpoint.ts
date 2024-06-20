import ApiClient from "@/services/ApiClient.ts";
import IClub from "@/models/IClub.ts";

class ClubsEndpoint {
	static async getClubs(): Promise<IClub[]> {
		const resp = await new ApiClient().Get<IClub[]>("clubs");

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value ?? [];
	}
}

export default ClubsEndpoint;