function start () {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
    const apiUrlInput = document.getElementById('apiUrl');
    const body = document.getElementsByTagName('body')[0]

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length >= 1) {
            fetchSuggestions(searchTerm);
        } else {
            suggestions.style.display = 'none';
        }
    });

    function fetchSuggestions(searchTerm) {
        const apiUrl = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=departement&boost=population&limit=5`;
        apiUrlInput.value = apiUrl;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displaySuggestions(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des suggestions :', error);
            });
    }

    function add(data) {
        const p = document.createElement("p")
        p.textContent = data
        body.append(p)

    }

    function displaySuggestions(suggestionsData) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'block';
        

        suggestionsData.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = `${suggestion.nom}, ${suggestion.departement.nom}`;
            option.textContent = `${suggestion.nom}, ${suggestion.departement.nom}`;
            suggestions.appendChild(option);
        });

        suggestions.addEventListener("click", function() {
            const selectedOption = this.options[this.selectedIndex].value; // Obtenir le nom seulement
            const selectedTrimedOption = this.options[this.selectedIndex].value.split(',')[0];
            searchInput.value = selectedOption;
            apiUrlInput.value = selectedTrimedOption; // Réinitialise la valeur de l'input apiUrl
            add(selectedTrimedOption)
            suggestions.style.display = 'none';
        });
    }
    
}

window.addEventListener("load", start)