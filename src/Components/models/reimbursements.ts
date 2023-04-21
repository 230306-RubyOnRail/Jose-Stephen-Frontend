export interface Reimbursement {
    reimbursements: Array<{
        id: number;
        description: string;
        status: string;
        amount: number;
        user_id: number;
        count: number;
    }>
}