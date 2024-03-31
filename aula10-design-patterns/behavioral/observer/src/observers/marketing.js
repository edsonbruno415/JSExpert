export default class Marketing {
  update({ id, userName, }){
    // importante lembrar que o update deve ser responsável por gerenciar seus erros/exceptions
    // não deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
    // só para notificar todo mundo, quem decide o que fazer com esse dado é quem recebe no caso o observador/observer que se inscreveu
    console.log(`[${id}]: [marketing] will send a welcome email to [${userName}]`);
  }
}