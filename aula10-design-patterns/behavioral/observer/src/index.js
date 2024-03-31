import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject();
const payment = new Payment(subject);

const shipmentSector = new Shipment();
const marketingSector = new Marketing();

subject.subscribe(shipmentSector);
subject.subscribe(marketingSector);

payment.creditCard({
  id: Date.now(),
  userName: 'Edson Bruno'
});

subject.unsubscribe(marketingSector);

payment.creditCard({
  id: Date.now(),
  userName: 'Tayane Ewelu'
});