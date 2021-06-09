
/*
First Deliverable:
- see the first flights details on page load 
- include:
    -image 
    -airline
    -duration
    -departure time
    -available tickets (the number of tickets left will need to be derived from the flight's capacity and the number of tickets sold)

*/

document.addEventListener("DOMContentLoaded", () => {
   const flightImage = document.querySelector("img#poster")
   const flightAirline = document.querySelector("#airline")
   const flightDuration = document.querySelector("div#duration.meta")
   const flightDepartureTime = document.querySelector("span#departureTime")
   const flightDestination = document.querySelector("div#destination")
   let numberOfTickets = document.querySelector("span#ticket-num")

   const url = "http://localhost:3000/flights/1"

   fetch(url)
   .then(resp => resp.json())
   .then(data =>{
       flightImage.src = data.image
       flightAirline.innerHTML = data.airline
       flightDuration.innerHTML = `${data.duration} minutes`
       flightDepartureTime.innerHTML = data.departureTime
       flightDestination.innerHTML = data.destination
       numberOfTickets.innerHTML = data.capacity - data.ticketsSold
       numberOfTickets.dataset.ticketsSold = data.ticketsSold
    })
  
   const buyTicketButton = document.querySelector("div.ui.orange.button")


   buyTicketButton.addEventListener("click", () => {
    // numberOfTickets.dataset.ticketsSold++
    const newNumberOfTickets = parseInt(numberOfTickets.dataset.ticketsSold) + 1
if(numberOfTickets.innerHTML >= 1) {


  const formData = {
      ticketsSold: newNumberOfTickets
  }
    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    fetch(url, configurationObject)
    .then(response => response.json())
    .then(data => {
        numberOfTickets.dataset.ticketsSold = data.ticketsSold
        numberOfTickets.innerHTML = data.capacity - data.ticketsSold
     })
    }else { buyTicketButton.innerText = "Sold Out"

    }
    }) 
})


/*
Second Deliverable:
- users buy a ticket for the flight (event listener on button)
- the numbers tickets sold should decrease after the click (patch)
- the new amount of tickets left should be displayed (append)
*/

/*
-Third Deliverable:
- users cannot buy tickets when remaining tickets === 0
- if tickeets are 0 don't allow purchase
*/


