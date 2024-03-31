export default class PaymentSubject {
  #observers = new Set();
  notify(data){
    // não deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
    this.#observers.forEach(observer => observer.update(data));
  }

  unsubscribe(observable){
    this.#observers.delete(observable);
  }
  
  subscribe(observable){
    this.#observers.add(observable);
  }
}