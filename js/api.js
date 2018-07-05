function Api() {}
// Executa uma requisição GET por AJAX para a rota informada em "routeName" e os dados
// da requisição no objeto "payload", o retorno da solicitação é um objeto do tipo
// ApiResponse passado como parâmetro para o método "callback"
Api.post = function(payload, success, error) {

  // var assertedCallback = function(statusCode, data) {
  //   if(callback) {
  //     callback(new ApiResponse(statusCode, data));
  //   }
  // };

  // $.get(routeName, payload, function(json, status, xhrresult) {    // On success
  //   assertedCallback(xhrresult.status, json);
  // })
  //   .fail(function(xhrresult) { // On error
  //     try {
  //       assertedCallback(xhrresult.status, JSON.parse(xhrresult.responseText));
  //     } catch(e) {
  //       assertedCallback(xhrresult.status);
  //     }
  //   });
  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", "Bearer 746sxc1q9bvcw");
    },
    url: "https://api.fuzzy.ai/agent/X6WUL3TME3KLY4YIGENO7UJZEE",
    data: payload,
    success: callback,
    fail : error,
  });

};
