export type getStudentList = {
	data: [
		{
			studentId: number;
			studentName: string;
			cardNumber: string;
			admissionNubmer: string;
			familyId: number;
			grade: string;
			avialableBalance: number;
			imageUrl: string;
			dailyLimit: number;
		},
	];
	status: boolean;
	message: string;
	severity: string;
};

export type getMenuList = {
	status: boolean;
	message: string;
	severity: string;
	data: [
		{
			menuId: number;
			cetegory: string;
			menuItems: [
				{
					menuItemId: number;
					itemName: string;
					unitPrice: number;
				},
			];
		},
	];
};

export type getStudentListParam = {
	familyId: string;
	cardNumber: string;
	studentName: string;
};

export type getMenyListParam = {
	userId: number;
};

export type postOrderFoodBody = {
	studentId: number;
	netAmount: number;
	discount: number;
	totalPaid: number;
	menuItems: [
		{
			description: string;
			quantity: number;
			unitPrice: number;
			amount: number;
			discount: number;
			netAmount: number;
		},
	];
};

export type postOrderFoodResponse = {
	status: boolean;
	message: string;
	severity: string;
};

export type previousSale = {
	status: boolean;
	message: string;
	severity: string;
	data: [
		{
			orderId: number;
			invoiceNo: number;
			invoiceDate: Date;
			studentName: string;
			admissionNumber: string;
			discountAmount: number;
			totalAmount: number;
			netAmount: number;
			cashAmount: number;
			cardAmount: number;
			cardSwipe: string;
		},
	];
};

export type previouseSaleParam = {
	userId: number;
	studentId: number;
};
