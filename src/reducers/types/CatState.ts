import { ICat } from "../../models/ICat";

export interface CatsState {
    cats: ICat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }