export interface SingleReimbursement {
        id: number;
        description: string;
        status: string;
        amount: number;
        user_id: number;
        created_at: Date;
        updated_at: Date;
}