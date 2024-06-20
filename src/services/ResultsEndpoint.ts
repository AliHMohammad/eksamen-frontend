import ApiClient from "@/services/ApiClient.ts";
import { IPagination } from "@/models/IPagination.ts";
import IDetailedResult from "@/models/IDetailedResult.ts";

class ResultsEndpoint {
	static async getResults(params: URLSearchParams): Promise<IPagination<IDetailedResult>> {
		const resp = await new ApiClient().Get<IPagination<IDetailedResult>>("results", params);

		if (!resp.ok) {
			throw new Error(resp.error);
		}

		return resp.value!;
	}


}

export default ResultsEndpoint;