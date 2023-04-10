export interface Reimbursement {
    reimbursements: Array<{
        id: number;
        description: string;
        status: string;
        user_id: number;
    }>
}