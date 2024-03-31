import { expect, describe, test, jest, beforeEach, beforeAll } from '@jest/globals';
import PaymentSubject from '../src/subjects/paymentSubject.js';
import Payment from '../src/events/payment.js';
import Shipment from '../src/observers/shipment.js';
import Marketing from '../src/observers/marketing.js';

describe('Test suite for observer pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => { });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    subject.subscribe(observer);
    const data = 'hello world';
    const expected = data;

    subject.notify(data);
    expect(observer.update).toBeCalledWith(expected);
  });
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    subject.subscribe(observer);
    subject.unsubscribe(observer);

    const data = 'hello world';

    subject.notify(data);
    expect(observer.update).not.toHaveBeenCalled();
  });
  test('#Payment should notify subject after a credit card transaction', () => {
    const paymentSubject = new PaymentSubject();
    const payment = new Payment(paymentSubject);

    const paymentSubjectSpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);

    const data = {
      id: Date.now(),
      userName: 'Edson Bruno',
    };

    payment.creditCard(data);
    expect(paymentSubjectSpy).toBeCalledWith(data);
  });
  test('#All should notify subscribers after a credit card payment', () => {
    const paymentSubject = new PaymentSubject();
    const payment = new Payment(paymentSubject);
    const marketing = new Marketing();
    const shipment = new Shipment();

    const shipmentObserverSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingObserverSpy = jest.spyOn(marketing, marketing.update.name);

    const data = {
      id: Date.now(),
      userName: 'Edson Bruno',
    };

    paymentSubject.subscribe(shipment);
    paymentSubject.subscribe(marketing);
    payment.creditCard(data);
    expect(shipmentObserverSpy).toBeCalledWith(data);
    expect(marketingObserverSpy).toBeCalledWith(data);
  });
});