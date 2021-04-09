const socket = io();

//Referencias HTML
const btnGenerarTicket = document.querySelector('#btnGenerarTicket');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado a la creacion de nuevo ticket');
    btnGenerarTicket.disabled = false
});

socket.on('ultimo-ticket', (ultimoTicket) => {
    lblNuevoTicket.innerText = `Ultimo ticket recibido: ${ultimoTicket}`
})


socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnGenerarTicket.disabled = true
});



btnGenerarTicket.addEventListener('click', () => {

    socket.emit('siguiente-ticket', (ticket) => {
        lblNuevoTicket.innerText = ticket
        
    });

    

});
