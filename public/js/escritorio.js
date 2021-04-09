const socket = io();


//Referencias HTML
const escritorioActual = document.querySelector('#escritorioActual');
const btnAtenderTicket = document.querySelector('#btnAtenderTicket');
const lblPendientes = document.querySelector('#lblPendientes');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search); // solo funca en chrome y firefox***
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio')
escritorioActual.innerHTML = escritorio

divAlerta.style.display = 'none'

socket.on('connect', () => {
    console.log('Conectado a la seccion de escritorios');
    btnAtenderTicket.disabled = false
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnAtenderTicket.disabled = true
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none'
    }
    lblPendientes.innerText = pendientes
}) ;


btnAtenderTicket.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
       
        if (!ok) {
            lblTicket.innerText = `Nadie`;
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket: ${ticket.numero}`

    });

});
