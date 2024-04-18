const USERS = ["662012dcbc6031592148938d","662012dcbc6031592148938e"]
const USERS_OBJ = {"662012dcbc6031592148938d":"Peer 1","662012dcbc6031592148938e":"Peer 2"}

function checkForOtherUser(user){
    var userId = $(".title-name").attr("user_id");
    return userId != user
}




$("#request_energy").click(event=>{
    event.preventDefault()
    var userId = $(".title-name").attr("user_id");
    let users = USERS.filter(checkForOtherUser);
    let peerUser = users[0]
    if($("#amtofenergy").val() == "" || $("#timerequired").val() == "" ){
        alert("Enter all the Fields ")
    }else{
        let energyRequest = {
            from: userId,
            to: peerUser,
            energy: parseInt($("#amtofenergy").val()),
            hours: parseInt($("#timerequired").val())
          };
          
          // Make the POST request
          fetch('http://localhost:8080/api/insertenergyrequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(energyRequest)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
            alert("Request Raised Sucessfully!!")
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

})

$("#sell_energy").click(event=>{
    event.preventDefault()
    var userId = $(".title-name").attr("user_id");
    let users = USERS.filter(checkForOtherUser);
    let peerUser = users[0]
    if($("#sellenergy").val() == "" || $("#sellcost").val() == "" ){
        alert("Enter all the Fields ")
    }else{
        let sellenergy = {
            from: userId,
            to: peerUser,
            energy: parseInt($("#sellenergy").val()),
            cost: parseInt($("#sellcost").val())
          };
          
          // Make the POST request
          fetch('http://localhost:8080/api/sellenergy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sellenergy)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
            $('#requestalert').html("");
            alert("Energy Sold Sucessfully!!")
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

})

$("#transbtn").click(event=>{
    $('#transaction_div').html("")
    fetch('http://localhost:8080/api/fetchalltransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(datas => {
        datas.forEach( data=> {
            var alertDiv = $('<div>').addClass('alert alert-success').attr('role', 'alert');
            var cost = $('<b>').text(data.cost);
            var energy = $('<b>').text(data.energy);
            var to = $('<b>').text(USERS_OBJ[data.to]);
            var from = $('<b>').text(USERS_OBJ[data.from]);
            alertDiv.append(to, ' have bought ', energy,'KW of energy for ₹',cost, ' from ', from );
            $('#transaction_div').append(alertDiv);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
})



// update request energy
$( document ).ready(function() {

    var userId = $(".title-name").attr("user_id");
    let Postdata = {"id": userId}
    fetch('http://localhost:8080/api/fetchRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Postdata)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(datas => {
        datas.forEach( data=> {
            var alertDiv = $('<div>').addClass('alert alert-warning').attr('role', 'alert');
            var energyText = $('<b>').text(data.energy);
            var hoursText = $('<b>').text(data.hours);
            var userText = $('<b>').text(USERS_OBJ[data.from]);
            alertDiv.append(userText, ' has requested ', energyText, 'KW Energy for ', hoursText, ' hours');
            $('#requestalert').append(alertDiv);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

});

