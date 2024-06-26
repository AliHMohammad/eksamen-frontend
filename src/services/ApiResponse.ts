class ApiResponse<T> {
	public value?: T;
	private statusCode: number;
	private errorMessage?: string;

	constructor(status: number) {
		this.statusCode = status;
	}

	public get ok(): boolean {
		return this.statusCode < 400;
	}

	public get error() {
		return this.errorMessage;
	}

	public async setError(errorObj: { [key: string]: string }): Promise<void> {
		try {
			this.errorMessage = errorObj.message;
		} catch (error) {
			console.error("Failed to parse error response:", error);
			this.errorMessage = "Unknown error occurred";
		}
	}


}

export default ApiResponse;
