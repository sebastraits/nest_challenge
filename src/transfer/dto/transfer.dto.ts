export class TransferDto {
  amount: number;
  debitAccount: string;
  creditAccount: string;
  companyId: number; // Assuming you want to reference the company by its ID
}
