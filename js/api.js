function Api() {}

Api.post = function(payload, success, error) {
  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", "Bearer 746sxc1q9bvcw");
    },
    url: "https://api.fuzzy.ai/agent/X6WUL3TME3KLY4YIGENO7UJZEE",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: success,
    fail : error,
    complete : function (){
      app.showLoading(false);
    }
  });

};
