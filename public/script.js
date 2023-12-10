function start () {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
    const food_id = document.getElementById('food_id');
    const body = document.body

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length >= 1) {
            fetchSuggestions(searchTerm);
        } else {
            suggestions.style.display = 'none';
        }
    });

    function fetchSuggestions(searchTerm) {
        const apiUrl = `/${searchTerm}`;
        console.log(apiUrl)
        food_id.value = apiUrl;
        fetch(apiUrl)
            .then(response => response.json())
            .then(suggestionsData => {
                // console.log(suggestionsData)
                displaySuggestions(suggestionsData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des suggestions :', error);
            });
    }

    function displaySuggestions(suggestionsData) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'block';
        
        suggestionsData.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = `${suggestion.id}`;
            option.textContent = `${suggestion.name}`;
            suggestions.appendChild(option);
        });

        suggestions.addEventListener("click", function() {
            const id = this.options[this.selectedIndex].value;
            const name_text = this.options[this.selectedIndex].textContent
            searchInput.value = name_text
            food_id.value = id;
            suggestions.style.display = 'none';
        });
    }
    
}

window.addEventListener("load", start)