import ApiClient, { TParams } from "@/services/ApiClient.ts";
import { IPagination } from "@/models/IPagination.ts";
import IDiscipline from "@/models/IDiscipline.ts";
import { TDisciplineRequest } from "@/components/forms/CreateDisciplineForm.tsx";

class DisciplinesEndpoint {
	static async getDisciplines(): Promise<IDiscipline[]> {
		const resp = await new ApiClient().Get<IDiscipline[]>("disciplines");

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value ?? [];
	}

	static async createDiscipline(payload: TDisciplineRequest) {
		const resp = await new ApiClient().Post<IDiscipline, TDisciplineRequest>("disciplines", payload);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value;
	}
}

export default DisciplinesEndpoint;
