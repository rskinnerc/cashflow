import { DocumentSnapshot } from "firebase/firestore";

class Pocket {
  balance: number = 0;
  currency: string = "COP";
  name: string = "";
  status: boolean = false;
  uid: string = "";
  id: string = "";

  constructor(
    balance?: number,
    currency?: string,
    name?: string,
    status?: boolean,
    uid?: string,
    id?: string
  ) {
    this.id = id ? id : this.id;
    this.balance = balance ? balance : this.balance;
    this.currency = currency ? currency : this.currency;
    this.name = name ? name : this.name;
    this.status = status ? status : this.status;
    this.uid = uid ? uid : this.uid;
  }
}

const pocketConverter = {
  toFirestore: function (pocket: Pocket) {
    const { balance, currency, name, status, uid } = pocket;
    return { balance, currency, name, status, uid };
  },
  fromFirestore: function (snapshot: DocumentSnapshot): Pocket {
    const { balance, currency, name, status, uid } = snapshot.data() as Pocket;
    return new Pocket(balance, currency, name, status, uid, snapshot.id);
  },
};
export { Pocket, pocketConverter };
