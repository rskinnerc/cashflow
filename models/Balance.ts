import { DocumentSnapshot, Timestamp } from "firebase/firestore";

class Balance {
  concept: string = "";
  currency: string = "COP";
  date: Timestamp = Timestamp.fromDate(new Date());
  description: string = "";
  responsible: string = "";
  status: boolean = true;
  type: string = "DEBT";
  uid: string = "";
  updatedAt: Timestamp | null = null;
  value: number = 0;
  id: string = "";

  constructor(rest?: Partial<Balance>, id?: string) {
    this.id = id ? id : this.id;
    this.concept = rest?.concept ? rest.concept : this.concept;
    this.currency = rest?.currency ? rest.currency : this.currency;
    this.date = rest?.date ? rest.date : this.date;
    this.description = rest?.description ? rest.description : this.description;
    this.responsible = rest?.responsible ? rest.responsible : this.responsible;
    this.status = rest?.status ? rest.status : this.status;
    this.type = rest?.type ? rest.type : this.type;
    this.value = rest?.value ? rest.value : this.value;
    this.uid = rest?.uid ? rest.uid : this.uid;
    this.updatedAt = rest?.updatedAt ? rest.updatedAt : this.updatedAt;
  }
}

const balanceConverter = {
  toFirestore: function (balance: Balance) {
    const { id, ...rest } = balance;
    return { ...rest };
  },
  fromFirestore: function (snapshot: DocumentSnapshot): Balance {
    const { ...balance } = snapshot.data() as Balance;
    return new Balance(balance, snapshot.id);
  },
};
export { Balance, balanceConverter };
