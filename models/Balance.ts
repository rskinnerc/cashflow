import { format, parse } from "date-fns";
import { DocumentSnapshot, Timestamp } from "firebase/firestore";

class Balance {
  concept: string = "";
  currency: string = "COP";
  description: string = "";
  responsible: string = "";
  status: boolean = true;
  type: string = "DEBT";
  uid: string = "";
  date: Timestamp = Timestamp.now();
  updatedAt: Timestamp | null = null;
  value: number = 0;
  id: string = "";

  constructor(
    concept?: string,
    currency?: string,
    fDate?: string | Timestamp | Date,
    description?: string,
    responsible?: string,
    status?: boolean,
    type?: string,
    value?: number,
    uid?: string,
    fUpdatedAt?: string | Timestamp | null,
    id?: string
  ) {
    this.id = id ? id : this.id;
    this.concept = concept ? concept : this.concept;
    this.currency = currency ? currency : this.currency;
    this.fDate = fDate ? fDate : this.date;
    this.description = description ? description : this.description;
    this.responsible = responsible ? responsible : this.responsible;
    this.status = status ? status : this.status;
    this.type = type ? type : this.type;
    this.value = value ? value : this.value;
    this.uid = uid ? uid : this.uid;
    this.fUpdatedAt = fUpdatedAt ? fUpdatedAt : this.updatedAt;
  }

  get fDate() {
    return format(this.date.toDate(), "yyyy-MM-dd");
  }

  set fDate(value: string | Date | Timestamp) {
    if (typeof value === "string") {
      this.date = Timestamp.fromDate(parse(value, "yyyy-MM-dd", new Date()));
    } else if (value instanceof Timestamp) {
      this.date = value;
    } else {
      this.date = Timestamp.fromDate(value);
    }
  }

  get fUpdatedAt() {
    return this.updatedAt
      ? format(this.updatedAt.toDate(), "yyyy-MM-dd")
      : null;
  }

  set fUpdatedAt(value: string | null | Timestamp) {
    if (typeof value === "string") {
      this.updatedAt = Timestamp.fromDate(
        parse(value, "yyyy-MM-dd", new Date())
      );
    } else if (value instanceof Timestamp) {
      this.updatedAt = value;
    } else if (!value) {
      this.updatedAt = null;
    }
  }
}

const balanceConverter = {
  toFirestore: function (balance: Balance) {
    const { id, ...rest } = balance;
    return { ...rest };
  },
  fromFirestore: function (snapshot: DocumentSnapshot): Balance {
    const {
      concept,
      currency,
      date,
      description,
      responsible,
      status,
      type,
      value,
      uid,
      updatedAt,
    } = snapshot.data() as Balance;
    return new Balance(
      concept,
      currency,
      date,
      description,
      responsible,
      status,
      type,
      value,
      uid,
      updatedAt,
      snapshot.id
    );
  },
};
export { Balance, balanceConverter };
