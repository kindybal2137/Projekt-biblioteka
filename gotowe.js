document.addEventListener("DOMContentLoaded", function(){
    var selectElement = document.getElementById('wybor_ksiazki');
    
    fetch('https://imiki.pl/projekt/api/books')
    .then(response => response.json())
    .then(data => {
        data.ksiazki.forEach(function(book){
            var option = document.createElement('option');
            option.value = book.ISBN;
            option.textContent = book.tytul;
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
    });

    const wypluwacz = document.getElementById("wypluwacz");
    const pobierzDaneBtn = document.getElementById("pobierzDaneBtn");
    const formularz = document.getElementById("formularz");

    pobierzDaneBtn.addEventListener("click", function() {
        fetch('https://imiki.pl/projekt/pb15/users')
            .then(response => response.json())
            .then(data => {
                wypluwacz.innerHTML = ''; // Czyszczenie poprzednich danych
                data.forEach(user => {
                    const userParagraph = document.createElement('p');
                    userParagraph.textContent = `ID: ${user.id}, Użytkownik: ${user.user}, Data: ${user.data}, Nazwisko: ${user.nazwisko}`;
                    wypluwacz.appendChild(userParagraph);
                });
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas pobierania danych użytkowników:', error);
            });
    });

    formularz.addEventListener("submit", function(event) {
        event.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza

        var formData = new FormData(this);
        var selectedBook = selectElement.options[selectElement.selectedIndex].text;
        var nazwisko = document.querySelector('input[name="nazwisko"]').value;
        formData.append("ksiazka", selectedBook);
        formData.append("nazwisko", nazwisko);

        fetch('https://imiki.pl/projekt/pb15/users', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Wystąpił błąd podczas wysyłania danych:', error);
                // Tutaj możesz obsłużyć błąd, np. wyświetlić komunikat o niepowodzeniu
                wypluwacz.innerHTML = "Wystąpił błąd podczas wysyłania danych!";
        });
    });
});
